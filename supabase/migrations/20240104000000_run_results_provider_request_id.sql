-- Store the provider-assigned request ID for tracing in provider dashboards
ALTER TABLE parixai.run_results
  ADD COLUMN IF NOT EXISTS provider_request_id text;
