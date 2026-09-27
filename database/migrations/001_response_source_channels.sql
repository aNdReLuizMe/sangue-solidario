BEGIN;

ALTER TABLE professional_survey_responses
  DROP CONSTRAINT professional_survey_responses_response_source_check;
ALTER TABLE professional_survey_responses
  ALTER COLUMN response_source DROP DEFAULT;

ALTER TABLE user_survey_responses
  DROP CONSTRAINT user_survey_responses_response_source_check;
ALTER TABLE user_survey_responses
  ALTER COLUMN response_source DROP DEFAULT;

TRUNCATE TABLE professional_survey_responses, user_survey_responses RESTART IDENTITY;

ALTER TABLE professional_survey_responses
  ADD CONSTRAINT professional_survey_responses_response_source_check
  CHECK (response_source IN ('web_app', 'mobile_app'));

ALTER TABLE user_survey_responses
  ADD CONSTRAINT user_survey_responses_response_source_check
  CHECK (response_source IN ('web_app', 'mobile_app'));

COMMENT ON TABLE professional_survey_responses IS
  'Respostas anônimas do formulário de profissionais.';
COMMENT ON TABLE user_survey_responses IS
  'Respostas anônimas do formulário de usuários.';

COMMIT;
