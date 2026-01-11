import json
from types import SimpleNamespace
import pytest
from pathlib import Path

# Tests for Indexer and Watcher using mocks to avoid real Chroma/embeddings

class MockChroma:
    def __init__(self):
        self.upsert_calls = []
        self.deleted_ids = []
        self.deleted_by_metadata = []
        # sample stored docs structure for list_documents
        self._docs = {"ids": [], "documents": [], "metadatas": []}

    def upsert(self, ids=None, documents=None, embeddings=None, metadatas=None):
        # chroma.Client.collection.upsert signature used in code
        for i, _id in enumerate(ids or []):
            self.upsert_calls.append({
                "id": _id,
                "document": (documents or [])[i] if documents else "",
                "embedding": (embeddings or [])[i] if embeddings else [],
                "metadata": (metadatas or [])[i] if metadatas else {},
            })
            # mirror in internal docs
            self._docs["ids"].append(_id)
            self._docs["documents"].append((documents or [])[i] if documents else "")
            self._docs["metadatas"].append((metadatas or [])[i] if metadatas else {})

    def get(self, limit=1000, where=None):
        # simple emulation: if where provided, filter
        if where:
            key, val = next(iter(where.items()))
            ids = []
            documents = []
            metadatas = []
            for i, md in enumerate(self._docs.get("metadatas", [])):
                if isinstance(md, dict) and md.get(key) == val:
                    ids.append(self._docs.get("ids", [])[i])
                    documents.append(self._docs.get("documents", [])[i])
                    metadatas.append(md)
            return {"ids": ids, "documents": documents, "metadatas": metadatas}
        # default
        return self._docs

    # adapter methods matching ChromaManager wrapper
    def upsert_document(self, doc_id, text, embedding, metadata):
        self.upsert(ids=[doc_id], documents=[text], embeddings=[embedding], metadatas=[metadata])

    def list_documents(self, limit=1000):
        return self.get(limit=limit)

    def delete(self, ids=None):
        for _id in ids or []:
            self.deleted_ids.append(_id)
            # remove from internal store if present
            if _id in self._docs.get("ids", []):
                i = self._docs["ids"].index(_id)
                for k in ("ids", "documents", "metadatas"):
                    try:
                        self._docs[k].pop(i)
                    except Exception:
                        pass

    def delete_by_metadata(self, key, value, limit=1000):
        removed = 0
        new_ids = []
        new_docs = []
        new_mds = []
        for i, md in enumerate(self._docs.get("metadatas", [])):
            if isinstance(md, dict) and md.get(key) == value:
                self.deleted_by_metadata.append(self._docs.get("ids", [])[i])
                removed += 1
            else:
                new_ids.append(self._docs.get("ids", [])[i])
                new_docs.append(self._docs.get("documents", [])[i])
                new_mds.append(md)
        self._docs = {"ids": new_ids, "documents": new_docs, "metadatas": new_mds}
        return removed


@pytest.fixture(autouse=True)
def patch_chroma_and_embedding(monkeypatch, tmp_path):
    # Replace ChromaManager instance in Indexer with our mock when tests create Indexer
    from SpaanseTuinenDB import indexer as indexer_mod

    original_get_embedding = None
    try:
        original_get_embedding = indexer_mod.get_embedding
    except Exception:
        pass

    # stub embedding
    def fake_embedding(text):
        return [0.1, 0.2, 0.3]

    monkeypatch.setattr(indexer_mod, "get_embedding", fake_embedding, raising=False)
    yield
    # restore not necessary in test process


def test_indexer_upserts_sections(tmp_path, monkeypatch):
    # create a simple html file
    html = """
    <html>
      <header><h1>Hero Title</h1></header>
      <section><h2>Section One</h2><p>Content A</p></section>
      <section><h2>Section Two</h2><p>Content B</p></section>
    </html>
    """
    src_dir = tmp_path / "site"
    src_dir.mkdir()
    page = src_dir / "page.html"
    page.write_text(html, encoding="utf-8")

    # create Indexer and inject mock chroma
    from SpaanseTuinenDB.indexer import Indexer
    idx = Indexer(str(src_dir), str(tmp_path / "chroma"))
    mock = MockChroma()
    idx.chroma = mock

    # run index
    idx.index()

    # Expect upsert for hero + 2 sections (sections.py heuristics may include header, sections, footer)
    assert len(mock.upsert_calls) >= 3
    # check that at least one call contains 'Hero Title'
    texts = [c["document"] for c in mock.upsert_calls]
    assert any("Hero Title" in t or "Section One" in t for t in texts)


def test_watcher_delete_triggers_chroma_delete(tmp_path, monkeypatch):
    # prepare a fake file and mock chroma containing an entry for it
    src_dir = tmp_path / "site"
    src_dir.mkdir()
    f = src_dir / "old.html"
    f.write_text("<p>old</p>", encoding="utf-8")

    from SpaanseTuinenDB.watcher import Watcher, ChangeHandler
    from SpaanseTuinenDB.indexer import Indexer

    watcher = Watcher(str(src_dir), str(tmp_path / "chroma"))
    # replace chroma manager with mock
    mock = MockChroma()
    # seed mock with a document that has metadata.path equal to relative path
    mock._docs = {
        "ids": ["doc::old"],
        "documents": ["<p>old</p>"],
        "metadatas": [{"path": str(f.relative_to(src_dir))}]
    }
    watcher.indexer.chroma = mock

    handler = ChangeHandler(watcher.indexer)
    event = SimpleNamespace(is_directory=False, src_path=str(f))

    handler.on_deleted(event)

    # after deletion, either delete called or delete_by_metadata removed doc
    assert ("doc::old" in mock.deleted_ids) or ("doc::old" in mock.deleted_by_metadata) or len(mock._docs.get("ids", [])) == 0
