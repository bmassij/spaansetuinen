"""
Chroma manager: initializes chroma client, handles upserts and searches.
Designed to be backend-agnostic (wraps chromadb) so other DB backends can be added later.
"""
import os
import logging
from typing import List, Dict, Any, Callable, Optional

try:
    import chromadb
    from chromadb.config import Settings
except Exception:
    chromadb = None

logger = logging.getLogger(__name__)


class ChromaManager:
    def __init__(
        self,
        persist_directory: Optional[str] = None,
        collection_name: str = "projects",
        embedding_function: Optional[Callable[[str], List[float]]] = None,
    ):
        """
        persist_directory: folder where Chroma will persist its DB files
        embedding_function: optional callable(text) -> vector to allow ChromaManager to convert text queries to embeddings
        """
        self.persist_directory = persist_directory or os.environ.get("PERSIST_DIR", "./ProjectIndexDB/data/chroma_db")
        self.collection_name = collection_name
        self.embedding_function = embedding_function
        self.client = None
        self.collection = None
        self._init_client()

    def _init_client(self):
        if chromadb is None:
            raise RuntimeError("chromadb package is not installed. Install via 'pip install chromadb'.")
        os.makedirs(self.persist_directory, exist_ok=True)
        settings = Settings(chroma_db_impl="duckdb+parquet", persist_directory=self.persist_directory)
        self.client = chromadb.Client(settings=settings)
        self.collection = self.client.get_or_create_collection(name=self.collection_name)
        logger.info("Initialized chroma client at %s, collection=%s", self.persist_directory, self.collection_name)

    def upsert_documents(
        self,
        ids: List[str],
        documents: List[str],
        metadatas: List[Dict[str, Any]],
        embeddings: Optional[List[List[float]]] = None,
    ) -> None:
        """Add or update documents in the collection. If embeddings are provided they will be used.
        ids/documents/metadatas should have equal lengths.
        """
        if not ids:
            return
        try:
            if embeddings is not None:
                self.collection.add(ids=ids, documents=documents, metadatas=metadatas, embeddings=embeddings)
            else:
                self.collection.add(ids=ids, documents=documents, metadatas=metadatas)
            self.client.persist()
            logger.info("Upserted %d documents to collection '%s'", len(ids), self.collection_name)
        except Exception as e:
            logger.exception("Failed to upsert documents: %s", e)

    def query_by_embedding(self, embedding: List[float], n_results: int = 10) -> Dict[str, Any]:
        """Query the collection using an embedding vector."""
        try:
            results = self.collection.query(query_embeddings=[embedding], n_results=n_results)
            return results
        except Exception as e:
            logger.exception("Chroma query_by_embedding failed: %s", e)
            return {}

    def query_text(self, text: str, n_results: int = 10, text_to_embedding: Optional[Callable[[str], List[float]]] = None) -> Dict[str, Any]:
        """Query by raw text. If a text_to_embedding function is provided (or an embedding_function exists), it will be used.
        Otherwise it will attempt to call chroma's query with query_texts (depends on chroma setup).
        """
        try:
            fn = text_to_embedding or self.embedding_function
            if fn is not None:
                emb = fn(text)
                return self.query_by_embedding(emb, n_results=n_results)
            # fallback to query_texts which may use an internal embedding function if configured
            results = self.collection.query(query_texts=[text], n_results=n_results)
            return results
        except Exception as e:
            logger.exception("Chroma query_text failed: %s", e)
            return {}

    def delete_by_ids(self, ids: List[str]) -> None:
        try:
            if not ids:
                return
            self.collection.delete(ids=ids)
            self.client.persist()
            logger.info("Deleted %d ids from collection '%s'", len(ids), self.collection_name)
        except Exception as e:
            logger.exception("Chroma delete_by_ids failed: %s", e)

    def get_collection_info(self) -> Dict[str, Any]:
        try:
            return {"name": self.collection_name, "count": self.collection.count()}
        except Exception as e:
            logger.exception("Failed to get collection info: %s", e)
            return {"name": self.collection_name, "count": 0}

    def persist(self) -> None:
        try:
            self.client.persist()
            logger.info("Chroma client persisted to %s", self.persist_directory)
        except Exception as e:
            logger.exception("Chroma persist failed: %s", e)
