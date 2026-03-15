ALTER TABLE parixai.runs
  ADD COLUMN IF NOT EXISTS debug boolean NOT NULL DEFAULT false;
