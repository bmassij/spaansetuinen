"""
SpaanseTuinenDB.chroma_manager
Chroma DB wrapper for upsert, query and metadata management.
"""
from pathlib import Path
import chromadb
from chromadb.config import Settings

class ChromaManager:
    def __init__(self, persist_dir: str | Path):
        self.persist_dir = Path(persist_dir)
        self.persist_dir.mkdir(parents=True, exist_ok=True)
        self.client = chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory=str(self.persist_dir)))
        # collection per project (name 'spaansetuinen')
        self.collection = self.client.get_or_create_collection(name="spaansetuinen")

    def upsert_document(self, doc_id: str, text: str, embedding: list, metadata: dict):
        """Upsert a single document into Chroma.
        doc_id: unique id (use file path + section id)
        text: text content
        embedding: vector
        metadata: dict with page, section, filetype, path, modified
        """
        self.collection.upsert(ids=[doc_id], documents=[text], embeddings=[embedding], metadatas=[metadata])

    def get(self, doc_id: str):
        try:
            res = self.collection.get(ids=[doc_id])
            return res
        except Exception:
            return None

    def query(self, query_text: str, n_results: int = 5):
        res = self.collection.query(query_texts=[query_text], n_results=n_results)
        return res

    def list_documents(self, limit: int = 1000):
        """Return collection documents up to limit.
        Falls back to raw collection.get() result.
        """
        try:
            return self.collection.get(limit=limit)
        except Exception:
            # ensure graceful failure
            return {"ids": [], "documents": [], "metadatas": []}

    def query_by_metadata(self, key: str, value, limit: int = 1000):
        """Query collection by metadata key/value.
        Tries to use server-side filtering (where) when available; falls back to scanning results.
        Returns a dict with ids, documents and metadatas for matches.
        """
        try:
            # try server-side filter (chroma supports `where` in many builds)
            res = self.collection.get(where={key: value}, limit=limit)
            return res
        except Exception:
            # fallback: fetch and filter client-side
            try:
                all_docs = self.collection.get(limit=limit)
            except Exception:
                return {"ids": [], "documents": [], "metadatas": []}
            ids = all_docs.get("ids", []) if isinstance(all_docs, dict) else []
            documents = all_docs.get("documents", []) if isinstance(all_docs, dict) else []
            metadatas = all_docs.get("metadatas", []) if isinstance(all_docs, dict) else []
            matched_ids = []
            matched_docs = []
            matched_mds = []
            for i, md in enumerate(metadatas):
                if isinstance(md, dict) and md.get(key) == value:
                    matched_ids.append(ids[i] if i < len(ids) else None)
                    matched_docs.append(documents[i] if i < len(documents) else "")
                    matched_mds.append(md)
            return {"ids": matched_ids, "documents": matched_docs, "metadatas": matched_mds}

    def delete_by_metadata(self, key: str, value, limit: int = 1000):
        """Delete documents whose metadata[key] == value. Returns number of deleted ids."""
        try:
            res = self.query_by_metadata(key, value, limit=limit)
            ids = res.get("ids", []) if isinstance(res, dict) else []
            ids_to_delete = [i for i in ids if i]
            if not ids_to_delete:
                return 0
            self.collection.delete(ids=ids_to_delete)
            return len(ids_to_delete)
        except Exception:
            return 0

    def delete(self, doc_id: str):
        try:
            self.collection.delete(ids=[doc_id])
        except Exception:
            pass
