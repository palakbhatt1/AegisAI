# Member C — Frontend Dashboard

**Folder you own:** `/frontend/`
**Files to give your agentic IDE as context:** `00-report-structure.md`, `frontend.md`, `deploy.md`, this file.
**You own the frontend deploy to Vercel at the 2:30 checkpoint** (see step 8 below).

## Your job, in order

1. Scaffold with Vite + Tailwind (`npm create vite@latest frontend -- --template react`).
2. **Don't wait for the backend.** Write a fixture file with 2-3 fake incidents matching the
   exact Incident schema in `00-report-structure.md` section 4. Build the entire UI against
   that fixture first.
3. Build `IncidentList.jsx` — cards or a table showing id, failure_type, severity (color-coded
   badge), status, timestamp. Click → opens `IncidentDetail.jsx`.
4. Build `IncidentDetail.jsx` — root_cause, suggested_fix.description, the diff (if present,
   in a `<pre>`/monospace block), trace_ref, current status. If status is `notified` or
   `under_review`, render **Approve** and **Reject** buttons.
5. Build `/api/client.js` with `getIncidents()`, `getIncident(id)`, `sendDecision(id, decision)` —
   pointed at your fixture data initially, then swap to real `fetch` calls to the backend
   (`http://localhost:8000` or whatever Member A's server runs on) once it's live (~1:00 target).
6. Wire the Approve/Reject buttons to `sendDecision` and update the UI optimistically or by
   refetching after the call.
7. (If time allows) Poll `GET /incidents` every 5s on the list page so new incidents appear
   without a manual refresh — good for the live demo.

8. **At the 2:30 checkpoint:** update `client.js` to read the backend URL from
   `import.meta.env.VITE_API_URL` instead of localhost, then deploy `/frontend` to Vercel per
   `deploy.md` (root directory `frontend`, framework Vite). Set `VITE_API_URL` in Vercel's env
   vars to Member A's live backend URL once they hand it to you. Redeploy after any env var
   change — Vercel doesn't hot-reload those.

## What you're waiting on from others
Only the real `GET /incidents` / `GET /incidents/{id}` / `POST /incidents/{id}/decision`
endpoints from Member A (target ~1:00) — everything else you can build against your own
fixture data starting immediately. At 2:30, the live backend URL from Member A for the
`VITE_API_URL` env var.

## What you hand off
The live Vercel URL (by ~3:00) → Member D, for the final end-to-end demo rehearsal.
