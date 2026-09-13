# Member B — Integrations (Slack, GitHub, Notion, Google Sheets)

**Folder you own:** `/backend/app/integrations/`
**Files to give your agentic IDE as context:** `00-report-structure.md`, `backend.md`, `deploy.md`, this file.
**At the 2:30 checkpoint you own verifying integrations work against the deployed backend**
(see step 8 below).

## Your job, in order

1. **Don't wait for Member A.** As soon as the Incident schema is pushed (~0:20), build and
   test each integration function standalone by hand-writing a fake Incident dict — you don't
   need the real backend running to build these.
2. **Slack (`slack.py`) — build this first, it's the easiest and most demoable.**
   Create an Incoming Webhook in a Slack workspace/channel (Slack app settings → Incoming
   Webhooks). `notify(incident)` = one `requests.post(webhook_url, json={"text": "..."})`
   with a formatted message (failure_type, severity, root_cause, a link to the GitHub
   issue/Notion page once those exist).
3. **GitHub (`github.py`) — build this second, it's the second most demoable.**
   Use a personal access token with repo scope. `create_issue(incident)` = POST to
   `https://api.github.com/repos/{owner}/{repo}/issues` with title = failure_type + short id,
   body = root_cause + suggested_fix.description (+ diff in a code block if present).
   Return the issue URL so Slack/Notion can link to it. If time allows, also support opening
   a branch + PR with the diff applied — otherwise the issue alone is enough for the demo.
4. **Notion (`notion.py`) — build third.** Create an integration token, share a database with
   it. `create_page(incident)` = POST to Notion's `pages` endpoint with the incident fields
   mapped to database properties. If Notion API setup is eating time, stub it: log what
   would've been created and move on — this is the first thing to cut.
5. **Google Sheets (`sheets.py`) — build last, cut first if short on time.** Service account
   + `gspread` library is the fastest path: share the sheet with the service account email,
   `append_row([...])`. If auth setup stalls past 15 minutes, mock it (print + return success)
   and note it in the README as "integration built, demoed via mock due to time."
6. Write `notify_all(incident)` in `integrations/__init__.py` — calls all four, wraps each in
   try/except so one failing integration doesn't break the others or the request.
7. Also add whatever function main.py needs to push a **status update** (not just creation) —
   e.g. `update_notify(incident)` — used when a human approves/rejects and later when tested.

8. **At the 2:30 checkpoint:** give Member A the exact list of env var names (Slack webhook
   URL, GitHub token, Notion token, Google service account JSON) they need to set on
   Render/Railway per `deploy.md`. Once the backend is deployed, trigger a real `/agent/trace`
   call against the **deployed** URL (not localhost) and confirm the Slack message and GitHub
   issue actually land — env vars behaving differently in a hosted environment is a common
   last-hour surprise, so verify this before the demo, not during it.

## What you're waiting on from others
The Incident schema (Member A, ~0:20). Nothing else — build and test standalone with fake data.
At 2:30, Member A's deployed backend URL to run your verification pass against.

## What you hand off
`notify_all(incident)` and `update_notify(incident)` → Member A wires these into `main.py`
at the 2:30 merge checkpoint.

## Priority order if time runs out
Slack → GitHub → Notion → Sheets. Get the first two rock-solid; mock the last two if needed
and say so honestly in the demo/README rather than showing something broken.
