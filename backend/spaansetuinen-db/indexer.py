"""
Indexer for demo-html-css website. Scans files, extracts text and sections, produces embeddings and upserts to Chroma.
"""
import os
from pathlib import Path
import hashlib
from datetime import datetime
try:
    from .sections import detect_sections
    from .embeddings import get_embedding
    from .chroma_manager import ChromaManager
except ImportError:
    from sections import detect_sections
    from embeddings import get_embedding
    from chroma_manager import ChromaManager
import logging
import mimetypes


class Indexer:
    def __init__(self, source_dir: str, chroma_dir: str):
        self.source_dir = Path(source_dir)
        self.chroma = ChromaManager(chroma_dir)
        self.logger = logging.getLogger("SpaanseTuinen.Indexer")

    def file_hash(self, path: Path) -> str:
        h = hashlib.sha256()
        with open(path, "rb") as f:
            while True:
                chunk = f.read(8192)
                if not chunk:
                    break
                h.update(chunk)
        return h.hexdigest()

    def index(self):
        for root, dirs, files in os.walk(self.source_dir):
            for fname in files:
                path = Path(root) / fname
                rel = path.relative_to(self.source_dir)
                mime, _ = mimetypes.guess_type(str(path))
                fhash = self.file_hash(path)
                modified = datetime.fromtimestamp(path.stat().st_mtime).isoformat()
                try:
                    if mime and mime.startswith("text") or path.suffix in (".html", ".css", ".js", ".md"):
                        text = path.read_text(encoding="utf-8", errors="ignore")
                        sections = detect_sections(text) if path.suffix == ".html" else [{"type": "content", "text": text[:2000]}]
                        # upsert each section
                        for i, sec in enumerate(sections):
                            doc_id = f"{rel}::sec{i}"
                            emb = get_embedding(sec.get("text", ""))
                            metadata = {
                                "page": str(rel),
                                "section": sec.get("type"),
                                "filetype": path.suffix,
                                "path": str(path),
                                "hash": fhash,
                                "modified": modified,
                            }
                            self.chroma.upsert_document(doc_id, sec.get("text", ""), emb, metadata)
                            self.logger.info(f"Upserted {doc_id}")
                    else:
                        # binary assets: skip embedding creation for now
                        # Only index text content for vector search
                        self.logger.info(f"Skipping binary asset {path} (no text content)")
                except Exception as e:
                    self.logger.exception(f"Error indexing {path}: {e}")
