# Member D — Demo Agent, Failure Injection, Testing Pipeline, Orchestration

**Folder you own:** `/agent/`
**Files to give your agentic IDE as context:** `00-report-structure.md`, `backend.md`, `deploy.md`, this file.
**You own the go/no-go decision on the fallback plan in `deploy.md`** if deploy is running
late — see step 7 below.

## Your job, in order

1. Write `demo_agent.py` — a small script that simulates an AI agent doing a task (e.g. a fake
   "research and summarize" loop with 4-5 steps, each calling a fake "tool" function). It
   should produce a trace in the exact format Member A's `monitor.py` expects — check with
   Member A on the trace shape (a list of `{tool, input, output, error}` steps) as soon as
   they've defined it, ideally by 0:30.
2. Write `failure_injector.py` — deliberately makes the agent fail in 2-3 of the 5 ways Aegis
   is supposed to detect: e.g. (a) call the same tool 4+ times in a row → `execution_loop`,
   (b) force a tool call with a bad argument → sets an `error` field → `incorrect_tool_usage`,
   (c) truncate the run before the final step → `task_incomplete`. You need at least 2 distinct,
   reliably reproducible failure scenarios for the demo — polish those over adding more types.
3. As soon as Member A's `POST /agent/trace` stub exists (~0:30), have `demo_agent.py` POST
   its trace there after each run, so you can test the full pipeline end-to-end early and
   repeatedly, well before the real diagnosis logic is done.
4. Write `test_runner.py` — the mock "apply fix + run tests" step that fires when a human
   approves an incident. For a 4-hour hackathon this can be genuinely mocked: pretend to apply
   the diff, sleep briefly, return `pass`/`fail`, and call `PATCH /incidents/{id}/status` to
   move it to `tested` → `resolved`. It does not need to actually run a real test suite.
5. Own the **end-to-end demo script**: the exact sequence of commands/clicks that will be run
   live for judges (start backend → start frontend → run `demo_agent.py` with a failure
   injected → show the Slack message / GitHub issue appear → open the dashboard → approve →
   show status update propagate). Write this as a numbered list in the root `README.md` and
   rehearse it in the last 20 minutes.
6. During the 2:30 merge checkpoint, you're the one running the full pipeline live to catch
   integration bugs before anyone else does — flag issues to the relevant owner immediately.
7. **Once Member A's backend and Member C's frontend are both deployed (~3:00):** run
   `demo_agent.py` against the **live deployed backend URL** (not localhost) end-to-end and
   confirm the whole chain works on the real deployment — this is the actual dress rehearsal.
   If deploy is still broken by ~3:15, make the call to invoke the `deploy.md` fallback
   (ngrok tunnel, or full localhost demo) rather than letting the team keep debugging a
   hosting platform into the last 15 minutes. Update the README's demo script with whichever
   URLs (deployed or ngrok or localhost) actually end up working.

## What you're waiting on from others
Member A's `/agent/trace` stub (~0:30) to start end-to-end testing; the real monitor/diagnose
logic (~1:30+) to see genuine failure detection rather than the stub's fake response.

## What you hand off
A reliable, repeatable failure scenario + the demo script — this is what the whole team
performs for judges, so keep it simple and bulletproof over impressive-but-flaky.
