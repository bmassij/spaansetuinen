import time
import logging
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

logger = logging.getLogger(__name__)


class ProjectWatcher(FileSystemEventHandler):
    def __init__(self, indexer, watch_path: str):
        self.indexer = indexer
        self.watch_path = watch_path

    def on_created(self, event):
        # when a new file/folder is created, re-run index for simplicity
        logger.info('Filesystem created: %s', event.src_path)
        self.indexer.index()

    def on_modified(self, event):
        logger.info('Filesystem modified: %s', event.src_path)
        self.indexer.index()


def start_watcher(indexer, watch_path: str):
    event_handler = ProjectWatcher(indexer=indexer, watch_path=watch_path)
    observer = Observer()
    observer.schedule(event_handler, watch_path, recursive=True)
    observer.start()
    logger.info('Started watcher on %s', watch_path)
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
