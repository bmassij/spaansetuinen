#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Placeholder: this script would call an embedding API/model to compute embeddings
// For the demo it will set a dummy embedding (zero bytes) for rows without embedding.

const dataDir = path.resolve(__dirname, '..', 'vector-db');
const dbPath = path.join(dataDir, 'vectors.db');
if (!fs.existsSync(dbPath)) { console.error('DB not initialized. Run init_vector_db.js first.'); process.exit(1) }
const db = new Database(dbPath);

// Ensure table
db.exec(`CREATE TABLE IF NOT EXISTS vectors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  action TEXT NOT NULL,
  data TEXT,
  embedding BLOB
);`);

const rows = db.prepare('SELECT id, data FROM vectors WHERE embedding IS NULL').all();
const update = db.prepare('UPDATE vectors SET embedding = ? WHERE id = ?');
rows.forEach(r => {
  // dummy embedding
  const emb = Buffer.from([]);
  update.run(emb, r.id);
});

console.log('Updated', rows.length, 'rows with dummy embedding');
