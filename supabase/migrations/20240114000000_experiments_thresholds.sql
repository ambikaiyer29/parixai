ALTER TABLE parixai.experiments
  ADD COLUMN IF NOT EXISTS thresholds jsonb NOT NULL DEFAULT '{}';
