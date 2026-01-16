 #!/usr/bin/env python3
"""
Classify images using OpenCLIP and organize them into the required folder structure.

Usage:
  python classify_and_organize.py --dry-run      # analyze and produce CSV + summary, do NOT move
  python classify_and_organize.py --apply        # perform actual moves (always produces CSV + summary)

Requirements:
  pip install open-clip-torch pillow torch torchvision numpy

Notes:
  - Uses OpenCLIP ViT-L/14 if available, otherwise ViT-B/32
  - Threshold: 0.35 confidence
  - Outputs:
      demo-html-css/image-classification.csv
      demo-html-css/summary.md
      demo-html-css/hero-mapping.json

This script implements the exact AI strategy requested (OpenCLIP embeddings -> similarity -> decision).
"""
import os
import sys
import argparse
import csv
import json
import shutil
from pathlib import Path
from collections import Counter

# Try imports and provide helpful message if missing
try:
    import torch
    import numpy as np
    from PIL import Image
    import open_clip
except Exception as e:
    print("Missing dependency or import error:", e)
    print("Install required packages:")
    print("  pip install open-clip-torch pillow torch torchvision numpy")
    sys.exit(1)

# Workspace-relative paths
ROOT = Path(__file__).resolve().parents[1]
# default assets path (original behavior)
DEFAULT_ASSETS = ROOT / 'assets'
ASSETS = DEFAULT_ASSETS

# Labels exactly as provided
LABELS = [
    "palmbomen",
    "trachycarpus palm",
    "cycas revoluta",
    "olijfboom",
    "vijgenboom",
    "druivenrank",
    "granaatappelboom",
    "bloembak",
    "mediterrane potgrond",
    "tuin impressie",
    "bezorgen",
    "verhuur",
]

# Threshold
THRESHOLD = 0.35

# Destination mapping
def label_to_dest(label, assets_root=None):
    # Returns a Path under assets_root (or ASSETS) where file should be moved
    if assets_root is None:
        assets_root = ASSETS
    if label in ("palmbomen", "trachycarpus palm", "cycas revoluta"):
        base = assets_root / 'bomen' / 'palmbomen'
        if label == 'trachycarpus palm':
            return base / 'trachycarpus'
        if label == 'cycas revoluta':
            return base / 'cycas'
        return base
    if label == 'olijfboom':
        return assets_root / 'bomen' / 'olijfbomen'
    if label == 'vijgenboom':
        return assets_root / 'bomen' / 'vijgenbomen'
    if label == 'druivenrank':
        return assets_root / 'bomen' / 'druivenranken'
    if label == 'granaatappelboom':
        return assets_root / 'bomen' / 'granaatappelbomen'
    if label == 'bloembak':
        return assets_root / 'bloembakken'
    if label == 'mediterrane potgrond':
        return assets_root / 'potgrond'
    if label == 'tuin impressie':
        return assets_root / 'impressie'
    if label == 'bezorgen':
        return assets_root / 'bezorgen'
    if label == 'verhuur':
        return assets_root / 'verhuur'
    # fallback
    return assets_root / 'onzeker'

# Files to skip scanning (target folders)
TARGET_TOPS = set(["bomen", "bloembakken", "potgrond", "impressie", "bezorgen", "verhuur", "onzeker"])

IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.gif', '.webp')

# Load model
def load_clip(device):
    # prefer ViT-L/14 then fallback
    preferred = [('ViT-L-14', 'laion2b_s32b_b79k'), ('ViT-B-32', 'laion2b_s34b_b79k')]
    for model_name, pretrained in preferred:
        try:
            model, _, preprocess = open_clip.create_model_and_transforms(model_name, pretrained=pretrained)
            tokenizer = open_clip.get_tokenizer(model_name)
            model.to(device)
            model.eval()
            return model, preprocess, tokenizer
        except Exception:
            continue
    raise RuntimeError('Failed to load any OpenCLIP model. Install open-clip-torch and check available weights.')

# Compute embeddings
@torch.no_grad()
def compute_image_embedding(img_path, model, preprocess, device):
    img = Image.open(img_path).convert('RGB')
    x = preprocess(img).unsqueeze(0).to(device)
    emb = model.encode_image(x)
    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()[0]

@torch.no_grad()
def compute_text_embeddings(texts, model, tokenizer, device):
    tokens = tokenizer(texts)
    tokens = tokens.to(device)
    emb = model.encode_text(tokens)
    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()

# Cosine similarity
def cosine_sim(a, b):
    # a: vector, b: 2D array
    a = a / np.linalg.norm(a)
    b_norm = b / np.linalg.norm(b, axis=1, keepdims=True)
    return (b_norm @ a).flatten()

# Gather source images to classify: scan a provided assets_root but skip target folders
def gather_source_images_for(assets_root):
    images = []
    for root, dirs, files in os.walk(assets_root):
        try:
            rel = Path(root).relative_to(assets_root)
        except Exception:
            rel = Path('.')
        if len(rel.parts) > 0 and rel.parts[0] in TARGET_TOPS:
            # skip scanning images already in target folders
            continue
        for f in files:
            if f.lower().endswith(IMAGE_EXTS):
                images.append(Path(root) / f)
    return images

# Choose hero images mapping: map page slug to one hero image path relative to repo root
PAGE_BY_LABEL = {
    'palmbomen': 'palmbomen',
    'trachycarpus palm': 'palmbomen',
    'cycas revoluta': 'palmbomen',
    'olijfboom': 'olijfbomen',
    'vijgenboom': 'vijgenbomen',
    'druivenrank': 'druivenranken',
    'granaatappelboom': 'granaatappelbomen',
    'bloembak': 'bloembakken',
    'mediterrane potgrond': 'potgrond',
    'tuin impressie': 'impressie',
    'bezorgen': 'bezorgen',
    'verhuur': 'verhuur'
}

PAGE_FILES = {
    'palmbomen': 'palmbomen.html',
    'olijfbomen': 'olea-europea.html',
    'vijgenbomen': 'ficus-carica.html',
    'druivenranken': 'druivenranken.html',
    'granaatappelbomen': 'granaatappelbomen.html',
    'bloembakken': 'bloembakken.html',
    'potgrond': 'mediterrane-potgrond.html',
    'impressie': 'impressie.html',
    'bezorgen': 'bezorgen.html',
    'verhuur': 'verhuur.html',
}


def pick_hero_for_pages(assets_root):
    # For each page, pick first suitable image (one per page). Fallback to impressie.
    hero_map = {}
    impressie_dir = assets_root / 'impressie'

    for page_key, page_file in PAGE_FILES.items():
        folder = None
        # Find folder path under assets_root
        if page_key in ('palmbomen', 'olijfbomen', 'vijgenbomen', 'druivenranken', 'granaatappelbomen'):
            folder = assets_root / 'bomen' / page_key
        else:
            folder = assets_root / page_key

        chosen = None
        if folder and folder.exists():
            for f in sorted(folder.glob('*')):
                if f.is_file() and f.suffix.lower() in IMAGE_EXTS:
                    chosen = f
                    break
        if not chosen and impressie_dir.exists():
            for f in sorted(impressie_dir.glob('*')):
                if f.is_file() and f.suffix.lower() in IMAGE_EXTS:
                    chosen = f
                    break
        if chosen:
            hero_map[page_file] = os.path.relpath(str(chosen), start=str(Path.cwd()))
    return hero_map


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', help='Do not move files; only analyze and write CSV + summary')
    parser.add_argument('--apply', action='store_true', help='Actually move files')
    parser.add_argument('--src', type=str, default=None, help='Source folder to scan (defaults to website/public/assets or website/assets)')
    args = parser.parse_args()

    # Determine assets root
    if args.src:
        src_dir = Path(args.src)
    else:
        # prefer public/assets if it exists (project uses website/public/assets)
        candidate = ROOT / 'public' / 'assets'
        if candidate.exists():
            src_dir = candidate
        else:
            src_dir = DEFAULT_ASSETS

    if not src_dir.exists():
        print('Source folder not found:', src_dir)
        sys.exit(1)

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f'Loading OpenCLIP model on device={device}...')
    model, preprocess, tokenizer = load_clip(device)

    print('Gathering source images...')
    images = gather_source_images_for(src_dir)
    print(f'Found {len(images)} images to analyze')

    # Prepare text embeddings
    text_embs = compute_text_embeddings(LABELS, model, tokenizer, device)

    results = []

    for img_path in images:
        try:
            emb = compute_image_embedding(img_path, model, preprocess, device)
        except Exception as e:
            print('Failed to process', img_path, '->', e)
            continue
        sims = (text_embs @ emb)
        # sims already cosine since we normalized
        best_idx = int(np.argmax(sims))
        best_label = LABELS[best_idx]
        score = float(sims[best_idx])

        if score > THRESHOLD:
            dest = label_to_dest(best_label, assets_root=src_dir)
        else:
            dest = src_dir / 'onzeker'
            best_label = 'onzeker'

        # compute destination path but do not perform move yet unless --apply
        dest.mkdir(parents=True, exist_ok=True)
        dest_fname = img_path.name
        dest_path = dest / dest_fname
        i = 1
        while dest_path.exists():
            base, ext = os.path.splitext(dest_fname)
            dest_path = dest / f"{base}-{i}{ext}"
            i += 1

        results.append({
            'filename': dest_path.name,
            'old_location': os.path.relpath(str(img_path), start=str(Path.cwd())),
            'new_location': os.path.relpath(str(dest_path), start=str(Path.cwd())),
            'recognized_category': best_label,
            'confidence': score,
            'src_full': str(img_path),
            'dst_full': str(dest_path)
        })

    # Write CSV
    csv_path = ROOT / 'image-classification.csv'
    with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['filename', 'old_location', 'new_location', 'recognized_category', 'confidence']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for r in results:
            writer.writerow({k: r[k] for k in fieldnames})

    # Summary
    total = len(results)
    counter = Counter(r['recognized_category'] for r in results)
    uncertain = counter.get('onzeker', 0)

    summary_lines = [
        f"# Image classification summary",
        f"",
        f"Total images analyzed: {total}",
        f"",
        f"Category counts:",
        "",
    ]
    for cat, cnt in counter.most_common():
        summary_lines.append(f"- {cat}: {cnt}")
    summary_lines.append("")
    summary_lines.append(f"Images classified as uncertain: {uncertain}")

    summary_path = ROOT / 'summary.md'
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(summary_lines))

    print(f'Wrote CSV to {csv_path} and summary to {summary_path}')

    # if apply, perform moves
    moved = 0
    if args.apply:
        for r in results:
            try:
                src = Path(r['src_full'])
                dst = Path(r['dst_full'])
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(str(src), str(dst))
                moved += 1
            except Exception as e:
                print('Failed to move', r['src_full'], '->', r['dst_full'], e)

        print(f'Moved {moved} files')

    # Hero mapping
    hero_map = pick_hero_for_pages(src_dir)
    hero_json = ROOT / 'hero-mapping.json'
    with open(hero_json, 'w', encoding='utf-8') as f:
        json.dump(hero_map, f, indent=2, ensure_ascii=False)

    print(f'Wrote hero mapping to {hero_json} (one hero per page, fallback to impressie)')

    # Final report for dry-run
    print('\n==== SUMMARY ====')
    print(f'Total analyzed: {total}')
    for cat, cnt in counter.most_common():
        print(f'  {cat}: {cnt}')
    print(f'  uncertain: {uncertain}')
    if not args.apply:
        print('\nDry-run complete. To actually move files re-run with --apply')


if __name__ == '__main__':
    main()
