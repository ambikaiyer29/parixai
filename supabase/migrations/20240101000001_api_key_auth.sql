-- SDK authentication function.
-- Lives in featurellm schema; called via the service client (db.schema = 'featurellm').
-- Returns the project_id if the key is valid, null otherwise.
CREATE OR REPLACE FUNCTION featurellm.authenticate_api_key(raw_key TEXT)
RETURNS UUID AS $$
DECLARE
  v_project_id UUID;
BEGIN
  SELECT project_id INTO v_project_id
  FROM featurellm.api_keys
  WHERE key_hash = encode(sha256(raw_key::bytea), 'hex');

  IF v_project_id IS NOT NULL THEN
    UPDATE featurellm.api_keys
    SET last_used_at = NOW()
    WHERE key_hash = encode(sha256(raw_key::bytea), 'hex');
  END IF;

  RETURN v_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = featurellm, public;
