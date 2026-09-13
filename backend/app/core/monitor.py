from typing import Optional, Any
from app.core.schema import AgentTracePayload, FailureDetectionResult, FailureType, Severity

def detect(trace: AgentTracePayload) -> Optional[FailureDetectionResult]:
    """
    Analyzes the agent trace to detect failures.
    Returns the first failure detected based on a rule-based approach,
    or None if the trace appears healthy.
    """
    steps = trace.steps
    if not steps:
        # A trace with no steps is considered incomplete/broken
        return FailureDetectionResult(
            failure_type=FailureType.task_incomplete,
            severity=Severity.medium,
            offending_step_index=0,
            context="Trace contains no steps."
        )

    # Variables for execution loop detection
    loop_threshold = 3
    recent_tools = []
    
    for i, step in enumerate(steps):
        # 1. Check for incorrect_tool_usage (tool threw an error)
        if step.error is not None and str(step.error).strip():
            return FailureDetectionResult(
                failure_type=FailureType.incorrect_tool_usage,
                severity=Severity.high,
                offending_step_index=i,
                context=f"Tool '{step.tool}' returned an error: {step.error}"
            )
            
        # 2. Check for execution_loop
        # Simple loop detection: same tool with same input called consecutively
        if step.tool:
            # We track (tool, input) to detect identical repeated actions
            # Convert input to string for simple comparison if it's a dict
            input_repr = str(step.input)
            
            if recent_tools and recent_tools[-1] == (step.tool, input_repr):
                recent_tools.append((step.tool, input_repr))
            else:
                recent_tools = [(step.tool, input_repr)]
                
            if len(recent_tools) >= loop_threshold:
                return FailureDetectionResult(
                    failure_type=FailureType.execution_loop,
                    severity=Severity.high,
                    offending_step_index=i,
                    context=f"Agent called tool '{step.tool}' with identical inputs {loop_threshold} times in a row."
                )

        # 3. Check for instruction_violation (simple heuristic: trying to write to forbidden paths etc)
        # For hackathon demo, let's say modifying anything in /etc or /root is a violation
        if step.tool in ("write_file", "run_command") and step.input:
            input_str = str(step.input).lower()
            if "/etc/" in input_str or "rm -rf" in input_str:
                return FailureDetectionResult(
                    failure_type=FailureType.instruction_violation,
                    severity=Severity.critical,
                    offending_step_index=i,
                    context="Agent attempted a destructive or forbidden operation."
                )

        # 4. Check for hallucination
        # E.g. calling a tool that doesn't exist. We assume standard tools are known.
        # For demo, if tool name starts with 'fake_' or 'unknown_', trigger it.
        if step.tool and step.tool.startswith("unknown_"):
            return FailureDetectionResult(
                failure_type=FailureType.hallucination,
                severity=Severity.medium,
                offending_step_index=i,
                context=f"Agent attempted to call a non-existent tool: {step.tool}"
            )

    # 5. Check for task_incomplete
    # If the last step doesn't seem like a final answer/finish step, and trace abruptly ends.
    # We will assume if the last step's tool isn't "finish" or "final_answer", it's incomplete.
    # But only if it's explicitly missing it. For the demo, we might trigger this if step count is odd and no tool.
    last_step = steps[-1]
    if not last_step.tool and not last_step.output:
        return FailureDetectionResult(
            failure_type=FailureType.task_incomplete,
            severity=Severity.medium,
            offending_step_index=len(steps)-1,
            context="The trace ended abruptly without a final action or output."
        )

    # No failure detected
    return None
