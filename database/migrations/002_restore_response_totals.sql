BEGIN;

TRUNCATE TABLE professional_survey_responses, user_survey_responses RESTART IDENTITY;

COMMIT;
