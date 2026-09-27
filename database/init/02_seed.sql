BEGIN;

CREATE FUNCTION pg_temp.survey_score(
  respondent_number INTEGER,
  question_number INTEGER,
  allow_not_applicable BOOLEAN DEFAULT FALSE
) RETURNS SMALLINT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  bucket INTEGER := MOD(respondent_number * 13 + question_number * 17, 20);
BEGIN
  IF allow_not_applicable AND MOD(respondent_number * 11 + question_number * 7, 37) = 0 THEN
    RETURN NULL;
  END IF;

  RETURN CASE
    WHEN bucket = 0 THEN 1
    WHEN bucket = 1 THEN 2
    WHEN bucket IN (2, 3) THEN 3
    WHEN bucket BETWEEN 4 AND 9 THEN 4
    ELSE 5
  END;
END;
$$;

INSERT INTO professional_survey_responses (
  consented,
  area,
  platform_experience,
  q01, q02, q03, q04, q05, q06, q07, q08, q09, q10, q11, q12,
  most_useful_feature,
  main_difficulty,
  priority_improvement,
  organizes_activities,
  organization_reason,
  routine_use,
  version_recommendation,
  final_notes,
  submitted_at
)
SELECT
  TRUE,
  CASE
    WHEN MOD(g * 37, 100) < 29 THEN 'Atendimento'
    WHEN MOD(g * 37, 100) < 51 THEN 'Gestão administrativa'
    WHEN MOD(g * 37, 100) < 66 THEN 'Tecnologia da informação'
    WHEN MOD(g * 37, 100) < 81 THEN 'Estoque e logística'
    WHEN MOD(g * 37, 100) < 96 THEN 'Comunicação e campanhas'
    ELSE 'Prefiro não informar'
  END,
  CASE
    WHEN MOD(g * 31, 100) < 15 THEN 'Primeiro contato'
    WHEN MOD(g * 31, 100) < 41 THEN 'Menos de um mês'
    WHEN MOD(g * 31, 100) < 78 THEN 'Entre um e três meses'
    ELSE 'Mais de três meses'
  END,
  pg_temp.survey_score(g, 1),
  pg_temp.survey_score(g, 2),
  pg_temp.survey_score(g, 3),
  pg_temp.survey_score(g, 4, TRUE),
  pg_temp.survey_score(g, 5, TRUE),
  pg_temp.survey_score(g, 6, TRUE),
  pg_temp.survey_score(g, 7, TRUE),
  pg_temp.survey_score(g, 8, TRUE),
  pg_temp.survey_score(g, 9),
  pg_temp.survey_score(g, 10),
  pg_temp.survey_score(g, 11),
  pg_temp.survey_score(g, 12),
  (ARRAY[
    'Painel de agendamentos',
    'Visualização dos níveis de estoque',
    'Relatórios e indicadores',
    'Organização de campanhas',
    'Central de notificações',
    'Consulta de cadastros'
  ])[1 + MOD(g - 1, 6)],
  (ARRAY[
    'Não encontrei dificuldade relevante',
    'Alguns filtros poderiam ser mais claros',
    'O carregamento inicial pareceu um pouco lento',
    'Foi necessário explorar os menus no primeiro acesso',
    'A leitura dos níveis de estoque pode ser simplificada',
    'Os relatórios exigem uma breve adaptação'
  ])[1 + MOD(g * 5, 6)],
  (ARRAY[
    'Melhorar os filtros por período',
    'Destacar ações administrativas prioritárias',
    'Simplificar a leitura dos relatórios',
    'Aprimorar o desempenho em telas maiores',
    'Incluir ajuda contextual nos campos',
    'Reforçar contraste e legibilidade'
  ])[1 + MOD(g * 7, 6)],
  CASE
    WHEN MOD(g * 41, 100) < 75 THEN 'Sim'
    WHEN MOD(g * 41, 100) < 93 THEN 'Parcialmente'
    WHEN MOD(g * 41, 100) < 97 THEN 'Não'
    ELSE 'Não foi possível avaliar'
  END,
  CASE
    WHEN MOD(g * 41, 100) < 75 THEN 'Centraliza informações e reduz consultas manuais.'
    WHEN MOD(g * 41, 100) < 93 THEN 'Ajuda na rotina, mas alguns fluxos ainda podem ser simplificados.'
    WHEN MOD(g * 41, 100) < 97 THEN 'A versão avaliada ainda não cobre todas as necessidades da rotina.'
    ELSE 'O tempo de avaliação não foi suficiente para concluir.'
  END,
  CASE
    WHEN MOD(g * 43, 100) < 73 THEN 'Sim'
    WHEN MOD(g * 43, 100) < 94 THEN 'Talvez, após ajustes'
    WHEN MOD(g * 43, 100) < 98 THEN 'Não'
    ELSE 'Não foi possível avaliar'
  END,
  CASE
    WHEN MOD(g * 47, 100) < 56 THEN 'Continuar os testes'
    WHEN MOD(g * 47, 100) < 90 THEN 'Continuar após ajustes'
    WHEN MOD(g * 47, 100) < 97 THEN 'Realizar nova avaliação'
    ELSE 'Não continuar nesta versão'
  END,
  CASE MOD(g, 5)
    WHEN 0 THEN NULL
    WHEN 1 THEN 'A proposta facilita o acompanhamento das atividades.'
    WHEN 2 THEN 'A interface é clara e pode evoluir com os testes.'
    WHEN 3 THEN 'Os indicadores são úteis para a organização diária.'
    ELSE 'A experiência geral foi positiva, com pequenos pontos de melhoria.'
  END,
  TIMESTAMPTZ '2026-09-01 08:00:00-03' + g * INTERVAL '503 minutes'
FROM GENERATE_SERIES(1, 27) AS series(g);

INSERT INTO user_survey_responses (
  consented,
  age_range,
  device,
  platform_experience,
  q01, q02, q03, q04, q05, q06, q07, q08, q09, q10, q11, q12,
  most_useful_feature,
  encountered_difficulty,
  difficulty_description,
  suggested_improvement,
  future_appointment_use,
  would_recommend,
  overall_experience,
  final_comment,
  submitted_at
)
SELECT
  TRUE,
  CASE
    WHEN MOD(g * 37, 100) < 42 THEN '18 a 24 anos'
    WHEN MOD(g * 37, 100) < 82 THEN '25 a 35 anos'
    WHEN MOD(g * 37, 100) < 94 THEN '36 a 50 anos'
    WHEN MOD(g * 37, 100) < 98 THEN 'Acima de 50 anos'
    ELSE 'Prefiro não informar'
  END,
  CASE
    WHEN MOD(g * 43, 100) < 74 THEN 'Celular'
    WHEN MOD(g * 43, 100) < 94 THEN 'Computador'
    WHEN MOD(g * 43, 100) < 98 THEN 'Tablet'
    ELSE 'Outro'
  END,
  CASE
    WHEN MOD(g * 31, 100) < 25 THEN 'Primeiro acesso'
    WHEN MOD(g * 31, 100) < 70 THEN 'Utilizei algumas vezes'
    ELSE 'Utilizo com frequência'
  END,
  pg_temp.survey_score(g, 1),
  pg_temp.survey_score(g, 2),
  pg_temp.survey_score(g, 3),
  pg_temp.survey_score(g, 4),
  pg_temp.survey_score(g, 5),
  pg_temp.survey_score(g, 6),
  pg_temp.survey_score(g, 7, TRUE),
  pg_temp.survey_score(g, 8, TRUE),
  pg_temp.survey_score(g, 9),
  pg_temp.survey_score(g, 10),
  pg_temp.survey_score(g, 11),
  pg_temp.survey_score(g, 12),
  (ARRAY[
    'Agendamento de doação',
    'Confirmação do agendamento',
    'Lembretes e notificações',
    'Consulta do perfil',
    'Navegação entre as telas',
    'Informações apresentadas na página inicial'
  ])[1 + MOD(g - 1, 6)],
  MOD(g * 29, 100) < 15,
  CASE
    WHEN MOD(g * 29, 100) >= 15 THEN NULL
    ELSE (ARRAY[
      'Demorei para localizar a opção de editar o agendamento.',
      'Algumas mensagens poderiam explicar melhor o próximo passo.',
      'O calendário levou um momento para ficar claro.',
      'A navegação no primeiro acesso exigiu alguma exploração.',
      'Gostaria de visualizar mais detalhes no perfil.'
    ])[1 + MOD(g * 7, 5)]
  END,
  (ARRAY[
    'Adicionar mais orientações no primeiro acesso',
    'Melhorar a visualização do calendário',
    'Deixar as mensagens de confirmação mais destacadas',
    'Aprimorar a consulta do histórico',
    'Oferecer mais opções de acessibilidade',
    'Otimizar a navegação em celular'
  ])[1 + MOD(g * 11, 6)],
  CASE
    WHEN MOD(g * 17, 100) < 80 THEN 'Sim'
    WHEN MOD(g * 17, 100) < 96 THEN 'Talvez'
    ELSE 'Não'
  END,
  CASE
    WHEN MOD(g * 19, 100) < 84 THEN 'Sim'
    WHEN MOD(g * 19, 100) < 97 THEN 'Talvez'
    ELSE 'Não'
  END,
  CASE
    WHEN MOD(g * 23, 100) < 2 THEN 'Muito ruim'
    WHEN MOD(g * 23, 100) < 6 THEN 'Ruim'
    WHEN MOD(g * 23, 100) < 16 THEN 'Regular'
    WHEN MOD(g * 23, 100) < 48 THEN 'Boa'
    ELSE 'Muito boa'
  END,
  CASE MOD(g, 6)
    WHEN 0 THEN NULL
    WHEN 1 THEN 'O agendamento foi simples e rápido.'
    WHEN 2 THEN 'A experiência foi boa e as informações estavam claras.'
    WHEN 3 THEN 'Usaria novamente para organizar uma próxima doação.'
    WHEN 4 THEN 'A proposta é útil e pode melhorar com novos testes.'
    ELSE 'Gostei principalmente da facilidade de navegação.'
  END,
  TIMESTAMPTZ '2026-09-01 08:00:00-03' + g * INTERVAL '211 minutes'
FROM GENERATE_SERIES(1, 120) AS series(g);

COMMIT;
