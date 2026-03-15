-- Fix: deleting a test case that has run_results was blocked by the FK constraint
-- because test_case_id was defined without ON DELETE CASCADE.
ALTER TABLE parixai.run_results
  DROP CONSTRAINT run_results_test_case_id_fkey,
  ADD CONSTRAINT run_results_test_case_id_fkey
    FOREIGN KEY (test_case_id)
    REFERENCES parixai.test_cases(id)
    ON DELETE CASCADE;
