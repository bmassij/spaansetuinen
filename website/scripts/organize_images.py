import os
import shutil
import csv

# Determine project root (demo-html-css) reliably relative to this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
SRC = os.path.join(ROOT, 'scraped-images')
ASSETS = os.path.join(ROOT, 'assets')

os.makedirs(ASSETS, exist_ok=True)

# Category mapping rules by keywords
KEYWORD_MAP = [
    (['palm', 'trachy', 'cycca', 'palmbomen'], 'palmbomen'),
    (['vijg', 'ficus-carica', 'ficus', 'ficus_carica', 'fig'], 'vijgenbomen'),
    (['olie', 'olea', 'olijf', 'olijfbomen', 'bonsai-olijfboom', 'olea-europea'], 'olijfbomen'),
    (['bloembak', 'bloembakken', 'potgrond', 'mediterrane-potgrond', 'mediterraan-potgrond'], 'bloembakken'),
    (['plant', 'voeding', 'plant-en-voedingtips'], 'plant-en-voedingtips'),
    (['verhuur'], 'verhuur'),
    (['bezorgen'], 'bezorgen'),
    (['impressie'], 'impressie'),
    (['index', 'hero', 'homepage'], 'homepage'),
]

GENERIC_FOLDERS = set(['index', 'impressie', 'bezorgen', 'verhuur', 'palmbomen', 'vijgenbomen', 'olijfbomen', 'overige-bomen', 'bloembakken', 'plant-en-voedingtips'])

mappings = []
move_count = 0

if not os.path.isdir(SRC):
    print(f"Source folder not found: {SRC}")
else:
    for root, dirs, files in os.walk(SRC):
        # Determine source folder relative to SRC
        rel_root = os.path.relpath(root, SRC)
        parts = rel_root.split(os.sep)
        source_folder = parts[0] if parts[0] != '.' else ''

        for fname in files:
            # skip mapping and json files and non-image files
            if fname.lower().endswith(('.json', '.md')):
                continue
            if not fname.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp')):
                continue

            src_path = os.path.join(root, fname)

            # decide category
            category = None
            lowered = (source_folder + ' ' + fname).lower()
            for keys, cat in KEYWORD_MAP:
                for k in keys:
                    if k in lowered:
                        category = cat
                        break
                if category:
                    break

            if not category:
                # try to infer from parent folder names
                for part in parts:
                    p = part.lower()
                    if p in ('palmbomen', 'vijgenbomen', 'olijfbomen', 'bloembakken', 'impressie', 'verhuur', 'bezorgen', 'index'):
                        category = p
                        break

            if not category:
                category = 'overige-bomen'

            # decide destination folder
            if source_folder and source_folder not in GENERIC_FOLDERS:
                dest_dir = os.path.join(ASSETS, category, source_folder)
            else:
                dest_dir = os.path.join(ASSETS, category)

            os.makedirs(dest_dir, exist_ok=True)

            # compute destination filename, avoid collisions
            dest_fname = fname
            dest_path = os.path.join(dest_dir, dest_fname)
            base, ext = os.path.splitext(dest_fname)
            i = 1
            while os.path.exists(dest_path):
                dest_fname = f"{base}-{i}{ext}"
                dest_path = os.path.join(dest_dir, dest_fname)
                i += 1

            # move file
            try:
                shutil.move(src_path, dest_path)
                move_count += 1
            except Exception as e:
                print(f"Failed to move {src_path} -> {dest_path}: {e}")
                continue

            mappings.append({
                'filename': dest_fname,
                'original': os.path.relpath(src_path, ROOT),
                'new': os.path.relpath(dest_path, ROOT),
                'category': category
            })

# write mapping csv
csv_path = os.path.join(ROOT, 'image-mapping.csv')
with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=['filename', 'original', 'new', 'category'])
    writer.writeheader()
    for m in mappings:
        writer.writerow(m)

print(f"Done. Moved {move_count} images. Mapping saved to {csv_path}")
