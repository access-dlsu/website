-- Initialize Database Schema and Data

-- Create officers table
CREATE TABLE IF NOT EXISTS officers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    position TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_officers_email ON officers(email);

-- Insert ACCESS DLSU Officers into the database
INSERT INTO officers (email, name, position) VALUES 
('access@dlsu.edu.ph', 'ACCESS DLSU', 'Organization Email'),
('win_sy@dlsu.edu.ph', 'Win Clarence Sy', 'Officer'),
('angelica_g_gregorio@dlsu.edu.ph', 'Angelica G. Gregorio', 'President'),
('elishah_antonio@dlsu.edu.ph', 'Elishah Angeline C. Antonio', 'Executive Vice President for Internals'),
('ron_galvez@dlsu.edu.ph', 'Ron John B. Galvez', 'Executive Vice President for Externals'),
('christian_alado@dlsu.edu.ph', 'Christian John B. Alado', 'Executive Vice President for Operations')
ON CONFLICT(email) DO UPDATE SET
    name = excluded.name,
    position = excluded.position;

-- Create links table
CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_by TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    icon TEXT,
    is_archived BOOLEAN DEFAULT 0
);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code);
