-- Add per-direction cost columns to run_results
ALTER TABLE featurellm.run_results
  ADD COLUMN IF NOT EXISTS input_cost_usd  numeric(10, 8),
  ADD COLUMN IF NOT EXISTS output_cost_usd numeric(10, 8);
