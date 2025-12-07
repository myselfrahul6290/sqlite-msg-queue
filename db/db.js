import Database from 'better-sqlite3'
import {fileURLToPath} from 'url'
import path from "path"

// db path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_path=path.resolve(__dirname,'queue.db')
const db= new Database(db_path)

// Recommended pragmas
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');

// Create tables if not exists
db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic TEXT NOT NULL,
      payload TEXT NOT NULL,
      status INTEGER NOT NULL DEFAULT 0,     -- 0 = pending, 1 = processed,2 = complete, 3 = failed
      locked_by TEXT DEFAULT NULL,
      locked_at INTEGER DEFAULT NULL,
      created_at INTEGER DEFAULT (strftime('%s','now'))
    );
    `);
    
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_messages_status_locked ON messages(status, locked_at, locked_by, id);
    `);

export {db}    