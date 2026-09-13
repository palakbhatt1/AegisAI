// d:\AegisAI\frontend\src\api\fixtures.js
export const fixtures = [
  {
    incident_id: "inc-5f8a9d2b-11c3",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    agent_id: "agent-alpha-01",
    failure_type: "instruction_violation",
    severity: "high",
    root_cause: "Agent bypassed the validation check when writing to the database due to an ambiguous prompt in the subtask.",
    suggested_fix: {
      description: "Update the agent's system prompt to enforce strict schema validation before any DB writes, and patch the database handler to reject unvalidated payloads.",
      diff: "--- a/app/core/db_handler.py\n+++ b/app/core/db_handler.py\n@@ -12,4 +12,6 @@\n def write_record(payload):\n+    if not validate_schema(payload):\n+        raise ValueError('Invalid payload schema')\n     db.insert(payload)",
      target_file: "app/core/db_handler.py"
    },
    status: "notified",
    trace_ref: "trace-99482abc"
  },
  {
    incident_id: "inc-9b2c1f4e-88d1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    agent_id: "agent-beta-02",
    failure_type: "execution_loop",
    severity: "critical",
    root_cause: "Agent repeatedly called the `search_web` tool with the exact same query after failing to parse the result, exhausting rate limits.",
    suggested_fix: {
      description: "Implement a backoff-and-abort mechanism in the tool caller to prevent more than 3 identical sequential calls.",
      diff: "--- a/agent/tool_caller.py\n+++ b/agent/tool_caller.py\n@@ -45,2 +45,5 @@\n def execute_tool(tool_name, args):\n+    if is_repetitive(tool_name, args):\n+        return abort_task('Execution loop detected')\n     return run(tool_name, args)",
      target_file: "agent/tool_caller.py"
    },
    status: "under_review",
    trace_ref: "trace-55110def"
  },
  {
    incident_id: "inc-1a3b5c7d-44e2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    agent_id: "agent-gamma-03",
    failure_type: "incorrect_tool_usage",
    severity: "medium",
    root_cause: "Agent attempted to use the `read_file` tool on a directory path.",
    suggested_fix: {
      description: "Update tool description to clarify it only works on files, and add directory check in the tool implementation.",
      diff: null,
      target_file: "agent/tools/fs.py"
    },
    status: "approved",
    trace_ref: "trace-11223ghi"
  }
];
