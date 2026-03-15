-- Catch-up: OSS migrations 0002 and 0005
-- Adds base_url / extra_config to llm_credentials and expands provider constraint.

ALTER TABLE parixai.llm_credentials
  ADD COLUMN IF NOT EXISTS base_url    text,
  ADD COLUMN IF NOT EXISTS extra_config jsonb;

ALTER TABLE parixai.llm_credentials
  DROP CONSTRAINT IF EXISTS llm_credentials_provider_check;

ALTER TABLE parixai.llm_credentials
  ADD CONSTRAINT llm_credentials_provider_check
  CHECK (provider IN (
    'openai','anthropic','gemini','openrouter',
    'azure_openai','bedrock','mistral','cohere','custom'
  ));
