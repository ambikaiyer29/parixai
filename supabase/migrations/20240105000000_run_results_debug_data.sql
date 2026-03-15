ALTER TABLE featurellm.run_results
  ADD COLUMN IF NOT EXISTS debug_request_json  jsonb,
  ADD COLUMN IF NOT EXISTS debug_response_json jsonb;
