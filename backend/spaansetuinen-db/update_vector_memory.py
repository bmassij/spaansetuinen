#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Standalone script to update vector database with navigation changes
"""
import sys
from pathlib import Path

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import os
    os.system('chcp 65001 > nul')

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from indexer import Indexer

def main():
    """Update vector database with recent navigation changes"""
    
    print("[INFO] Starting vector database update...")
    
    # Initialize indexer with correct parameters
    base_path = Path(__file__).parent.parent.parent
    source_dir = str(base_path / "website" / "public")
    chroma_dir = str(base_path / "backend" / "spaansetuinen-db" / "data")
    
    indexer = Indexer(source_dir=source_dir, chroma_dir=chroma_dir)
    
    # Updated files
    updated_files = [
        "bonsai-olijfboom.html",
        "olea-europea.html",
        "bloembakken-op-maat.html",
        "mediterrane-potgrond.html",
        "impressie.html",
        "_navbar-template.html"
    ]
    
    print(f"\n[INFO] Indexing {len(updated_files)} updated files...")
    
    # Run full index to capture all changes
    indexer.index()
    
    print("\n[SUCCESS] Vector database update complete!")
    print(f"[INFO] Documents indexed from: {source_dir}")

if __name__ == "__main__":
    main()
