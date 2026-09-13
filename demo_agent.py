"""
demo_agent.py

Simulates an AI agent running a small "research and summarize" task, producing a
trace in the exact shape Member A's monitor.py expects:

    {"agent_id": "...", "steps": [{"tool": ..., "input": ..., "output": ..., "error": ...}, ...]}

Usage:
    python demo_agent.py                        # clean run, no failure
    python demo_agent.py --failure loop          # execution_loop
    python demo_agent.py --failure tool_error    # incorrect_tool_usage
    python demo_agent.py --failure incomplete    # task_incomplete
    python demo_agent.py --failure loop --dry-run  # print the trace, don't POST it

Can also be imported and called as `demo_agent.run(failure=..., dry_run=...)` —
orchestrate_demo.py does this to chain a full run without shelling out.
"""
import argparse
import json
import sys

import requests

from config import AGENT_ID, BACKEND_URL, REQUEST_TIMEOUT
from failure_injector import FAILURE_TYPES


def build_clean_trace() -> dict:
    """A believable 4-step 'research and summarize' trace with no failures."""
    return {
        "agent_id": AGENT_ID,
        "steps": [
            {
                "tool": "web_search",
                "input": "latest FastAPI deployment best practices",
                "output": "Found 5 relevant articles on deployment patterns.",
                "error": None,
            },
            {
                "tool": "fetch_page",
                "input": "https://example.com/fastapi-deploy-guide",
                "output": "Page content fetched (2.4k characters).",
                "error": None,
            },
            {
                "tool": "summarize",
                "input": "<fetched page content>",
                "output": "Summary: use a long-lived host for FastAPI, Vercel for the frontend, watch CORS.",
                "error": None,
            },
            {
                "tool": "save_report",
                "input": "<summary text>",
                "output": "Report saved to report.md",
                "error": None,
            },
        ],
    }


def run(failure: str | None = None, dry_run: bool = False) -> dict | None:
    trace = build_clean_trace()

    if failure:
        if failure not in FAILURE_TYPES:
            print(f"[demo_agent] unknown failure type '{failure}'. Choose from: {list(FAILURE_TYPES)}")
            sys.exit(1)
        trace = FAILURE_TYPES[failure](trace)
        print(f"[demo_agent] injected failure: {failure}")
    else:
        print("[demo_agent] running clean trace (no failure injected)")

    if dry_run:
        print(json.dumps(trace, indent=2))
        return None

    url = f"{BACKEND_URL}/agent/trace"
    try:
        resp = requests.post(url, json=trace, timeout=REQUEST_TIMEOUT)
    except requests.exceptions.ConnectionError:
        print(f"[demo_agent] ERROR: could not reach backend at {url}. Is uvicorn running?")
        sys.exit(1)

    print(f"[demo_agent] POST {url} -> {resp.status_code}")
    try:
        data = resp.json()
    except ValueError:
        print(f"[demo_agent] response was not JSON:\n{resp.text}")
        return None

    print(json.dumps(data, indent=2))
    if resp.status_code >= 400:
        print("[demo_agent] backend returned an error status — check main.py's /agent/trace handler.")
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the Aegis demo agent, optionally injecting a failure.")
    parser.add_argument(
        "--failure",
        choices=list(FAILURE_TYPES.keys()),
        default=None,
        help="Inject a specific failure type. Omit for a clean run (no incident expected).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the trace instead of POSTing it to the backend (useful before the backend is up).",
    )
    args = parser.parse_args()
    run(failure=args.failure, dry_run=args.dry_run)
