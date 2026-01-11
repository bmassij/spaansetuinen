"""
Embeddings helper. Uses sentence-transformers locally by default; can be extended to OpenAI.
"""
from sentence_transformers import SentenceTransformer

_model = None

def load_model(name: str = "all-MiniLM-L6-v2"):
    global _model
    if _model is None:
        _model = SentenceTransformer(name)
    return _model


def get_embedding(text: str) -> list:
    model = load_model()
    vec = model.encode(text)
    return vec.tolist()
