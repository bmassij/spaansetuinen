"""
Watcher for demo-html-css directory. Uses watchdog to detect create/modify/delete and triggers indexer.
"""
import time
import threading
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from pathlib import Path
from .indexer import Indexer


class ChangeHandler(FileSystemEventHandler):
    def __init__(self, indexer: Indexer, debounce_seconds: float = 1.0):
        self.indexer = indexer
        self.debounce_seconds = debounce_seconds
        self._timer = None
        self.logger = logging.getLogger("SpaanseTuinen.Watcher")

    def _debounced_index(self):
        if self._timer and self._timer.is_alive():
            return
        self._timer = threading.Timer(self.debounce_seconds, self.indexer.index)
        self._timer.start()

    def on_created(self, event):
        if not event.is_directory:
            self.logger.info(f"Created: {event.src_path}")
            self._debounced_index()

    def on_modified(self, event):
        if not event.is_directory:
            self.logger.info(f"Modified: {event.src_path}")
            self._debounced_index()

    def on_deleted(self, event):
        if not event.is_directory:
            self.logger.info(f"Deleted: {event.src_path}")
            try:
                # normalize event path and compare against stored metadata paths
                deleted_path = Path(event.src_path).resolve()
                try:
                    source_root = self.indexer.source_dir.resolve()
                except Exception:
                    source_root = self.indexer.source_dir
                docs = self.indexer.chroma.list_documents(limit=10000)
                ids = docs.get("ids", []) if isinstance(docs, dict) else []
                metadatas = docs.get("metadatas", []) if isinstance(docs, dict) else []
                for i, md in enumerate(metadatas):
                    if not isinstance(md, dict):
                        continue
                    md_path = md.get("path")
                    if not md_path:
                        continue
                    # normalize stored metadata path
                    try:
                        md_path_norm = str(Path(md_path).resolve())
                    except Exception:
                        md_path_norm = md_path
                    # compare absolute and relative forms
                    rel_path = None
                    try:
                        rel_path = str(deleted_path.relative_to(source_root))
                    except Exception:
                        rel_path = None
                    if md_path_norm == str(deleted_path) or md_path == event.src_path or md_path == rel_path:
                        doc_id = ids[i] if i < len(ids) else None
                        if not doc_id:
                            # if we didn't get an id, try delete by metadata path
                            try:
                                deleted = self.indexer.chroma.delete_by_metadata("path", md_path)
                                if deleted:
                                    self.logger.info(f"Deleted {deleted} docs from Chroma by metadata path {md_path}")
                                    continue
                            except Exception:
                                pass
                        else:
                            self.indexer.chroma.delete(doc_id)
                            self.logger.info(f"Deleted from Chroma: {doc_id}")
            except Exception as e:
                self.logger.exception(f"Error deleting from Chroma for {event.src_path}: {e}")
            except Exception as e:
                self.logger.exception(f"Error deleting from Chroma for {event.src_path}: {e}")


class Watcher:
    def __init__(self, source_dir: str, chroma_dir: str):
        self.source_dir = Path(source_dir)
        self.chroma_dir = Path(chroma_dir)
        self.logger = logging.getLogger("SpaanseTuinen.Watcher")
        self.indexer = Indexer(self.source_dir, self.chroma_dir)
        self.observer = Observer()

    def start(self):
        handler = ChangeHandler(self.indexer)
        self.observer.schedule(handler, str(self.source_dir), recursive=True)
        self.observer.start()
        self.logger.info(f"Watcher started on {self.source_dir}")
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()
