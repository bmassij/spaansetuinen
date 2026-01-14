import os
import pandas as pd
import json
from PIL import Image
from transformers import AutoProcessor, AutoModelForCausalLM

# Map met afbeeldingen (alleen lezen)
ASSETS_DIR = r"C:\Users\styxi\OneDrive\Bureaublad\spaansetuinen\website\public\assets"

# Output map
OUTPUT_DIR = r"C:\Users\styxi\OneDrive\Bureaublad\spaansetuinen\website"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Model en processor
model_name = "microsoft/Florence-2-base"
processor = AutoProcessor.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True)

results = []
hero_mapping = {}

for root, dirs, files in os.walk(ASSETS_DIR):
    for file in files:
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            file_path = os.path.join(root, file)
            image = Image.open(file_path).convert("RGB")
            
            prompt = "<CAPTION>"
            inputs = processor(text=prompt, images=image, return_tensors="pt")
            output = model.generate(**inputs, max_new_tokens=50)
            description = processor.decode(output[0][len(inputs.input_ids[0]):], skip_special_tokens=True)
            
            # Simpele categorisatie
            category = "onzeker"
            desc_lower = description.lower()
            if "palm" in desc_lower:
                category = "palmbomen"
            elif "olijf" in desc_lower:
                category = "olijfbomen"
            elif "vijg" in desc_lower:
                category = "vijgenbomen"
            elif "bloembak" in desc_lower:
                category = "bloembakken"
            elif "impressie" in desc_lower or "tuin" in desc_lower:
                category = "impressie"
            
            confidence = 0.9
            
            results.append({
                "filename": file,
                "predicted_category": category,
                "description": description,
                "confidence": confidence
            })
            
            if category not in hero_mapping:
                hero_mapping[category] = file

# CSV
csv_path = os.path.join(OUTPUT_DIR, "image_classification.csv")
pd.DataFrame(results).to_csv(csv_path, index=False)

# Hero mapping JSON
json_path = os.path.join(OUTPUT_DIR, "hero_mapping.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(hero_mapping, f, indent=4, ensure_ascii=False)

# Summary
summary_path = os.path.join(OUTPUT_DIR, "summary.md")
categories = {}
for r in results:
    cat = r["predicted_category"]
    categories[cat] = categories.get(cat, 0) + 1
with open(summary_path, "w", encoding="utf-8") as f:
    f.write("# Image Classification Summary\n\n")
    for cat, count in categories.items():
        f.write(f"- {cat}: {count}\n")

print(f"✅ Done! CSV: {csv_path}, Hero mapping: {json_path}, Summary: {summary_path}")
