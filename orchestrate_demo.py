"""
orchestrate_demo.py

Runs the full Aegis pipeline end-to-end as one script: inject a failure -> post the
trace -> (wait for a human to Approve in the dashboard, or auto-approve for
rehearsal) -> run the mock test pipeline -> confirm resolved.

This is the "one-shot" version of the manual demo script in README_DEMO.md — use
it for repeated rehearsal, or as the live demo itself if the team prefers fewer
manual steps on stage.

Usage:
    python orchestrate_demo.py --failure loop
        # posts the trace, then WAITS for you to click Approve/Reject in the
        # dashboard before continuing — good for the actual judged demo, since
        # the human-in-the-loop step is the point of the product.

    python orchestrate_demo.py --failure loop --auto-approve
        # skips the dashboard click and POSTs the approve decision itself —
        # good for a fast rehearsal / integration smoke test, NOT for judges.

Assumption (flag to Member A): GET /incidents/{id} returns a JSON object with a
top-level "status" field, and POST /agent/trace's response includes
"incident_id" at the top level, per the schema in 00-report-structure.md
section 4. If main.py wraps the incident in an envelope (e.g. {"incident": {...}}),
adjust the two spots below marked ADJUST.
"""
import argparse
import sys
import time

import requests

import demo_agent
import test_runner
from config import BACKEND_URL, REQUEST_TIMEOUT
from failure_injector import FAILURE_TYPES


def poll_incident_status(incident_id: str, target_statuses: set[str], timeout: int = 300, interval: int = 2):
    url = f"{BACKEND_URL}/incidents/{incident_id}"
    waited = 0
    while waited < timeout:
        try:
            resp = requests.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            incident = resp.json()
        except requests.exceptions.RequestException as e:
            print(f"[orchestrate] ERROR fetching incident: {e}")
            time.sleep(interval)
            waited += interval
            continue

        status = incident.get("status")  # ADJUST if main.py wraps the response
        print(f"[orchestrate] incident {incident_id} status = {status}")
        if status in target_statuses:
            return incident
        time.sleep(interval)
        waited += interval

    print(f"[orchestrate] timed out after {timeout}s waiting for status in {target_statuses}")
    return None


def main():
    parser = argparse.ArgumentParser(description="Run the full Aegis demo pipeline end-to-end.")
    parser.add_argument("--failure", choices=list(FAILURE_TYPES.keys()), default="loop")
    parser.add_argument(
        "--auto-approve",
        action="store_true",
        help="Skip waiting for a human dashboard click; POST the approve decision automatically. "
        "Use for rehearsal only, not the live judged demo.",
    )
    args = parser.parse_args()

    print("=== STEP 1: run demo agent with injected failure ===")
    result = demo_agent.run(failure=args.failure)
    if not result or "incident_id" not in result:  # ADJUST if main.py wraps the response
        print(
            "[orchestrate] no top-level 'incident_id' in the /agent/trace response — "
            "check main.py's response shape, or that a failure was actually detected."
        )
        sys.exit(1)
    incident_id = result["incident_id"]
    print(f"[orchestrate] incident created: {incident_id}")

    if args.auto_approve:
        print("=== STEP 2: auto-approving (rehearsal mode, not for judges) ===")
        url = f"{BACKEND_URL}/incidents/{incident_id}/decision"
        try:
            resp = requests.post(url, json={"decision": "approve"}, timeout=REQUEST_TIMEOUT)
            print(f"[orchestrate] POST {url} -> {resp.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"[orchestrate] ERROR posting decision: {e}")
            sys.exit(1)
    else:
        print("=== STEP 2: waiting for a human to Approve/Reject in the dashboard ===")

    incident = poll_incident_status(incident_id, target_statuses={"approved", "rejected"})
    if incident is None:
        sys.exit(1)
    if incident.get("status") == "rejected":
        print("[orchestrate] incident was rejected — stopping (no test pipeline to run).")
        return

    print("=== STEP 3: mock apply-fix + test pipeline ===")
    test_runner.apply_fix_and_test(incident_id)

    print("=== DONE. Check the dashboard and Slack for the final status. ===")


if __name__ == "__main__":
    main()
