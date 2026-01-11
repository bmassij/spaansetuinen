import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)


class SearchService:
    def __init__(self, chroma_manager, text_to_embedding=None):
        self.chroma = chroma_manager
        self.text_to_embedding = text_to_embedding

    def search_text(self, text: str, n: int = 10) -> List[Dict[str, Any]]:
        if self.text_to_embedding:
            results = self.chroma.query_text(text, n_results=n, text_to_embedding=self.text_to_embedding)
        else:
            results = self.chroma.query_text(text, n_results=n)
        # normalize results into list of hits
        hits = []
        # chroma returns dict with ids/documents/metadatas/scores
        for i in range(len(results.get('ids', [[]])[0])):
            hit = {
                'id': results['ids'][0][i],
                'document': results.get('documents', [[]])[0][i],
                'metadata': results.get('metadatas', [[]])[0][i],
                'score': results.get('distances', [[]])[0][i] if 'distances' in results else None,
            }
            hits.append(hit)
        return hits

    def search_by_embedding(self, embedding: List[float], n: int = 10) -> List[Dict[str, Any]]:
        results = self.chroma.query_by_embedding(embedding, n_results=n)
        hits = []
        for i in range(len(results.get('ids', [[]])[0])):
            hit = {
                'id': results['ids'][0][i],
                'document': results.get('documents', [[]])[0][i],
                'metadata': results.get('metadatas', [[]])[0][i],
                'score': results.get('distances', [[]])[0][i] if 'distances' in results else None,
            }
            hits.append(hit)
        return hits
