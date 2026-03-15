-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- SCHEMA
-- =====================

CREATE SCHEMA IF NOT EXISTS parixai;

-- =====================
-- MULTI-TENANCY
-- =====================

CREATE TABLE parixai.orgs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parixai.org_members (
  org_id UUID NOT NULL REFERENCES parixai.orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (org_id, user_id)
);

-- =====================
-- USER PROFILES
-- =====================

CREATE TABLE parixai.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup.
-- Function lives in public so Supabase can attach it to the auth.users trigger.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO parixai.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, parixai;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================
-- CREDENTIALS
-- =====================

CREATE TABLE parixai.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL, -- FK added after projects table
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL, -- first 12 chars for display (e.g. "flm_abc12345")
  label TEXT NOT NULL,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parixai.llm_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES parixai.orgs(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic', 'gemini')),
  encrypted_key TEXT NOT NULL, -- TODO: use Supabase Vault (pgsodium) in production
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, provider)
);

-- =====================
-- PROJECTS & PROMPTS
-- =====================

CREATE TABLE parixai.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES parixai.orgs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, slug)
);

ALTER TABLE parixai.api_keys ADD CONSTRAINT api_keys_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES parixai.projects(id) ON DELETE CASCADE;

CREATE TABLE parixai.prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES parixai.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parixai.prompt_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES parixai.prompts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  system_content TEXT,
  user_content_template TEXT NOT NULL,
  variables JSONB NOT NULL DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (prompt_id, version)
);

-- =====================
-- TEST SETS
-- =====================

CREATE TABLE parixai.test_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES parixai.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parixai.test_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_set_id UUID NOT NULL REFERENCES parixai.test_sets(id) ON DELETE CASCADE,
  input JSONB NOT NULL,
  expected_output TEXT,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- EXPERIMENTS
-- =====================

CREATE TABLE parixai.experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES parixai.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE parixai.experiment_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID NOT NULL REFERENCES parixai.experiments(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  prompt_version_id UUID NOT NULL REFERENCES parixai.prompt_versions(id),
  test_set_id UUID NOT NULL REFERENCES parixai.test_sets(id),
  models JSONB NOT NULL DEFAULT '[]',
  eval_method TEXT NOT NULL CHECK (eval_method IN ('human', 'llm_judge', 'exact_match', 'all')),
  eval_config JSONB NOT NULL DEFAULT '{}',
  params JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (experiment_id, version)
);

-- =====================
-- RUNS
-- =====================

CREATE TABLE parixai.runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_version_id UUID NOT NULL REFERENCES parixai.experiment_versions(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  triggered_by TEXT NOT NULL DEFAULT 'dashboard' CHECK (triggered_by IN ('dashboard', 'sdk')),
  triggered_by_user UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE parixai.run_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES parixai.runs(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  test_case_id UUID NOT NULL REFERENCES parixai.test_cases(id),
  output TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd NUMERIC(10, 8),
  latency_ms INTEGER,
  eval_score NUMERIC(3, 2),
  eval_notes TEXT,
  human_rating INTEGER CHECK (human_rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE parixai.orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.llm_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.prompt_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.test_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.experiment_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parixai.run_results ENABLE ROW LEVEL SECURITY;

-- =====================
-- RLS HELPER FUNCTIONS
-- All live in parixai schema; policies call them with parixai. prefix.
-- =====================

CREATE OR REPLACE FUNCTION parixai.is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM parixai.org_members
    WHERE parixai.org_members.org_id = $1
      AND parixai.org_members.user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = parixai, public;

CREATE OR REPLACE FUNCTION parixai.is_org_admin(org_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM parixai.org_members
    WHERE parixai.org_members.org_id = $1
      AND parixai.org_members.user_id = auth.uid()
      AND parixai.org_members.role IN ('owner', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = parixai, public;

CREATE OR REPLACE FUNCTION parixai.project_org_id(project_id UUID)
RETURNS UUID AS $$
  SELECT org_id FROM parixai.projects WHERE id = $1;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = parixai, public;

-- =====================
-- RLS POLICIES
-- Note: policies call parixai.function_name() with explicit schema prefix
-- because search_path is not set in the policy evaluation context.
-- =====================

-- Orgs
CREATE POLICY "org_members_can_view_org" ON parixai.orgs
  FOR SELECT USING (parixai.is_org_member(id));

-- Org members
CREATE POLICY "view_org_members" ON parixai.org_members
  FOR SELECT USING (parixai.is_org_member(org_id));

-- Profiles: users manage their own
CREATE POLICY "own_profile" ON parixai.profiles
  FOR ALL USING (id = auth.uid());

-- LLM credentials: org admins only
CREATE POLICY "admin_llm_credentials" ON parixai.llm_credentials
  FOR ALL USING (parixai.is_org_admin(org_id));

-- Projects
CREATE POLICY "view_projects" ON parixai.projects
  FOR SELECT USING (parixai.is_org_member(org_id));
CREATE POLICY "admin_create_projects" ON parixai.projects
  FOR INSERT WITH CHECK (parixai.is_org_admin(org_id));
CREATE POLICY "admin_update_projects" ON parixai.projects
  FOR UPDATE USING (parixai.is_org_admin(org_id));

-- Prompts
CREATE POLICY "view_prompts" ON parixai.prompts
  FOR SELECT USING (parixai.is_org_member(parixai.project_org_id(project_id)));
CREATE POLICY "member_create_prompts" ON parixai.prompts
  FOR INSERT WITH CHECK (parixai.is_org_member(parixai.project_org_id(project_id)));

-- Prompt versions
CREATE POLICY "view_prompt_versions" ON parixai.prompt_versions
  FOR SELECT USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT project_id FROM parixai.prompts WHERE id = prompt_id)
    ))
  );
CREATE POLICY "member_create_prompt_versions" ON parixai.prompt_versions
  FOR INSERT WITH CHECK (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT project_id FROM parixai.prompts WHERE id = prompt_id)
    ))
  );

-- Test sets
CREATE POLICY "member_manage_test_sets" ON parixai.test_sets
  FOR ALL USING (parixai.is_org_member(parixai.project_org_id(project_id)));

-- Test cases
CREATE POLICY "member_manage_test_cases" ON parixai.test_cases
  FOR ALL USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT project_id FROM parixai.test_sets WHERE id = test_set_id)
    ))
  );

-- Experiments
CREATE POLICY "member_manage_experiments" ON parixai.experiments
  FOR ALL USING (parixai.is_org_member(parixai.project_org_id(project_id)));

-- Experiment versions
CREATE POLICY "view_experiment_versions" ON parixai.experiment_versions
  FOR SELECT USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT project_id FROM parixai.experiments WHERE id = experiment_id)
    ))
  );
CREATE POLICY "member_create_experiment_versions" ON parixai.experiment_versions
  FOR INSERT WITH CHECK (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT project_id FROM parixai.experiments WHERE id = experiment_id)
    ))
  );

-- Runs
CREATE POLICY "view_runs" ON parixai.runs
  FOR SELECT USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT e.project_id FROM parixai.experiments e
       JOIN parixai.experiment_versions ev ON ev.experiment_id = e.id
       WHERE ev.id = experiment_version_id)
    ))
  );
CREATE POLICY "member_create_runs" ON parixai.runs
  FOR INSERT WITH CHECK (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT e.project_id FROM parixai.experiments e
       JOIN parixai.experiment_versions ev ON ev.experiment_id = e.id
       WHERE ev.id = experiment_version_id)
    ))
  );
CREATE POLICY "member_update_runs" ON parixai.runs
  FOR UPDATE USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT e.project_id FROM parixai.experiments e
       JOIN parixai.experiment_versions ev ON ev.experiment_id = e.id
       WHERE ev.id = experiment_version_id)
    ))
  );

-- Run results
CREATE POLICY "view_run_results" ON parixai.run_results
  FOR SELECT USING (
    parixai.is_org_member(parixai.project_org_id(
      (SELECT e.project_id FROM parixai.experiments e
       JOIN parixai.experiment_versions ev ON ev.experiment_id = e.id
       JOIN parixai.runs r ON r.experiment_version_id = ev.id
       WHERE r.id = run_id)
    ))
  );
-- Service role bypasses RLS; this policy covers anon/authenticated inserts if ever needed
CREATE POLICY "service_create_run_results" ON parixai.run_results
  FOR INSERT WITH CHECK (true);

-- API keys: org members can view
CREATE POLICY "view_api_keys" ON parixai.api_keys
  FOR SELECT USING (
    parixai.is_org_member(parixai.project_org_id(project_id))
  );
