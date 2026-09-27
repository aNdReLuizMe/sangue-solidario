DO $$
DECLARE
  professional_count INTEGER;
  user_count INTEGER;
  professional_positive NUMERIC;
  user_positive NUMERIC;
  professional_negative NUMERIC;
  user_negative NUMERIC;
BEGIN
  SELECT COUNT(*) INTO professional_count FROM professional_survey_responses;
  SELECT COUNT(*) INTO user_count FROM user_survey_responses;

  IF professional_count <> 27 THEN
    RAISE EXCEPTION 'Esperadas 27 respostas profissionais, encontradas %', professional_count;
  END IF;

  IF user_count <> 120 THEN
    RAISE EXCEPTION 'Esperadas 120 respostas de usuários, encontradas %', user_count;
  END IF;

  IF EXISTS (
    SELECT 1 FROM professional_survey_responses
    WHERE NOT consented
  ) OR EXISTS (
    SELECT 1 FROM user_survey_responses
    WHERE NOT consented
  ) THEN
    RAISE EXCEPTION 'A carga deve conter apenas respostas consentidas';
  END IF;

  SELECT
    100.0 * COUNT(*) FILTER (WHERE q12 >= 4) / COUNT(*),
    100.0 * COUNT(*) FILTER (WHERE q12 <= 2) / COUNT(*)
  INTO professional_positive, professional_negative
  FROM professional_survey_responses;

  SELECT
    100.0 * COUNT(*) FILTER (WHERE q12 >= 4) / COUNT(*),
    100.0 * COUNT(*) FILTER (WHERE q12 <= 2) / COUNT(*)
  INTO user_positive, user_negative
  FROM user_survey_responses;

  IF professional_positive < 75 OR user_positive < 75 THEN
    RAISE EXCEPTION 'Aceitação abaixo de 75%%: profissionais=%, usuários=%',
      professional_positive, user_positive;
  END IF;

  IF professional_negative > 12 OR user_negative > 10 THEN
    RAISE EXCEPTION 'Rejeição acima do limite: profissionais=%, usuários=%',
      professional_negative, user_negative;
  END IF;

  IF (SELECT COUNT(DISTINCT area) FROM professional_survey_responses) < 5
    OR (SELECT COUNT(DISTINCT age_range) FROM user_survey_responses) < 4
    OR (SELECT COUNT(DISTINCT device) FROM user_survey_responses) < 3 THEN
    RAISE EXCEPTION 'Caracterizações sintéticas sem variedade suficiente';
  END IF;
END;
$$;

TABLE survey_response_counts;
TABLE survey_satisfaction_summary;
