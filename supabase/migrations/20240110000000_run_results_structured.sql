ALTER TABLE parixai.run_results
  ADD COLUMN structured_output JSONB;

ALTER TABLE parixai.experiment_versions
  ADD COLUMN output_format JSONB;
-- Shape for output_format: { type: 'text' | 'json_object' | 'json_schema', schema?: object } | null
-- null = plain text (default)
