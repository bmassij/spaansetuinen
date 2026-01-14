#!/usr/bin/env python3
"""
Send images from website/public/assets/impressie to local vision API (OpenAI-compatible) and save responses.
Usage:
  python website/scripts/run_vision.py
Requirements:
  pip install requests
Output:
  website/vision-results.json
"""
import os
import sys
import time
import json
import base64
from pathlib import Path

import requests

API_URL = "http://127.0.0.1:1234/v1/chat/completions"
MODEL = "mistralai/devstral-small-2-2512"
ROOT = Path(__file__).resolve().parents[1]
IMPRESSION_DIR = ROOT / 'public' / 'assets' / 'impressie'
OUT_PATH = ROOT / 'vision-results.json'

if not IMPRESSION_DIR.exists():
    print('Impressie folder not found:', IMPRESSION_DIR)
    sys.exit(1)

images = [p for p in sorted(IMPRESSION_DIR.rglob('*')) if p.suffix.lower() in ('.jpg', '.jpeg', '.png')]
print(f'Found {len(images)} images in {IMPRESSION_DIR}')

results = []

for idx, img_path in enumerate(images, start=1):
    print(f'[{idx}/{len(images)}] Processing {img_path.name}')
    try:
        b = img_path.read_bytes()
        b64 = base64.b64encode(b).decode('ascii')
    except Exception as e:
        print('Failed to read file', img_path, e)
        results.append({'file': str(img_path), 'error': f'read_error: {e}'})
        continue

    # Build prompt in Dutch asking for up to 3 tags and short summary in JSON
    user_prompt = (
        f"Bestand: {img_path.name}\n"
        "Geef in het Nederlands maximaal 3 tags (korte woorden) en één korte zin (summary) die beschrijft wat er op de foto staat."
        "Antwoord in JSON met keys 'tags' (lijst) en 'summary' (string).\n"
        "Beperk het antwoord tot JSON alleen.\n"
        "Embed image as base64 in field 'image_base64' in de request body.\n"
    )

    payload = {
        'model': MODEL,
        'messages': [
            {'role': 'user', 'content': user_prompt},
            # attach image as a separate message to avoid huge inline prompt if server supports it
            {'role': 'user', 'content': '[IMAGE_BASE64]\n' + b64}
        ],
        'max_tokens': 300
    }

    try:
        resp = requests.post(API_URL, json=payload, timeout=120)
        try:
            data = resp.json()
        except Exception:
            data = {'status_code': resp.status_code, 'text': resp.text}
    except Exception as e:
        data = {'error': str(e)}

    results.append({'file': str(img_path.relative_to(ROOT)), 'response': data})

    # short delay to be polite
    time.sleep(0.5)

# write results
OUT_PATH.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print('Wrote results to', OUT_PATH)
