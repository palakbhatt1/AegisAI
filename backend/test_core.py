import sys
import os
import json

# Ensure app is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.core.schema import AgentTracePayload, TraceStep
from app.core.monitor import detect
from app.core.diagnose import diagnose
from app.db import store
from app.core.schema import Incident

def run_tests():
    print("Testing Trace Detection...")
    
    # 1. Test Incomplete trace
    t1 = AgentTracePayload(
        agent_id="test-agent",
        steps=[]
    )
    d1 = detect(t1)
    assert d1 is not None and d1.failure_type.value == "task_incomplete", "Failed incomplete trace test"
    
    # 2. Test Execution Loop
    t2 = AgentTracePayload(
        agent_id="test-agent",
        steps=[
            TraceStep(tool="search", input="test", output="result1"),
            TraceStep(tool="search", input="test", output="result2"),
            TraceStep(tool="search", input="test", output="result3")
        ]
    )
    d2 = detect(t2)
    assert d2 is not None and d2.failure_type.value == "execution_loop", "Failed loop detection test"
    
    diag2 = diagnose(d2, t2)
    assert diag2.root_cause != "", "Diagnosis root cause should not be empty"
    
    print("All detection & diagnosis tests passed.")
    
    print("Testing DB Store...")
    new_incident = Incident(
        incident_id="1234-abcd",
        timestamp="2026-10-10T00:00:00Z",
        agent_id="test-agent",
        failure_type=d2.failure_type,
        severity=diag2.severity,
        root_cause=diag2.root_cause,
        suggested_fix=diag2.suggested_fix,
        status="created"
    )
    saved = store.save_incident(new_incident)
    fetched = store.get_incident("1234-abcd")
    assert fetched.incident_id == "1234-abcd", "DB fetch failed"
    
    print("All DB tests passed.")

if __name__ == "__main__":
    run_tests()
