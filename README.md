# Spaanse Tuinen Project

Dit project bevat de website, backend systemen en tooling voor Spaanse Tuinen.

## 📁 Project Structuur

```
spaansetuinen/
├── website/                    # Statische website
│   ├── public/                # Deployed HTML, CSS, assets
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── assets/           # Images, SVGs
│   ├── scripts/              # Build/dev scripts
│   └── docs/                 # Documentatie (VECTOR_DB.md, summary.md)
│
├── backend/                   # Python backend systemen
│   ├── spaansetuinen-db/     # Specifieke DB voor dit project
│   │   ├── indexer.py
│   │   ├── sections.py
│   │   ├── watcher.py
│   │   ├── main.py
│   │   └── tests/
│   └── project-index-db/     # Generieke project indexer
│       ├── indexer.py
│       ├── search.py
│       ├── main.py
│       └── logs/
│
├── tools/                     # Utility scripts en tooling
│   ├── vision/               # Image classification (Florence)
│   │   ├── florence/
│   │   └── requirements.txt
│   └── scrapers/             # Data gathering scripts
│       ├── scrape-images.js
│       ├── update-hero-images.js
│       └── fix-links.js
│
├── config/                    # Project-level config (backup)
│   ├── .gitignore
│   └── vercel.json
│
├── index.html                 # Root entry point
├── vercel.json               # Vercel deployment config
└── README.md                 # Deze file
```

## 🚀 Gebruik

### Website
De website staat in `website/public/`. Dit is de output directory voor Vercel deployment.

```bash
# Lokaal bekijken
cd website/public
python -m http.server 8000
```

### Backend - SpaanseTuinen DB

```bash
cd backend/spaansetuinen-db
pip install -r requirements.txt

# Index de website
python main.py

# Start watcher voor automatische updates
python main.py --watch
```

### Backend - Project Index DB

```bash
cd backend/project-index-db
pip install -r requirements.txt

# Index een project folder
python main.py --root /path/to/project

# Met watcher
python main.py --root /path/to/project --watch
```

### Tools - Vision (Image Classification)

```bash
cd tools/vision
pip install -r requirements.txt

# Classificeer images
python florence/classify_images.py
```

### Tools - Scrapers

```bash
cd tools/scrapers

# Update hero images
node update-hero-images.js

# Fix internal links
node fix-links.js
```

## 📝 Notities

- **Oude structuur**: De originele mappen (`demo-html-css/`, `SpaanseTuinenDB/`, etc.) kunnen worden verwijderd na verificatie
- **Paths**: Alle Python scripts zijn aangepast voor de nieuwe structuur
- **Vercel**: `vercel.json` wijst naar `website/public/` als output directory
- **Assets**: Alle images staan nu in `website/public/assets/`

## 🔧 Deployment

Dit project wordt gehost op Vercel. De `vercel.json` config zorgt voor routing.

```bash
# Deploy naar Vercel
vercel deploy
```
