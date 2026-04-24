-- Add expiration and archived fields to links table
ALTER TABLE links ADD COLUMN expires_at DATETIME;
ALTER TABLE links ADD COLUMN archived INTEGER DEFAULT 0;

-- archived: 0 = active, 1 = archived
