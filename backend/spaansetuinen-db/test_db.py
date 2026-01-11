#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test script voor vector database functionaliteit
"""
import sys
import os
from pathlib import Path

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    os.system('chcp 65001 > nul')

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from chroma_manager import ChromaManager

def test_database():
    print("=== Vector Database Test ===")
    
    try:
        # Initialize ChromaManager
        chroma_dir = Path(__file__).parent / "data"
        chroma = ChromaManager(str(chroma_dir))
        
        # Test 1: Check documents count
        docs = chroma.list_documents(limit=100)
        doc_count = len(docs.get('ids', []))
        print(f"[OK] Database verbonden - {doc_count} documenten gevonden")
        
        if doc_count > 0:
            print("\nEerste 5 document IDs:")
            for i, doc_id in enumerate(docs.get('ids', [])[:5]):
                metadata = docs.get('metadatas', [])[i] if i < len(docs.get('metadatas', [])) else {}
                page = metadata.get('page', 'Unknown')
                print(f"  {i+1}. {doc_id} (page: {page})")
        
        # Test 2: Query functionality
        print("\n=== Query Test ===")
        test_queries = ['olijfboom', 'mediterrane', 'bloembakken']
        
        for query in test_queries:
            try:
                results = chroma.query(query, n_results=3)
                result_count = len(results.get('ids', [[]])[0]) if results.get('ids') else 0
                print(f"Query '{query}': {result_count} resultaten")
                
                if result_count > 0:
                    for i, doc_id in enumerate(results.get('ids', [[]])[0][:2]):
                        print(f"  - {doc_id}")
                        
            except Exception as e:
                print(f"Query '{query}' error: {e}")
        
        print("\n[SUCCESS] Vector database test succesvol voltooid!")
        return True
        
    except Exception as e:
        print(f"[ERROR] Database test gefaald: {e}")
        return False

if __name__ == "__main__":
    test_database()