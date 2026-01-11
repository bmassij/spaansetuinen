"""
test_system.py

Purpose:
- Scan C:\ drive for VS Code projects (folders with .vscode or *.code-workspace files).
- For each found project: check if already indexed (uses local projects index + chroma metadata heuristics); if not, index with Indexer and add a project entry.
- Run ProjectIndexDB/main.py briefly to exercise the system.
- Test imports/initialization of indexer, watcher, search, chroma_manager, embeddings.
- Produce an overview of projects and write detailed logs to ProjectIndexDB/logs/test_run.log.

Dependencies & how to run:
- Python 3.8+
- Install requirements: pip install -r ProjectIndexDB/requirements.txt
- Optional: sentence-transformers, chromadb, watchdog, openai depending on your setup.

Usage:
- Full scan (default): python ProjectIndexDB/test_system.py
- Overview only:   python ProjectIndexDB/test_system.py --overview

Notes:
- Scanning C:\ may take a long time. The script skips common system folders for speed. Adjust SKIP_DIRS if needed.
- The script keeps a small local index at ProjectIndexDB/data/projects_index.json to record added projects (used to identify previously added projects).

"""

import os
import sys
import argparse
import logging
import json
import subprocess
from pathlib import Path
from datetime import datetime

# Project base
BASE_DIR = Path(__file__).resolve().parent
LOG_DIR = BASE_DIR / 'logs'
DATA_DIR = BASE_DIR / 'data'
LOCAL_INDEX_FILE = DATA_DIR / 'projects_index.json'

# ensure dirs
LOG_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

LOG_FILE = LOG_DIR / 'test_run.log'

logging.basicConfig(
    filename=str(LOG_FILE),
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(name)s - %(message)s'
)
logger = logging.getLogger('test_system')

# imports from project
try:
    from chroma_manager import ChromaManager
    from indexer import Indexer
    from watcher import ProjectWatcher
    from search import SearchService
    from embeddings import EmbeddingProvider
except Exception as e:
    logger.exception('Failed to import project modules at startup: %s', e)
    # allow script to continue so errors are logged and visible


# Configuration: folders to skip while scanning C:\ for speed and permission reasons
SKIP_DIRS = {
    'C:\\Windows',
    'C:\\Program Files',
    'C:\\Program Files (x86)',
    'C:\\ProgramData',
    'C:\\$Recycle.Bin',
}


def load_local_index():
    if not LOCAL_INDEX_FILE.exists():
        return {}
    try:
        with open(LOCAL_INDEX_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.exception('Failed to load local index %s: %s', LOCAL_INDEX_FILE, e)
        return {}


def save_local_index(index: dict):
    try:
        with open(LOCAL_INDEX_FILE, 'w', encoding='utf-8') as f:
            json.dump(index, f, indent=2, ensure_ascii=False)
        logger.info('Saved local projects index (%d entries)', len(index))
    except Exception as e:
        logger.exception('Failed to save local index: %s', e)


def scan_c_drive_for_projects(limit: int = None):
    """Scan C:\ for folders containing a .vscode subfolder or any *.code-workspace file.
    Skips common system folders to avoid long scanning and permission errors.
    Returns a list of absolute paths to project folders.
    """
    projects = []
    root = Path('C:/')
    count = 0
    for dirpath, dirnames, filenames in os.walk(root):
        # early limit check
        if limit is not None and count >= limit:
            break
        try:
            # normalize
            dirp = os.path.abspath(dirpath)
            if any(dirp.startswith(s) for s in SKIP_DIRS):
                # prune
                dirnames[:] = []
                continue

            # check for .vscode folder
            if '.vscode' in dirnames:
                projects.append(dirp)
                count += 1
                # skip descending further into this project for speed
                dirnames[:] = []
                continue

            # check for .code-workspace files in this folder
            for f in filenames:
                if f.endswith('.code-workspace'):
                    projects.append(dirp)
                    count += 1
                    dirnames[:] = []
                    break
        except Exception as e:
            logger.debug('Error scanning %s: %s', dirpath, e)
            continue
    return projects


def get_existing_projects_from_chroma(chroma: ChromaManager):
    """Attempt to derive existing project names from chroma collection metadatas.
    Returns a dict mapping project_name -> document_count.
    """
    existing = {}
    try:
        # try to inspect collection if available
        coll = getattr(chroma, 'collection', None)
        if coll is None:
            return existing
        # try to call chroma's get to fetch metadatas
        res = coll.get(include=['metadatas', 'ids'])
        metadatas = res.get('metadatas', [[]])[0] if isinstance(res.get('metadatas', None), list) else []
        ids = res.get('ids', [[]])[0] if isinstance(res.get('ids', None), list) else []
        for m in metadatas:
            if not isinstance(m, dict):
                continue
            proj = m.get('project') or m.get('project_name')
            if not proj:
                continue
            existing.setdefault(proj, 0)
            existing[proj] += 1
    except Exception as e:
        logger.debug('Could not query chroma collection for existing projects: %s', e)
    return existing


def add_missing_projects_to_db(chroma: ChromaManager, embedding_fn, projects: list):
    local_index = load_local_index()
    existing_chroma = get_existing_projects_from_chroma(chroma)
    added = []
    for p in projects:
        name = os.path.basename(p.rstrip('\\/')) or p
        # check local index by absolute path
        if any(v.get('path') == p for k, v in local_index.items()):
            logger.info('Project already present in local index: %s', p)
            print(f'Skipping (already indexed locally): {p}')
            continue
        # if chroma contains a project with same basename, assume present (note: may be ambiguous)
        if name in existing_chroma:
            logger.info('Project basename exists in chroma (skipping to avoid duplicate): %s (%s)', name, p)
            print(f'Skipping (basename present in chroma): {p}')
            # still add to local index to remember path
            local_index[name + '|' + datetime.utcnow().isoformat()] = {
                'name': name,
                'path': p,
                'date_added': datetime.utcnow().isoformat(),
                'file_count': None,
                'notes': 'basename already present in chroma'
            }
            continue

        try:
            print(f'Indexing new project: {p}')
            logger.info('Indexing new project: %s', p)
            idx = Indexer(embedding_fn=embedding_fn, chroma_manager=chroma, root_folder=p)
            idx.index()
            # compute file count (all files)
            fc = 0
            for _dirpath, _dirnames, filenames in os.walk(p):
                fc += len(filenames)
            entry_key = name + '|' + datetime.utcnow().isoformat()
            local_index[entry_key] = {
                'name': name,
                'path': p,
                'date_added': datetime.utcnow().isoformat(),
                'file_count': fc
            }
            added.append(p)
            logger.info('Added project to local index and chroma: %s (files=%d)', p, fc)
        except Exception as e:
            logger.exception('Failed to index project %s: %s', p, e)
            print(f'Error indexing {p}: {e}')
    save_local_index(local_index)
    return added


def log_all_projects(chroma: ChromaManager):
    logger.info('Generating project overview...')
    print('=== Project Overview ===')
    local_index = load_local_index()
    rows = []
    # include local entries first
    for k, v in local_index.items():
        rows.append({
            'name': v.get('name'),
            'path': v.get('path'),
            'date_added': v.get('date_added'),
            'file_count': v.get('file_count')
        })
    # include chroma-only projects
    chroma_projects = get_existing_projects_from_chroma(chroma)
    for name, count in chroma_projects.items():
        # check if already in rows by name
        if any(r['name'] == name for r in rows):
            continue
        rows.append({'name': name, 'path': 'UNKNOWN', 'date_added': None, 'file_count': count})

    for r in rows:
        line = f"Name: {r['name']}, Path: {r['path']}, Date added: {r['date_added']}, Files: {r['file_count']}"
        logger.info(line)
        print(line)


def test_modules_and_run_main(embedding_fn):
    """Quick smoke tests for modules and attempt to run main.py to exercise end-to-end.
    """
    logger.info('Starting module smoke tests')
    print('Running module imports and initialization tests...')
    # test embeddings provider
    try:
        ep = EmbeddingProvider()
        has_model = hasattr(ep, 'model') and ep.model is not None
        logger.info('EmbeddingProvider initialized, model_loaded=%s', bool(has_model))
        print(f'EmbeddingProvider initialized, model_loaded={has_model}')
    except Exception as e:
        logger.exception('EmbeddingProvider failed: %s', e)
        print(f'EmbeddingProvider failed: {e}')

    # test chroma manager init (use a temporary persist dir)
    try:
        temp_persist = str(DATA_DIR / 'chroma_test_db')
        chroma = ChromaManager(persist_directory=temp_persist, embedding_function=embedding_fn)
        logger.info('ChromaManager initialized for smoke test at %s', temp_persist)
        print('ChromaManager smoke init OK')
    except Exception as e:
        logger.exception('ChromaManager init failed: %s', e)
        print(f'ChromaManager init failed: {e}')
        chroma = None

    # test indexer and search service with small operations if chroma available
    if chroma is not None:
        try:
            s = SearchService(chroma_manager=chroma, text_to_embedding=embedding_fn)
            logger.info('SearchService initialized')
            print('SearchService initialized')
        except Exception as e:
            logger.exception('SearchService init failed: %s', e)
            print(f'SearchService init failed: {e}')

    # attempt to run main.py minimally (index ProjectIndexDB folder) to exercise flow
    try:
        print('Running ProjectIndexDB/main.py to exercise end-to-end (this runs an index).')
        logger.info('Running main.py subprocess for exercise')
        cmd = [sys.executable, str(BASE_DIR / 'main.py'), '--root', str(BASE_DIR)]
        proc = subprocess.run(cmd, cwd=str(BASE_DIR), capture_output=True, text=True, timeout=120)
        logger.info('main.py exit code=%s', proc.returncode)
        logger.info('main.py stdout: %s', proc.stdout[:1000])
        logger.info('main.py stderr: %s', proc.stderr[:1000])
        print('main.py finished with exit code', proc.returncode)
    except subprocess.TimeoutExpired:
        logger.exception('main.py subprocess timed out')
        print('main.py timed out')
    except Exception as e:
        logger.exception('Failed to run main.py: %s', e)
        print(f'Failed to run main.py: {e}')


def main(overview_only: bool = False):
    # build embedding function
    try:
        ep = EmbeddingProvider()
        embedding_fn = ep.embed_one if getattr(ep, 'model', None) is not None else None
    except Exception:
        embedding_fn = None

    # fallback embedding fn similar to main.py if none available
    def default_embedding_func(text: str):
        try:
            import openai
            key = os.environ.get('OPENAI_API_KEY')
            if not key:
                raise RuntimeError('OPENAI_API_KEY not set')
            openai.api_key = key
            resp = openai.Embedding.create(input=text, model='text-embedding-3-small')
            return resp['data'][0]['embedding']
        except Exception as e:
            logger.debug('openai embedding not available: %s', e)
            # safe fallback: zero vector
            return [0.0] * 1536

    if embedding_fn is None:
        embedding_fn = default_embedding_func

    # init chroma manager
    try:
        persist = os.environ.get('PERSIST_DIR', str(DATA_DIR / 'chroma_db'))
        chroma = ChromaManager(persist_directory=persist, embedding_function=embedding_fn)
    except Exception as e:
        logger.exception('Failed to initialize ChromaManager: %s', e)
        print('Failed to initialize ChromaManager (see log for details)')
        return

    if overview_only:
        log_all_projects(chroma)
        return

    # run module tests and main.py exercise
    test_modules_and_run_main(embedding_fn)

    print('Scanning C:\\ for VS Code projects (this may take a while)')
    logger.info('Starting scan of C:\\ for VS Code projects')
    projects = scan_c_drive_for_projects()
    logger.info('Found %d candidate projects on C:\\', len(projects))
    print(f'Found {len(projects)} candidate projects on C:')
    for p in projects[:20]:
        print(' -', p)

    added = add_missing_projects_to_db(chroma, embedding_fn, projects)
    logger.info('Added %d new projects to chroma/local-index', len(added))
    print(f'Added {len(added)} new projects')

    # final overview
    log_all_projects(chroma)
    logger.info('Test run complete')
    print('Test run complete. Logs written to', LOG_FILE)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='ProjectIndexDB system test and scanner')
    parser.add_argument('--overview', action='store_true', help='Only log and print project overview')
    args = parser.parse_args()
    try:
        main(overview_only=args.overview)
    except Exception as e:
        logger.exception('Unhandled exception in test_system: %s', e)
        print('Unhandled exception occurred. See log for details.')
