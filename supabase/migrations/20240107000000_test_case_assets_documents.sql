UPDATE storage.buckets
SET allowed_mime_types = allowed_mime_types || ARRAY['application/pdf'],
    file_size_limit = 52428800  -- raise to 50 MB for PDFs
WHERE id = 'test-case-assets';
