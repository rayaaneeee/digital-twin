"""
RAG retrieval: embed a query and fetch the top-k most relevant chunks from Chroma.
Separates factual chunks from style chunks so they can be injected differently.
"""

from pathlib import Path
from functools import lru_cache

from sentence_transformers import SentenceTransformer
import chromadb

CHROMA_DIR = Path(__file__).parent / "chroma_db"
COLLECTION_NAME = "rayane_twin"
TOP_K = 6


@lru_cache(maxsize=1)
def _load_resources():
    model = SentenceTransformer("BAAI/bge-small-en-v1.5")
    client = chromadb.PersistentClient(path=str(CHROMA_DIR))
    collection = client.get_collection(COLLECTION_NAME)
    return model, collection


def retrieve(query: str, top_k: int = TOP_K) -> dict:
    """
    Returns:
        {
          "factual": [str, ...],   # context chunks (projects, CV, skills)
          "style":   [str, ...],   # writing style samples
        }
    """
    model, collection = _load_resources()
    query_emb = model.encode([query]).tolist()

    results = collection.query(
        query_embeddings=query_emb,
        n_results=top_k,
        include=["documents", "metadatas"],
    )

    factual, style = [], []
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        if meta.get("is_style") == "True":
            style.append(doc)
        else:
            factual.append(doc)

    return {"factual": factual, "style": style}
