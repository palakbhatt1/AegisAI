# Member A — Core Engine (Detection, Diagnosis, Schema, Storage)

**Folder you own:** `/backend/app/core/`, `/backend/app/db/`
**Files to give your agentic IDE as context:** `00-report-structure.md`, `backend.md`, `deploy.md`, this file.
**You are the critical path for the first 20 minutes.** Everyone else is waiting on your schema.
**You also own the backend deploy at the 2:30 checkpoint** (see step 8 below and `deploy.md`).

## Your job, in order

1. **(0:00–0:20 — do this first, above everything else)** Write `schema.py` with the Incident
   pydantic model exactly as specified in `00-report-structure.md` section 4. Commit and push
   to `main` immediately. Message the team when it's up — this unblocks B, C, and D.
2. Stand up a bare FastAPI app in `main.py` with `POST /agent/trace` returning a hardcoded
   200 + fake incident, even before real logic exists — Member D needs this stub by ~0:30 to
   start testing their agent script against something real.
3. Build `store.py`: `save_incident`, `get_incident(id)`, `get_all()`, `update_status(id, status)`.
   Pick SQLite or JSON-file-backed dict, don't overthink it.
4. Build `monitor.py`: given a trace (a list of agent steps/tool calls, keep the format simple —
   e.g. `{"steps": [{"tool": "...", "input": "...", "output": "...", "error": "..."}]}`),
   detect one of the 5 failure types. Simplest viable logic for a hackathon: rule-based checks
   (e.g. same tool called >3 times in a row → `execution_loop`; a step has a non-null `error`
   field → `incorrect_tool_usage`; final step missing/empty → `task_incomplete`). You do not
   need ML here — pattern-matching is fine and demoable.
5. Build `diagnose.py`: given a detected failure, produce a `root_cause` string and a
   `suggested_fix` (description + optional diff). This can be templated per failure_type —
   doesn't need to be a real LLM call unless you have time left, in which case a single call
   to an LLM API with the trace + failure_type as input is a nice upgrade.
6. Wire it all together in `main.py`'s `/agent/trace` handler, replacing the stub from step 2.
7. Implement `GET /incidents`, `GET /incidents/{id}`, `PATCH /incidents/{id}/status`.
8. **At the 2:30 checkpoint:** add `CORSMiddleware` to `main.py` (allow the Vercel domain +
   localhost), then deploy the backend to Render or Railway per `deploy.md`. Set all env vars
   there (coordinate with Member B on which keys/tokens they need). Hand the live backend URL
   to Member C immediately so they can point `VITE_API_URL` at it.

## What you're waiting on from others
Nothing to start. At the 2:30 merge checkpoint you'll need Member B's `notify_all()` function
to call from your trace handler, and Member D's demo agent to actually generate realistic traces.

## What you hand off
- `schema.py` (by 0:20) → everyone
- Working `/agent/trace` stub (by 0:30) → Member D
- Real `/incidents` endpoints (by ~1:00) → Member C swaps their fixture for real calls
- Live backend URL (by ~3:00) → Member C (for Vercel env var) and Member D (for end-to-end demo test)
