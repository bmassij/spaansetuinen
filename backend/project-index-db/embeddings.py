import os
import logging
from typing import Callable, List

logger = logging.getLogger(__name__)

try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None


class EmbeddingProvider:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.model_name = model_name
        self.model = None
        self._init_model()

    def _init_model(self):
        if SentenceTransformer is None:
            logger.warning('sentence-transformers not installed, embeddings using openai or other provider required')
            return
        self.model = SentenceTransformer(self.model_name)
        logger.info('Loaded sentence-transformers model: %s', self.model_name)

    def embed(self, texts: List[str]) -> List[List[float]]:
        if self.model is None:
            raise RuntimeError('No embedding model loaded')
        return self.model.encode(texts, show_progress_bar=False).tolist()

    def embed_one(self, text: str) -> List[float]:
        return self.embed([text])[0]
