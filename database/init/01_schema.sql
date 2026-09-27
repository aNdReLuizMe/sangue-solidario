BEGIN;

CREATE TABLE professional_survey_responses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  consented BOOLEAN NOT NULL CHECK (consented),
  area TEXT NOT NULL CHECK (area IN (
    'Atendimento',
    'Gestão administrativa',
    'Tecnologia da informação',
    'Estoque e logística',
    'Comunicação e campanhas',
    'Prefiro não informar'
  )),
  platform_experience TEXT NOT NULL CHECK (platform_experience IN (
    'Primeiro contato',
    'Menos de um mês',
    'Entre um e três meses',
    'Mais de três meses'
  )),
  q01 SMALLINT CHECK (q01 BETWEEN 1 AND 5),
  q02 SMALLINT CHECK (q02 BETWEEN 1 AND 5),
  q03 SMALLINT CHECK (q03 BETWEEN 1 AND 5),
  q04 SMALLINT CHECK (q04 BETWEEN 1 AND 5),
  q05 SMALLINT CHECK (q05 BETWEEN 1 AND 5),
  q06 SMALLINT CHECK (q06 BETWEEN 1 AND 5),
  q07 SMALLINT CHECK (q07 BETWEEN 1 AND 5),
  q08 SMALLINT CHECK (q08 BETWEEN 1 AND 5),
  q09 SMALLINT CHECK (q09 BETWEEN 1 AND 5),
  q10 SMALLINT CHECK (q10 BETWEEN 1 AND 5),
  q11 SMALLINT CHECK (q11 BETWEEN 1 AND 5),
  q12 SMALLINT CHECK (q12 BETWEEN 1 AND 5),
  most_useful_feature TEXT NOT NULL,
  main_difficulty TEXT NOT NULL,
  priority_improvement TEXT NOT NULL,
  organizes_activities TEXT NOT NULL CHECK (organizes_activities IN (
    'Sim', 'Parcialmente', 'Não', 'Não foi possível avaliar'
  )),
  organization_reason TEXT,
  routine_use TEXT NOT NULL CHECK (routine_use IN (
    'Sim', 'Talvez, após ajustes', 'Não', 'Não foi possível avaliar'
  )),
  version_recommendation TEXT NOT NULL CHECK (version_recommendation IN (
    'Continuar os testes',
    'Continuar após ajustes',
    'Realizar nova avaliação',
    'Não continuar nesta versão'
  )),
  final_notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE professional_survey_responses IS
  'Respostas anônimas do formulário de profissionais.';
COMMENT ON COLUMN professional_survey_responses.q01 IS '1 a 5; NULL representa N/A.';

CREATE TABLE user_survey_responses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  consented BOOLEAN NOT NULL CHECK (consented),
  age_range TEXT NOT NULL CHECK (age_range IN (
    '18 a 24 anos',
    '25 a 35 anos',
    '36 a 50 anos',
    'Acima de 50 anos',
    'Prefiro não informar'
  )),
  device TEXT NOT NULL CHECK (device IN ('Celular', 'Computador', 'Tablet', 'Outro')),
  platform_experience TEXT NOT NULL CHECK (platform_experience IN (
    'Primeiro acesso', 'Utilizei algumas vezes', 'Utilizo com frequência'
  )),
  q01 SMALLINT CHECK (q01 BETWEEN 1 AND 5),
  q02 SMALLINT CHECK (q02 BETWEEN 1 AND 5),
  q03 SMALLINT CHECK (q03 BETWEEN 1 AND 5),
  q04 SMALLINT CHECK (q04 BETWEEN 1 AND 5),
  q05 SMALLINT CHECK (q05 BETWEEN 1 AND 5),
  q06 SMALLINT CHECK (q06 BETWEEN 1 AND 5),
  q07 SMALLINT CHECK (q07 BETWEEN 1 AND 5),
  q08 SMALLINT CHECK (q08 BETWEEN 1 AND 5),
  q09 SMALLINT CHECK (q09 BETWEEN 1 AND 5),
  q10 SMALLINT CHECK (q10 BETWEEN 1 AND 5),
  q11 SMALLINT CHECK (q11 BETWEEN 1 AND 5),
  q12 SMALLINT CHECK (q12 BETWEEN 1 AND 5),
  most_useful_feature TEXT NOT NULL,
  encountered_difficulty BOOLEAN NOT NULL,
  difficulty_description TEXT,
  suggested_improvement TEXT NOT NULL,
  future_appointment_use TEXT NOT NULL CHECK (future_appointment_use IN ('Sim', 'Talvez', 'Não')),
  would_recommend TEXT NOT NULL CHECK (would_recommend IN ('Sim', 'Talvez', 'Não')),
  overall_experience TEXT NOT NULL CHECK (overall_experience IN (
    'Muito ruim', 'Ruim', 'Regular', 'Boa', 'Muito boa'
  )),
  final_comment TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (encountered_difficulty OR difficulty_description IS NULL)
);

COMMENT ON TABLE user_survey_responses IS
  'Respostas anônimas do formulário de usuários.';
COMMENT ON COLUMN user_survey_responses.q01 IS '1 a 5; NULL representa N/A.';

CREATE VIEW survey_response_counts AS
SELECT 'professional'::TEXT AS audience, COUNT(*) AS responses
FROM professional_survey_responses
UNION ALL
SELECT 'user'::TEXT AS audience, COUNT(*) AS responses
FROM user_survey_responses;

CREATE VIEW survey_satisfaction_summary AS
SELECT
  'professional'::TEXT AS audience,
  COUNT(*) AS responses,
  ROUND(AVG(q12)::NUMERIC, 2) AS average_overall_score,
  ROUND(100.0 * COUNT(*) FILTER (WHERE q12 >= 4) / COUNT(*), 2) AS positive_percentage,
  ROUND(100.0 * COUNT(*) FILTER (WHERE q12 <= 2) / COUNT(*), 2) AS negative_percentage
FROM professional_survey_responses
UNION ALL
SELECT
  'user'::TEXT AS audience,
  COUNT(*) AS responses,
  ROUND(AVG(q12)::NUMERIC, 2) AS average_overall_score,
  ROUND(100.0 * COUNT(*) FILTER (WHERE q12 >= 4) / COUNT(*), 2) AS positive_percentage,
  ROUND(100.0 * COUNT(*) FILTER (WHERE q12 <= 2) / COUNT(*), 2) AS negative_percentage
FROM user_survey_responses;

COMMIT;
