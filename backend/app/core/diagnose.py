import os
from typing import Optional
from app.core.schema import AgentTracePayload, FailureDetectionResult, DiagnosisResult, SuggestedFix, FailureType

def diagnose(detection: FailureDetectionResult, trace: AgentTracePayload) -> DiagnosisResult:
    """
    Given a detected failure and the trace, generates a root cause and a suggested fix.
    For the hackathon demo, we use deterministic, high-quality templates for each failure type.
    """
    
    root_cause = ""
    description = ""
    diff = None
    target_file = None
    
    step_info = ""
    if detection.offending_step_index is not None and detection.offending_step_index < len(trace.steps):
        step = trace.steps[detection.offending_step_index]
        tool_name = step.tool or "unknown"
        step_info = f"at step {detection.offending_step_index + 1} when calling '{tool_name}'."
    
    if detection.failure_type == FailureType.execution_loop:
        root_cause = f"The agent entered an infinite execution loop {step_info} It repeatedly made identical calls without making progress towards the goal."
        description = "Break the loop by injecting a circuit breaker or explicit 'stop' condition in the agent's prompt. Require the agent to try a different approach if the same tool+input combination is called more than twice."
        target_file = "agent/demo_agent.py"
        diff = """@@ -15,4 +15,6 @@
 def call_tool(tool_name, tool_input):
+    if (tool_name, tool_input) in history and history.count((tool_name, tool_input)) >= 2:
+        return "Error: You are repeating the same action. Try a different strategy."
     return execute(tool_name, tool_input)"""

    elif detection.failure_type == FailureType.incorrect_tool_usage:
        root_cause = f"The agent provided incorrect arguments or violated the tool schema {step_info} The error was: {detection.context}"
        description = "Update the agent's system prompt with strict JSON schema definitions for tools, and add an automated retry loop that feeds the error back to the LLM for correction."
        target_file = "agent/demo_agent.py"
        diff = """@@ -30,2 +30,5 @@
 def run_agent(task):
-    response = llm.generate(task)
+    response = llm.generate(task, strict_schema=True)
+    if "schema_error" in response:
+        response = llm.generate(f"Correct this error: {response['schema_error']}")"""

    elif detection.failure_type == FailureType.instruction_violation:
        root_cause = f"The agent attempted an unsafe or disallowed operation {step_info} Details: {detection.context}"
        description = "Implement an explicit allowlist for parameters and commands. The agent's access must be restricted to a safe sandbox."
        target_file = "agent/demo_agent.py"
        diff = """@@ -10,3 +10,5 @@
 def run_command(cmd):
+    if not cmd.startswith("safe_tool "):
+        raise ValueError("Command execution blocked by security policy.")
     os.system(cmd)"""

    elif detection.failure_type == FailureType.hallucination:
        root_cause = f"The agent hallucinated a tool or API endpoint that does not exist {step_info} Details: {detection.context}"
        description = "The agent is guessing tool names. Constrain its generation by explicitly passing the list of `available_tools` in the context window and using structural enforcement."
        target_file = "agent/demo_agent.py"
        diff = """@@ -40,3 +40,5 @@
 def prepare_prompt():
-    return "You are an assistant."
+    return f"You are an assistant. ONLY use the following tools: {AVAILABLE_TOOLS}"
 """

    elif detection.failure_type == FailureType.task_incomplete:
        root_cause = f"The agent stopped execution prematurely without fulfilling the task goal. {detection.context}"
        description = "Ensure the agent is instructed to always output a 'final_answer' tool. If it reaches the maximum iteration limit, increase the step budget."
        target_file = "agent/demo_agent.py"
        diff = """@@ -50,3 +50,3 @@
-MAX_ITERATIONS = 5
+MAX_ITERATIONS = 15
 def loop():
     for i in range(MAX_ITERATIONS):"""

    else:
        root_cause = f"An unknown failure occurred {step_info}"
        description = "Review the agent logs manually."

    return DiagnosisResult(
        root_cause=root_cause,
        suggested_fix=SuggestedFix(
            description=description,
            diff=diff,
            target_file=target_file
        ),
        severity=detection.severity
    )
