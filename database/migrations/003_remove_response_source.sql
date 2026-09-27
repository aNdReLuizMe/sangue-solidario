BEGIN;

ALTER TABLE professional_survey_responses
  DROP COLUMN response_source;

ALTER TABLE user_survey_responses
  DROP COLUMN response_source;

COMMIT;
