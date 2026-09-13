# Backend — Tech Stack & Structure

Owned by: **Member A** (core) and **Member B** (integrations), inside one FastAPI app.
Read `00-report-structure.md` first for the Incident schema and API contract.

## Stack
- Python 3.11, FastAPI, Uvicorn (`uvicorn app.main:app --reload`)
- Pydantic for the Incident model (single source of truth — `app/core/schema.py`)
- Storage: SQLite via SQLAlchemy if someone on the team is fast with it; otherwise a plain
  Python dict keyed by `incident_id`, persisted to a `incidents.json` file on write. Pick one
  by 0:20 and don't revisit — either is fine for a 4-hour demo.
- `requests` for outbound calls to Slack/GitHub/Notion/Sheets
- `python-dotenv` for API keys/tokens (Slack webhook URL, GitHub PAT, Notion token, Google
  service account json) — put a `.env.example` in the repo, real `.env` is gitignored

## Folder structure
```
/backend/app
  main.py                 <- FastAPI app, routes, wires core + integrations together
  /core                   <- Member A
    schema.py             <- Incident pydantic model — FREEZE FIRST, everyone imports this
    monitor.py            <- takes a trace, returns a detected failure (or None)
    diagnose.py           <- takes a failure, returns root_cause + suggested_fix
  /integrations           <- Member B
    slack.py              <- notify(incident) -> posts to webhook
    github.py             <- create_issue(incident) -> returns issue url
    notion.py             <- create_page(incident) -> returns page url
    sheets.py             <- append_row(incident)
  /db
    store.py              <- Member A: save_incident, get_incident, get_all, update_status
requirements.txt
.env.example
```

## Wiring (in main.py)
On `POST /agent/trace`: `monitor.detect(trace)` → if failure → `diagnose.analyze(failure)` →
build Incident → `store.save_incident(incident)` → `integrations.notify_all(incident)`
(a small function in `main.py` or `integrations/__init__.py` that calls all four notifiers
and swallows individual failures so one broken integration doesn't kill the request).

On `POST /incidents/{id}/decision`: update status to `approved`/`rejected`. If approved,
call `agent/test_runner`-equivalent (Member D's mock) or just flip status to `applied` →
`tested` → `resolved` for demo purposes, then call integrations again to push the status
update to Slack/Notion/Sheets.

## Definition of done
- `POST /agent/trace` with a fake trace produces a real Incident retrievable via `GET /incidents`
- Slack message and GitHub issue actually appear when an incident is created
- `POST /incidents/{id}/decision` changes status and (at minimum) posts an update to Slack
