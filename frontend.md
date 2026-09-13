# Frontend — Tech Stack & Structure

Owned by: **Member C**. Read `00-report-structure.md` first for the Incident schema and API contract.

## Stack
- React (Vite) — fastest scaffold: `npm create vite@latest frontend -- --template react`
- TailwindCSS for styling (skip a design system, use Tailwind utility classes directly)
- No router library needed — two views, toggle with local state (`selectedIncidentId`)
- `fetch` for API calls — no need for axios/react-query given the time budget

## Folder structure
```
/frontend/src
  main.jsx
  App.jsx
  /api
    client.js        <- getIncidents(), getIncident(id), sendDecision(id, decision)
  /pages
    IncidentList.jsx
    IncidentDetail.jsx
  /components
    IncidentCard.jsx
    SeverityBadge.jsx
    DecisionButtons.jsx (Approve / Reject)
```

## Screens (minimum viable for demo)

1. **Incident List** — table/cards of incidents: id, failure_type, severity, status, timestamp.
   Color-code severity (red/orange/yellow/gray). Click a row → detail view.
2. **Incident Detail** — shows root_cause, suggested_fix.description (+ diff in a `<pre>` block
   if present), trace_ref, current status. If status is `notified` or `under_review`, show
   **Approve / Reject** buttons that call `POST /incidents/{id}/decision`.
3. (Nice-to-have if time allows) A small banner/toast when a new incident appears — poll
   `GET /incidents` every 5s.

## Working before the backend is ready
Don't wait on Member A. Hardcode a fixture array of 2-3 incidents matching the exact schema
in `00-report-structure.md`, build the whole UI against that, then swap `client.js` to hit
the real backend once it's live. This is the single most important thing for staying unblocked.

## Definition of done
- Can view a list of incidents with correct severity/status styling
- Can open one and see root cause + suggested fix
- Approve/Reject buttons actually PATCH the backend and the UI reflects the new status
