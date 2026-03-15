-- =====================
-- TEST CASE ASSETS
-- =====================

-- Private storage bucket for test case image assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'test-case-assets',
  'test-case-assets',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: org members can upload to their org's folder
CREATE POLICY "org_members_upload_test_case_assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'test-case-assets'
  AND (storage.foldername(name))[1] IN (
    SELECT om.org_id::text
    FROM parixai.org_members om
    WHERE om.user_id = auth.uid()
  )
);

-- Storage RLS: org members can read their org's folder
CREATE POLICY "org_members_read_test_case_assets"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'test-case-assets'
  AND (storage.foldername(name))[1] IN (
    SELECT om.org_id::text
    FROM parixai.org_members om
    WHERE om.user_id = auth.uid()
  )
);

-- Storage RLS: org members can delete from their org's folder
CREATE POLICY "org_members_delete_test_case_assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'test-case-assets'
  AND (storage.foldername(name))[1] IN (
    SELECT om.org_id::text
    FROM parixai.org_members om
    WHERE om.user_id = auth.uid()
  )
);

-- New table
CREATE TABLE parixai.test_case_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_case_id UUID NOT NULL REFERENCES parixai.test_cases(id) ON DELETE CASCADE,
  variable_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  original_filename TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS on the assets table (defence-in-depth; enforcement is in API code)
ALTER TABLE parixai.test_case_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "org_members_access_test_case_assets"
ON parixai.test_case_assets
USING (
  test_case_id IN (
    SELECT tc.id
    FROM parixai.test_cases tc
    JOIN parixai.test_sets ts ON tc.test_set_id = ts.id
    JOIN parixai.projects p ON ts.project_id = p.id
    JOIN parixai.org_members om ON p.org_id = om.org_id
    WHERE om.user_id = auth.uid()
  )
);
