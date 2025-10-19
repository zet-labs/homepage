CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  language VARCHAR(2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
