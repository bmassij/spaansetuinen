"""
CLI entrypoint: sync_spaanse_tuinen.py equivalent
"""
import argparse
from pathlib import Path
import logging
from .indexer import Indexer
from .watcher import Watcher


def setup_logging(log_dir: Path):
    log_dir.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        filename=str(log_dir / "spaansetuinen.log"),
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )


def main():
    parser = argparse.ArgumentParser(description="Sync Spaanse Tuinen demo site to Chroma DB")
    parser.add_argument("--overview", action="store_true", help="Generate overview of pages/sections/files")
    parser.add_argument("--update-assets", action="store_true", help="Update only assets (images/PDFs)")
    parser.add_argument("--watch", action="store_true", help="Start watcher for automatic updates")
    args = parser.parse_args()

    base = Path.cwd()
    src = base / "website" / "public"
    project_dir = base / "backend" / "spaansetuinen-db"
    data_dir = project_dir / "data" / "chroma_db"
    logs_dir = project_dir / "logs"
    setup_logging(logs_dir)
    logger = logging.getLogger("SpaanseTuinen.Main")

    indexer = Indexer(str(src), str(data_dir))

    if args.overview:
        # simple overview: list documents
        docs = indexer.chroma.list_documents()
        print(docs)
        return

    if args.update_assets:
        # re-index but only binary assets
        indexer.index()
        return

    # default: full sync
    indexer.index()

    if args.watch:
        watcher = Watcher(str(src), str(data_dir))
        watcher.start()


if __name__ == "__main__":
    main()
