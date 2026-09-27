TABLE survey_response_counts;
TABLE survey_satisfaction_summary;

SELECT
  future_appointment_use,
  COUNT(*) AS responses,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM user_survey_responses
GROUP BY future_appointment_use
ORDER BY responses DESC;

SELECT
  would_recommend,
  COUNT(*) AS responses,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM user_survey_responses
GROUP BY would_recommend
ORDER BY responses DESC;

SELECT
  routine_use,
  COUNT(*) AS responses,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM professional_survey_responses
GROUP BY routine_use
ORDER BY responses DESC;
