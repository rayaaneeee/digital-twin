# HuggingFace Space — AI Rayane Backend (FastAPI + RAG)
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source and corpus
COPY backend/ ./backend/
COPY corpus/ ./corpus/

# Build the Chroma vector DB at image build time
RUN cd backend && python ingest.py

EXPOSE 7860

CMD ["sh", "-c", "cd /app/backend && uvicorn main:app --host 0.0.0.0 --port 7860"]
