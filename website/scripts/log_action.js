#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const logsDir = path.resolve(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const eventsFile = path.join(logsDir, 'events.jsonl');

const dataDir = path.resolve(__dirname, '..', 'vector-db');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'vectors.db');
const db = new Database(dbPath);

const input = process.argv[2] || '{}';
let payload;
try { payload = JSON.parse(input); } catch (e) { console.error('Invalid JSON'); process.exit(1) }

const ts = new Date().toISOString();
const event = { ts, ...payload };

// append to JSONL
fs.appendFileSync(eventsFile, JSON.stringify(event) + '\n');

// ensure table exists
db.exec(`CREATE TABLE IF NOT EXISTS vectors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  action TEXT NOT NULL,
  data TEXT,
  embedding BLOB
);`);

// insert minimal row into sqlite
const stmt = db.prepare('INSERT INTO vectors (ts, action, data) VALUES (?, ?, ?)');
stmt.run(ts, event.action || 'unknown', JSON.stringify(event.data || null));

console.log('Logged event to', eventsFile, 'and', dbPath);
