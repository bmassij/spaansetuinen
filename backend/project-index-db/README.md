# ProjectIndexDB

A Python tool to index all your projects into a Chroma vector database, with automatic watcher, indexing, search and logging.

Features

- Traverse a specified root folder and index text/code files into Chroma.
- Store metadata: project name, relative path, modified date, file type.
- Use sentence-transformers or OpenAI embeddings (configurable).
- Watch for filesystem changes and re-index automatically.
- Search by text or embedding and return matching documents and project metadata.
- All data and scripts are stored inside `ProjectIndexDB/` to keep it separate from other projects.

Quick start

1. Create virtualenv and install dependencies:

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r ProjectIndexDB/requirements.txt
```

2. Configure

Copy `.env.example` to `.env` and set OPENAI_API_KEY if you plan to use OpenAI embeddings. You can also set PERSIST_DIR to change where the Chroma DB is stored.

3. Run

```bash
python ProjectIndexDB/main.py --root "C:/path/to/your/projects" --watch
```

4. Search (example using python REPL)

```python
from ProjectIndexDB.main import default_embedding_func
from ProjectIndexDB.chroma_manager import ChromaManager
from ProjectIndexDB.search import SearchService

chroma = ChromaManager()
search = SearchService(chroma, text_to_embedding=default_embedding_func)
results = search.search_text('how to connect to database')
print(results)
```

VS Code auto-start

A `.vscode/tasks.json` is provided that runs `python ProjectIndexDB/main.py --root "${workspaceFolder}" --watch` when the workspace folder opens (requires VS Code to allow tasks runOn folderOpen).

Extensibility

- `ProjectIndexDB/embeddings.py` implements a local embedding provider using sentence-transformers. You can add more providers and pass an embedding function to `ChromaManager` and `Indexer`.
- `ProjectIndexDB/chroma_manager.py` wraps chromadb so other databases can be added by implementing the same interface.

Logs and data

- Chroma DB files are stored at `ProjectIndexDB/data/chroma_db` (configurable via PERSIST_DIR env var).
- Logs are written to `ProjectIndexDB/logs/projectindexdb.log`.

Limitations & notes

- The indexer only reads text-like file extensions. You can extend `TEXT_FILE_EXTENSIONS` in `indexer.py`.
- Watcher triggers a full re-index on changes for simplicity; this can be optimized to incremental updates later.
- Re-indexing will add documents; Chroma deduplication depends on document IDs. The indexer uses deterministic ids based on path+chunk so repeated runs should not duplicate.

Security

Keep API keys out of source control. The default embedding fallback uses OpenAI if sentence-transformers is not installed.

