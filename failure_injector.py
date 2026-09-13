"""
failure_injector.py

Deliberately mutates a clean agent trace into one of the failure shapes Aegis is
supposed to detect. Verified against the ACTUAL `backend/app/core/monitor.py` in
the pushed repo (AegisAI-main.zip), not just the original spec docs — the real
detection rules differ from backend.md/member-a.md in two ways worth flagging:

  - execution_loop needs the SAME tool called with the SAME input 3+ times in a
    row (not just the same tool). inject_execution_loop() matches this exactly.
  - task_incomplete triggers only when the trace's LAST step has both no `tool`
    and no `output` — dropping the final step isn't enough on its own, since
    whatever step becomes "last" still has real tool/output values. Fixed below
    by appending an empty stand-in step after the drop.

Two more failure types turned out to have real detection rules in monitor.py
that weren't mentioned in the original spec docs, so injectors for those are
included too:
  - instruction_violation -> tool is write_file/run_command with a
    forbidden-looking input ("/etc/" or "rm -rf")
  - hallucination -> tool name starts with "unknown_"

All 5 of the schema's failure_type values are now covered.

Each function takes a clean trace dict (matching the schema's
`{"agent_id": ..., "steps": [...]}` shape) and returns a new, mutated trace.
Traces are never mutated in place, so the same clean trace can be reused for
multiple failure scenarios in one process.
"""
import copy


def inject_execution_loop(trace: dict, tool_name: str | None = None, repeat: int = 3) -> dict:
    """Insert `repeat` consecutive calls to the same tool WITH THE SAME INPUT
    -> execution_loop. monitor.py tracks (tool, input) pairs, so the input has
    to match too, not just the tool name."""
    trace = copy.deepcopy(trace)
    steps = trace["steps"]
    tool_name = tool_name or steps[0]["tool"]
    loop_step = {"tool": tool_name, "input": "retry", "output": "no new result", "error": None}
    insert_at = 1  # after the first real step, so it reads as "got stuck retrying"
    trace["steps"] = steps[:insert_at] + [dict(loop_step) for _ in range(repeat)] + steps[insert_at:]
    return trace


def inject_incorrect_tool_usage(
    trace: dict,
    step_index: int = 1,
    error_message: str = "TypeError: invalid argument 'url' - expected str, got NoneType",
) -> dict:
    """Set a non-null `error` field on one step -> incorrect_tool_usage."""
    trace = copy.deepcopy(trace)
    idx = min(step_index, len(trace["steps"]) - 1)
    trace["steps"][idx]["error"] = error_message
    trace["steps"][idx]["output"] = None
    return trace


def inject_task_incomplete(trace: dict) -> dict:
    """Drop the final step, then append an empty stand-in step (no tool, no
    output) representing the run getting cut off mid-action -> task_incomplete.
    monitor.py only checks the trace's actual last step, so a plain truncation
    doesn't trigger this unless the new last step happens to be empty too."""
    trace = copy.deepcopy(trace)
    trace["steps"] = trace["steps"][:-1]
    trace["steps"].append({"tool": None, "input": None, "output": None, "error": None})
    return trace


def inject_instruction_violation(trace: dict, step_index: int = 1) -> dict:
    """Insert a step that calls run_command/write_file with a forbidden-looking
    argument -> instruction_violation."""
    trace = copy.deepcopy(trace)
    violation_step = {
        "tool": "run_command",
        "input": "rm -rf /var/data/reports",
        "output": None,
        "error": None,
    }
    idx = min(step_index, len(trace["steps"]))
    trace["steps"].insert(idx, violation_step)
    return trace


def inject_hallucination(trace: dict, step_index: int = 1) -> dict:
    """Insert a step calling a tool name the agent made up -> hallucination.
    monitor.py flags any tool starting with 'unknown_'."""
    trace = copy.deepcopy(trace)
    hallucination_step = {
        "tool": "unknown_internal_database_lookup",
        "input": "customer records",
        "output": None,
        "error": None,
    }
    idx = min(step_index, len(trace["steps"]))
    trace["steps"].insert(idx, hallucination_step)
    return trace


# Registry used by demo_agent.py's --failure flag and orchestrate_demo.py.
# Keep these string keys short and demo-friendly (typed on stage during a live run).
FAILURE_TYPES = {
    "loop": inject_execution_loop,
    "tool_error": inject_incorrect_tool_usage,
    "incomplete": inject_task_incomplete,
    "violation": inject_instruction_violation,
    "hallucination": inject_hallucination,
}
