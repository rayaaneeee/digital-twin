"""
Ingestion pipeline: chunk corpus/ → embed → store in Chroma.
Run once to build the DB, re-run anytime corpus changes.

Usage:
    python ingest.py
"""

import os
import glob
from pathlib import Path

from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

CORPUS_DIR = Path(__file__).parent / "corpus"
CHROMA_DIR = Path(__file__).parent / "chroma_db"
COLLECTION_NAME = "rayane_twin"
EMBED_MODEL = "paraphrase-multilingual-MiniLM-L12-v2"  # 50+ languages incl. AR/FR

CHUNK_SIZE = 200      # words per chunk — smaller = cleaner, less cross-topic bleed
CHUNK_OVERLAP = 30


def load_documents() -> list[dict]:
    """Load all .md files from corpus/, tag each with its source path."""
    docs = []
    for path in sorted(glob.glob(str(CORPUS_DIR / "**/*.md"), recursive=True)):
        if "style_samples/README.md" in path:
            continue
        text = Path(path).read_text(encoding="utf-8").strip()
        rel = os.path.relpath(path, CORPUS_DIR)
        docs.append({"text": text, "source": rel})
    return docs


def chunk_by_section(text: str, source: str) -> list[str]:
    """Split on ## headings first; fall back to word-level chunking for long sections."""
    sections = []
    current_header = ""
    current_lines: list[str] = []

    for line in text.splitlines():
        if line.startswith("## "):
            if current_lines:
                sections.append((current_header, "\n".join(current_lines).strip()))
            current_header = line
            current_lines = [line]
        else:
            current_lines.append(line)

    if current_lines:
        sections.append((current_header, "\n".join(current_lines).strip()))

    chunks = []
    for header, body in sections:
        words = body.split()
        if len(words) <= CHUNK_SIZE:
            if body:
                chunks.append(body)
        else:
            step = CHUNK_SIZE - CHUNK_OVERLAP
            for i in range(0, len(words), step):
                part = " ".join(words[i : i + CHUNK_SIZE])
                if part:
                    chunks.append(part)

    return chunks if chunks else [text]


def build_index():
    print("Loading documents from corpus/...")
    docs = load_documents()
    print(f"  {len(docs)} documents found")

    print("Chunking...")
    chunks, metadatas, ids = [], [], []
    for doc in docs:
        is_style = "style_samples" in doc["source"]
        for i, chunk in enumerate(chunk_by_section(doc["text"], doc["source"])):
            chunk_id = f"{doc['source']}::chunk{i}"
            chunks.append(chunk)
            metadatas.append({"source": doc["source"], "is_style": str(is_style)})
            ids.append(chunk_id)
    print(f"  {len(chunks)} chunks total")

    print(f"Loading embedding model ({EMBED_MODEL})...")
    model = SentenceTransformer(EMBED_MODEL)

    print("Embedding...")
    embeddings = model.encode(chunks, show_progress_bar=True, batch_size=64).tolist()

    print("Storing in Chroma...")
    client = chromadb.PersistentClient(path=str(CHROMA_DIR))
    if COLLECTION_NAME in [c.name for c in client.list_collections()]:
        client.delete_collection(COLLECTION_NAME)
    collection = client.create_collection(COLLECTION_NAME, metadata={"hnsw:space": "cosine"})
    collection.add(documents=chunks, embeddings=embeddings, metadatas=metadatas, ids=ids)

    print(f"\nDone. {len(chunks)} chunks indexed in {CHROMA_DIR}")


if __name__ == "__main__":
    build_index()
