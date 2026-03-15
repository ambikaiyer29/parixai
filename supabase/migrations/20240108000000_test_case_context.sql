ALTER TABLE parixai.test_cases
  ADD COLUMN context JSONB;
-- Shape: [{ text: string, source?: string }] | null
-- null = plain test case (existing behavior)
-- array = RAG test case; chunks are serialized and injected as {{context}} variable
