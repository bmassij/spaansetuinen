Vector DB & Audit logging (local demo)

Design decisions
- Storage: SQLite database for vectors + JSONL audit log for append-only human-readable history
- Location: demo-html-css/vector-db/vectors.db and demo-html-css/logs/events.jsonl

Scripts
- init_vector_db.js — initializes SQLite DB and schema
- log_action.js — appends JSONL event to logs/events.jsonl and inserts a row in SQLite
- compute_embedding.js — placeholder to compute embeddings (call external API or local model) and update embedding column

Usage
1. Initialize DB:
   node demo-html-css/scripts/init_vector_db.js
2. Log an action:
   node demo-html-css/scripts/log_action.js '{"action":"nav_click","data":{"item":"Home"}}'
3. (Later) compute embeddings and update DB with:
   node demo-html-css/scripts/compute_embedding.js

Notes
- embeddings stored as BLOB in SQLite for simplicity
- JSONL file keeps full event payloads for auditing
