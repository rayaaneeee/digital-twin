"""
FastAPI backend for AI Rayane digital twin — powered by Groq (free, fast).
Endpoints:
  POST /chat   — streaming chat (SSE)
  GET  /health — liveness probe
"""

import os
import time
import json
from collections import defaultdict
from typing import AsyncGenerator

from groq import Groq
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from retrieve import retrieve
from persona import build_system_prompt

app = FastAPI(title="AI Rayane — Digital Twin")

ALLOWED_ORIGINS = [
    "https://rytaaaaaaa-ai-rayane-portfolio.hf.space",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

client = Groq(api_key=os.environ["GROQ_API_KEY"])
MODEL = "llama-3.1-8b-instant"   # free, fast, smart
MAX_TOKENS = 800

# --- Rate limiting (in-memory, per IP) ---
RATE_LIMIT = 30
RATE_WINDOW = 60 * 60
_rate_store: dict[str, list[float]] = defaultdict(list)


def check_rate_limit(ip: str):
    now = time.time()
    timestamps = [t for t in _rate_store[ip] if now - t < RATE_WINDOW]
    _rate_store[ip] = timestamps
    if len(timestamps) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
    _rate_store[ip].append(now)


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []
    lang: str = "en"

    def validate_message(self) -> str:
        msg = self.message.strip()
        if not msg:
            raise HTTPException(status_code=400, detail="Empty message.")
        if len(msg) > 2000:
            raise HTTPException(status_code=400, detail="Message too long.")
        return msg

    def validated_lang(self) -> str:
        return self.lang if self.lang in ("en", "fr", "ar") else "en"


async def stream_response(system_prompt: str, messages: list[dict]) -> AsyncGenerator[str, None]:
    stream = client.chat.completions.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        messages=[{"role": "system", "content": system_prompt}] + messages,
        stream=True,
    )
    for chunk in stream:
        token = chunk.choices[0].delta.content or ""
        if token:
            yield f"data: {json.dumps({'text': token})}\n\n"
    yield "data: [DONE]\n\n"


@app.post("/chat")
async def chat(req: ChatRequest, request: Request):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(ip)

    message = req.validate_message()

    context = retrieve(message)
    system_prompt = build_system_prompt(
        factual_chunks=context["factual"],
        style_samples=context["style"],
        lang=req.validated_lang(),
    )

    history = req.history[-10:]
    messages = history + [{"role": "user", "content": message}]

    return StreamingResponse(
        stream_response(system_prompt, messages),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/health")
async def health():
    return {"status": "ok", "model": MODEL}
