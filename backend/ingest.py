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

CORPUS_DIR = Path(__file__).parent.parent / "corpus"
CHROMA_DIR = Path(__file__).parent / "chroma_db"
COLLECTION_NAME = "rayane_twin"

CHUNK_SIZE = 400      # tokens (approx chars / 4)
CHUNK_OVERLAP = 80


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


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    """Split text into overlapping character-level chunks (proxy for tokens)."""
    words = text.split()
    chunks = []
    step = chunk_size - overlap
    for i in range(0, len(words), step):
        chunk = " ".join(words[i : i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks


def build_index():
    print("Loading documents from corpus/...")
    docs = load_documents()
    print(f"  {len(docs)} documents found")

    print("Chunking...")
    chunks, metadatas, ids = [], [], []
    for doc in docs:
        is_style = "style_samples" in doc["source"]
        for i, chunk in enumerate(chunk_text(doc["text"])):
            chunk_id = f"{doc['source']}::chunk{i}"
            chunks.append(chunk)
            metadatas.append({"source": doc["source"], "is_style": str(is_style)})
            ids.append(chunk_id)
    print(f"  {len(chunks)} chunks total")

    print("Loading embedding model (bge-small-en-v1.5)...")
    model = SentenceTransformer("BAAI/bge-small-en-v1.5")

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
