-- Catch-up migration: sync Supabase schema with featurellm-oss drizzle migrations
-- Covers OSS migrations: 0003, 0004, 0006, 0008

-- ── 0003: experiments thresholds already added (20240114).
--          Add baseline_run_id and runs.test_case_snapshot ─────────────────────

ALTER TABLE parixai.experiments
  ADD COLUMN IF NOT EXISTS baseline_run_id uuid
    REFERENCES parixai.runs(id) ON DELETE SET NULL;

ALTER TABLE parixai.runs
  ADD COLUMN IF NOT EXISTS test_case_snapshot jsonb;

-- ── 0004: Human Review Queue + Shareable Run Reports ─────────────────────────

CREATE TABLE IF NOT EXISTS parixai.review_assignments (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id      uuid        NOT NULL REFERENCES parixai.runs(id) ON DELETE CASCADE,
  assigned_to uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  status      text        NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','in_progress','completed')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS parixai.result_reviews (
  id             uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  run_result_id  uuid    NOT NULL REFERENCES parixai.run_results(id) ON DELETE CASCADE,
  reviewer_id    uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating         integer CHECK (rating IN (0, 1)),
  comment        text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_result_id, reviewer_id)
);

CREATE TABLE IF NOT EXISTS parixai.shared_reports (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id        uuid        NOT NULL REFERENCES parixai.runs(id) ON DELETE CASCADE,
  token         text        NOT NULL UNIQUE,
  created_by    uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  password_hash text,
  expires_at    timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_shared_reports_token ON parixai.shared_reports(token);

-- ── 0006: Playground run history ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS parixai.playground_runs (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     uuid        NOT NULL REFERENCES parixai.projects(id) ON DELETE CASCADE,
  created_by     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  system_prompt  text,
  user_message   text        NOT NULL,
  models         jsonb       NOT NULL DEFAULT '[]',
  results        jsonb       NOT NULL DEFAULT '[]',
  has_images     boolean     NOT NULL DEFAULT false,
  has_files      boolean     NOT NULL DEFAULT false,
  total_cost_usd numeric(10,8),
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS playground_runs_project_created
  ON parixai.playground_runs (project_id, created_at DESC);

-- ── 0008: playground_runs.test_input ─────────────────────────────────────────

ALTER TABLE parixai.playground_runs
  ADD COLUMN IF NOT EXISTS test_input jsonb;
