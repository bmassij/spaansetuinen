#!/usr/bin/env python3
"""Replace occurrences of 'scraped-images/' with 'assets/' in HTML/JS/CSS/MD files under demo-html-css.
Usage: python replace_scraped_with_assets.py
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTS = {'.html', '.js', '.css', '.md'}
replace_count = 0
files_changed = []

for p in ROOT.rglob('*'):
    if p.is_file() and p.suffix.lower() in EXTS:
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            continue
        if 'scraped-images/' in text:
            new_text = text.replace('scraped-images/', 'assets/')
            p.write_text(new_text, encoding='utf-8')
            files_changed.append(str(p.relative_to(Path.cwd())))
            replace_count += text.count('scraped-images/')

print(f'Replaced {replace_count} occurrences in {len(files_changed)} files')
for f in files_changed:
    print(' -', f)
