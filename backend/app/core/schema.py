from enum import Enum
from typing import Optional, List, Any
from pydantic import BaseModel, Field

class FailureType(str, Enum):
    incorrect_tool_usage = "incorrect_tool_usage"
    instruction_violation = "instruction_violation"
    hallucination = "hallucination"
    task_incomplete = "task_incomplete"
    execution_loop = "execution_loop"

class Severity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class IncidentStatus(str, Enum):
    created = "created"
    notified = "notified"
    under_review = "under_review"
    approved = "approved"
    rejected = "rejected"
    applied = "applied"
    tested = "tested"
    resolved = "resolved"

class DecisionType(str, Enum):
    approve = "approve"
    reject = "reject"

class SuggestedFix(BaseModel):
    description: str
    diff: Optional[str] = None
    target_file: Optional[str] = None

class Incident(BaseModel):
    incident_id: str
    timestamp: str
    agent_id: str
    failure_type: FailureType
    severity: Severity
    root_cause: str
    suggested_fix: SuggestedFix
    status: IncidentStatus
    trace_ref: Optional[str] = None

# API Payload Models
class TraceStep(BaseModel):
    tool: Optional[str] = None
    input: Any = None
    output: Any = None
    error: Optional[str] = None

class AgentTracePayload(BaseModel):
    agent_id: Optional[str] = "demo-agent"
    steps: List[TraceStep]
    trace_ref: Optional[str] = None
    metadata: Optional[dict] = None

class DecisionRequest(BaseModel):
    decision: DecisionType

class StatusUpdateRequest(BaseModel):
    status: IncidentStatus

class FailureDetectionResult(BaseModel):
    failure_type: FailureType
    severity: Severity
    offending_step_index: Optional[int] = None
    context: Optional[str] = None

class DiagnosisResult(BaseModel):
    root_cause: str
    suggested_fix: SuggestedFix
    severity: Severity  # May be adjusted by diagnosis
