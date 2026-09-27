# Banco das pesquisas de satisfação

Banco PostgreSQL local com respostas anônimas e sintéticas baseadas nos dois templates de `forms/`.

## Conteúdo

- `professional_survey_responses`: 27 respostas profissionais.
- `user_survey_responses`: 120 respostas de usuários; a coluna `device` registra o dispositivo informado.
- Notas `q01` a `q12`: valores de 1 a 5; `NULL` representa “N/A”.
- `survey_response_counts` e `survey_satisfaction_summary`: visões de conferência.

Nenhuma resposta contém nome, contato, CPF, endereço, tipo sanguíneo, histórico clínico ou outro identificador pessoal. A carga é gerada para demonstração e não deve ser apresentada como resultado de uma coleta real.

## Inicialização

Crie um `.env` local a partir de `.env.example`, substitua a senha e execute:

```bash
docker compose up -d
docker compose ps
```

Os scripts em `database/init/` são executados automaticamente somente quando o volume está vazio. A validação da carga ocorre durante a inicialização.

## Conferência

```bash
docker compose exec -T db psql -U sangue_app -d sangue_solidario -f /docker-entrypoint-initdb.d/03_validate_seed.sql
docker compose exec -T db psql -U sangue_app -d sangue_solidario < database/queries/summary.sql
```

Se `POSTGRES_USER` ou `POSTGRES_DB` forem alterados no `.env`, ajuste os argumentos dos comandos.
