# Aegis — Report Structure & Architecture (Master Doc)

**Read this file first, in every agentic IDE session, before touching code.**
Project: Aegis — Autonomous Reliability & Incident Response for AI Agents
Time budget: 4 hours. Team: 4 members, working in parallel on separate folders/branches.

## 1. What we're building (scope for 4 hours)

A monitoring loop: a demo AI agent runs → Aegis watches its trace → detects a failure →
diagnoses it → proposes a fix → creates an Incident → fans out to Slack / GitHub / Notion /
Google Sheets → a human approves or rejects in a dashboard → on approve, a mock "apply fix +
test" pipeline runs → status updates propagate back to Slack/Notion/Sheets.

**Keep it a monolith.** One FastAPI backend, one React frontend, one demo agent script.
No microservices, no message queue — we don't have time for that. Functions call functions
directly inside the same process.

## 2. Tech stack

**Backend:** Python 3.11 + FastAPI + Uvicorn. Storage: SQLite via SQLAlchemy (or plain
in-memory dict + JSON file if SQLite setup eats time — either is fine, just pick one by 0:20).
Pydantic for the Incident schema.

**Frontend:** React (Vite) + TailwindCSS. No router library needed unless time allows —
two views (list + detail) can be conditional state.

**Demo Agent:** plain Python script, no framework needed. Optionally a trivial LangChain/loop
if someone already knows it — don't learn a new library today.

**Integrations:** Slack Incoming Webhook (simplest — just a POST), GitHub REST API via
`requests` + a personal access token (create an issue, optionally a branch+PR), Notion API
(create a page in a database), Google Sheets API (append row via a service account) or —
if OAuth/service-account setup stalls — a mocked Sheets writer that logs "would append row X"
and we screen-record it for the demo. **Cut Sheets first if time runs short. Cut Notion second.
Slack and GitHub are the two that must work.**

## 3. Repo / folder structure

```
/backend
  /app
    main.py              <- wires everything together (shared, touch carefully)
    /core                <- MEMBER A owns this folder
      schema.py          <- Incident pydantic model (FREEZE by 0:20, everyone imports this)
      monitor.py         <- receives agent traces, detects failures
      diagnose.py         <- root cause + suggested fix generation
    /integrations        <- MEMBER B owns this folder
      slack.py
      github.py
      notion.py
      sheets.py
    /db
      store.py           <- MEMBER A owns, simple CRUD for incidents
  requirements.txt
/frontend                <- MEMBER C owns this folder
  /src
    /pages   (IncidentList.jsx, IncidentDetail.jsx)
    /components
    /api     (client.js — talks to backend)
/agent                   <- MEMBER D owns this folder
  demo_agent.py          <- runs fake tasks
  failure_injector.py    <- deliberately breaks the agent in 2-3 ways
  test_runner.py         <- mock "apply fix + run tests" step
/docs                    <- this file + tech-stack + member files
README.md
```

**Branching:** `main` + `member-a`, `member-b`, `member-c`, `member-d`. Each person only
commits inside their own folder. `schema.py` is the one shared file — Member A pushes it
first and everyone else pulls before building against it. Merge to `main` at the 2:30 mark
and again at 3:40.

## 4. The shared contract: the Incident object

Everyone builds against this. Member A freezes it by **0:20** and pushes to `main`.

```json
{
  "incident_id": "uuid",
  "timestamp": "ISO8601",
  "agent_id": "string",
  "failure_type": "incorrect_tool_usage | instruction_violation | hallucination | task_incomplete | execution_loop",
  "severity": "low | medium | high | critical",
  "root_cause": "string",
  "suggested_fix": { "description": "string", "diff": "string|null", "target_file": "string|null" },
  "status": "created | notified | under_review | approved | rejected | applied | tested | resolved",
  "trace_ref": "string"
}
```

## 5. Core API endpoints (Member A builds, everyone else calls)

- `POST /agent/trace` — agent posts an execution trace → triggers monitor → diagnose → creates Incident
- `GET /incidents` — list all
- `GET /incidents/{id}` — one incident
- `POST /incidents/{id}/decision` — body `{decision: "approve"|"reject"}` — human decision
- `PATCH /incidents/{id}/status` — used by integrations/test pipeline to move status forward

## 6. Timeline

| Time | What happens |
|---|---|
| 0:00–0:20 | All 4 sync: freeze the Incident schema + API contract, everyone reads this doc |
| 0:20–2:30 | Parallel build, own folders, own branches |
| 2:30–3:00 | **Merge checkpoint** — merge all branches into `main`, wire frontend to real backend |
| 3:00–3:40 | Bug fixing, fall back to mocks for anything not working |
| 3:40–4:00 | Demo script rehearsal, README polish |

## 7. Who depends on whom

- **Member C (frontend)** is blocked on the Incident schema + `GET /incidents` shape, not on
  the full backend. Build against a hardcoded JSON fixture matching the schema and swap in the
  real API call once Member A's endpoint is live (target: ~1:00).
- **Member B (integrations)** is blocked on the Incident schema and needs `main.py` to call
  their `notify_all(incident)` function directly on incident creation — no pub/sub needed.
  Their functions should be written and testable standalone (pass a fake Incident dict in)
  before that wiring happens.
- **Member D (demo agent)** is blocked on `POST /agent/trace` existing and returning 200 —
  ask Member A for a stub of this by 0:30 so Member D can test end-to-end early with fake
  trace data, even before diagnosis logic is real.
- **Member A** is the critical path for the first 20 minutes (schema) but otherwise works
  independently after that.

See `frontend.md` and `backend.md` for stack/setup details, and `member-a.md`
through `member-d.md` for individual task lists.
