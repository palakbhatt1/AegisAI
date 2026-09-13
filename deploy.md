# Deploy — Getting Aegis Live for the Demo

**Files to give your agentic IDE:** `00-report-structure.md`, `backend.md`, `frontend.md`, this file.
Do this at the **2:30 merge checkpoint**, not before — deploying half-built code wastes time.
Whoever isn't mid-task at that point (often Member D, since the demo agent is small) should drive this.

## The core problem
Vercel is built for frontend + serverless functions. It is **not** a good fit for our FastAPI
backend as-is (no persistent SQLite file between invocations, cold starts, and our monolith
calls out to 4 external APIs synchronously — messy in a serverless function). Split it:

- **Frontend → Vercel** (great fit, git-push deploy, free)
- **Backend → Render or Railway** (free tier, runs FastAPI as a normal long-lived process,
  SQLite/JSON file persists fine)

## Frontend on Vercel
1. Push `/frontend` to GitHub (or the whole monorepo — Vercel lets you set a root directory).
2. vercel.com → New Project → import the repo → set **Root Directory** to `frontend`.
3. Framework preset: Vite. Build command `npm run build`, output dir `dist` (usually auto-detected).
4. Add an environment variable `VITE_API_URL` = your backend's deployed URL (see below) —
   update `client.js` to read `import.meta.env.VITE_API_URL` instead of a hardcoded localhost.
5. Deploy. You get a `*.vercel.app` URL — that's the one you show judges.

## Backend on Render (recommended — simplest FastAPI deploy)
1. render.com → New → Web Service → connect the repo, root directory `backend`.
2. Build command: `pip install -r requirements.txt`. Start command:
   `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Add environment variables: Slack webhook URL, GitHub token, Notion token, Google service
   account JSON (as a string or base64 — don't commit any of these to the repo).
4. Free tier spins down when idle — first request after a while is slow. Wake it up a few
   minutes before you demo by hitting it once.
5. **Railway** is an equally good alternative if Render is being slow to spin up during setup —
   same idea (connect repo, set start command, add env vars).

## CORS (don't forget this — it's the #1 "why is nothing loading" bug)
In `main.py`, add FastAPI's `CORSMiddleware` allowing your Vercel domain (and `localhost` for
local dev) as an allowed origin, on all routes. Do this before you deploy, not after debugging
a blank frontend for 20 minutes.

## Fallback plan if deploy breaks close to the deadline
Don't burn your last 30 minutes fighting a deploy platform. Fall back in this order:
1. Run backend locally, expose it with `ngrok http 8000` (or `localtunnel`), point the deployed
   Vercel frontend's `VITE_API_URL` at the ngrok URL. Good enough for a live demo.
2. If even that's flaky, demo entirely on `localhost` via screen share — judges care about the
   working system, not the URL. Have the frontend fixture data (from `frontend.md`) ready as
   a last-resort visual backup if the live backend genuinely won't cooperate.

## Definition of done
- Vercel URL loads the dashboard and successfully fetches from the deployed backend
- Backend URL responds to `POST /agent/trace` and a Slack message actually appears
- CORS is not blocking anything (check browser console once, early)
