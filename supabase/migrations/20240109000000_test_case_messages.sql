ALTER TABLE parixai.test_cases
  ADD COLUMN messages JSONB;
-- Shape: [{ role: 'user'|'assistant', content: string }] | null
-- null = single-turn (existing behavior)
-- array = multi-turn conversation history; last message must be role: 'user'
