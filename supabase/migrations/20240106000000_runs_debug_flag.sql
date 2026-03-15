ALTER TABLE featurellm.runs
  ADD COLUMN IF NOT EXISTS debug boolean NOT NULL DEFAULT false;
