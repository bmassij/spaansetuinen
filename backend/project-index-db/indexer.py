import os
import logging
from typing import List, Dict, Any, Callable, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

TEXT_FILE_EXTENSIONS = {'.py', '.txt', '.md', '.json', '.js', '.ts', '.html', '.css', '.yml', '.yaml', '.csv'}


def read_file(path: str) -> str:
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    except Exception as e:
        logger.exception('Failed to read file %s: %s', path, e)
        return ''


def is_text_file(path: str) -> bool:
    ext = os.path.splitext(path)[1].lower()
    return ext in TEXT_FILE_EXTENSIONS


def chunk_text(text: str, max_chars: int = 1500) -> List[str]:
    """Chunk text into pieces not exceeding max_chars, trying to split on newlines or spaces."""
    if len(text) <= max_chars:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + max_chars, len(text))
        # try to backtrack to nearest newline
        if end < len(text):
            nl = text.rfind('\n', start, end)
            if nl > start:
                end = nl
        chunks.append(text[start:end])
        start = end
    return chunks


class Indexer:
    def __init__(self, embedding_fn: Callable[[str], List[float]], chroma_manager, root_folder: str):
        self.embedding_fn = embedding_fn
        self.chroma_manager = chroma_manager
        self.root_folder = root_folder

    def index(self):
        ids = []
        docs = []
        metas = []
        embeddings = []
        for dirpath, dirnames, filenames in os.walk(self.root_folder):
            # define project name as top-level folder under root
            rel = os.path.relpath(dirpath, self.root_folder)
            if rel == '.':
                project_name = os.path.basename(self.root_folder)
            else:
                parts = rel.split(os.sep)
                project_name = parts[0]

            for fn in filenames:
                full = os.path.join(dirpath, fn)
                if not is_text_file(full):
                    continue
                text = read_file(full)
                if not text.strip():
                    continue
                file_type = os.path.splitext(fn)[1].lstrip('.')
                file_date = datetime.fromtimestamp(os.path.getmtime(full)).isoformat()
                chunks = chunk_text(text)
                for i, chunk in enumerate(chunks):
                    doc_id = f"{project_name}::{os.path.relpath(full, self.root_folder)}::chunk{i}"
                    ids.append(doc_id)
                    docs.append(chunk)
                    metas.append({
                        'project': project_name,
                        'path': os.path.relpath(full, self.root_folder),
                        'modified': file_date,
                        'file_type': file_type,
                    })
                    emb = self.embedding_fn(chunk)
                    embeddings.append(emb)
                    logger.debug('Prepared chunk %s', doc_id)
        self.chroma_manager.upsert_documents(ids=ids, documents=docs, metadatas=metas, embeddings=embeddings)
        logger.info('Indexed root folder %s: %d documents', self.root_folder, len(ids))
