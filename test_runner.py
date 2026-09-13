"""
test_runner.py

Mock "apply fix + run tests" step, per backend.md: on approve, flip status
through applied -> tested -> resolved (or -> tested and stop, if the mock run
"fails") using PATCH /incidents/{id}/status.

This intentionally does NOT run a real test suite or apply a real diff — for a
4-hour build that's out of scope. It pretends to, on a short delay, so the demo
has a believable pause between "Approve" and "Resolved".

Usage:
    python test_runner.py <incident_id>
    python test_runner.py <incident_id> --fail-probability 0.3   # occasionally show a failed run
    python test_runner.py <incident_id> --delay 0.5              # shorter pause for rehearsal

Assumption (flag to Member A): PATCH /incidents/{id}/status expects a JSON body
of {"status": "<new_status>"}. If main.py expects a different shape, update
_patch_status() below — it's the only place that matters.
"""
import argparse
import random
import time

import requests

from config import BACKEND_URL, REQUEST_TIMEOUT


def _patch_status(incident_id: str, status: str) -> bool:
    url = f"{BACKEND_URL}/incidents/{incident_id}/status"
    try:
        resp = requests.patch(url, json={"status": status}, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        print(f"[test_runner] PATCH {url} -> {resp.status_code} (status={status})")
        return True
    except requests.exceptions.RequestException as e:
        print(f"[test_runner] ERROR patching status to '{status}': {e}")
        return False


def apply_fix_and_test(incident_id: str, fail_probability: float = 0.0, delay: float = 1.5) -> bool:
    """Returns True if the mock test run 'passed' and the incident reached resolved."""
    print(f"[test_runner] applying fix for incident {incident_id}...")
    if not _patch_status(incident_id, "applied"):
        return False

    print(f"[test_runner] running mock test suite (sleeping {delay}s)...")
    time.sleep(delay)

    passed = random.random() >= fail_probability
    print(f"[test_runner] mock tests {'PASSED' if passed else 'FAILED'}")
    if not _patch_status(incident_id, "tested"):
        return False

    if passed:
        if _patch_status(incident_id, "resolved"):
            print(f"[test_runner] incident {incident_id} marked resolved")
    else:
        print(f"[test_runner] incident {incident_id} left at 'tested' (mock failure) — needs human follow-up")

    return passed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Mock apply-fix + test pipeline for an approved incident.")
    parser.add_argument("incident_id", help="The incident_id to run the mock pipeline for.")
    parser.add_argument(
        "--fail-probability",
        type=float,
        default=0.0,
        help="Chance the mock test run fails, 0.0-1.0. Default 0 = always passes (safest for the live demo).",
    )
    parser.add_argument("--delay", type=float, default=1.5, help="Seconds to sleep to simulate test execution.")
    args = parser.parse_args()
    apply_fix_and_test(args.incident_id, fail_probability=args.fail_probability, delay=args.delay)
