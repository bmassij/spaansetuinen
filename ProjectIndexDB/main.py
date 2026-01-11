import argparse
import logging
import os
from dotenv import load_dotenv

from chroma_manager import ChromaManager
from embeddings import EmbeddingProvider
from indexer import Indexer
from watcher import start_watcher
from search import SearchService


LOG_DIR = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(LOG_DIR, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s: %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOG_DIR, 'projectindexdb.log')),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('projectindexdb')


def default_embedding_func(text: str):
    # fallback: attempt to use openai if available
    try:
        import openai
        key = os.environ.get('OPENAI_API_KEY')
        if not key:
            raise RuntimeError('OPENAI_API_KEY not set')
        openai.api_key = key
        resp = openai.Embedding.create(input=text, model='text-embedding-3-small')
        return resp['data'][0]['embedding']
    except Exception as e:
        logger.exception('OpenAI embedding failed: %s', e)
        # final fallback: zero vector
        return [0.0] * 1536


def main():
    load_dotenv()
    parser = argparse.ArgumentParser(description='ProjectIndexDB')
    parser.add_argument('--root', type=str, required=True, help='Root folder containing projects to index')
    parser.add_argument('--watch', action='store_true', help='Start filesystem watcher')
    args = parser.parse_args()

    persist = os.environ.get('PERSIST_DIR', './ProjectIndexDB/data/chroma_db')
    embedding_provider = EmbeddingProvider()
    embedding_fn = embedding_provider.embed_one if embedding_provider.model is not None else default_embedding_func

    chroma = ChromaManager(persist_directory=persist, embedding_function=embedding_fn)
    indexer = Indexer(embedding_fn=embedding_fn, chroma_manager=chroma, root_folder=args.root)

    # initial index
    indexer.index()

    searchsvc = SearchService(chroma_manager=chroma, text_to_embedding=embedding_fn)

    if args.watch:
        start_watcher(indexer, args.root)


if __name__ == '__main__':
    main()
