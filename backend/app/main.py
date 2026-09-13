from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import uuid

from app.core.schema import (
    AgentTracePayload, 
    DecisionRequest, 
    StatusUpdateRequest,
    Incident,
    IncidentStatus
)
from app.core import monitor, diagnose
from app.db import store

# Try to import Member B's integration function gracefully
try:
    from app.integrations import notify_all, update_notify
    INTEGRATIONS_AVAILABLE = True
except ImportError:
    INTEGRATIONS_AVAILABLE = False
    def notify_all(incident): pass
    def update_notify(incident): pass

app = FastAPI(title="Aegis API")

# Add CORS middleware for frontend development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon demo, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/agent/trace")
def receive_trace(trace: AgentTracePayload):
    # 1. Monitor the trace
    detection = monitor.detect(trace)
    
    if not detection:
        return {"status": "ok", "message": "Trace healthy, no incidents detected"}
        
    # 2. Diagnose the failure
    diagnosis = diagnose.diagnose(detection, trace)
    
    # 3. Create Incident
    new_incident = Incident(
        incident_id=str(uuid.uuid4()),
        timestamp=datetime.now(timezone.utc).isoformat(),
        agent_id=trace.agent_id or "demo-agent",
        failure_type=detection.failure_type,
        severity=diagnosis.severity,
        root_cause=diagnosis.root_cause,
        suggested_fix=diagnosis.suggested_fix,
        status=IncidentStatus.created,
        trace_ref=trace.trace_ref or "trace-001"
    )
    
    # 4. Save to db
    saved = store.save_incident(new_incident)
    
    # 5. Notify integrations
    if INTEGRATIONS_AVAILABLE:
        try:
            notify_all(saved)
            # If notifications succeed, update status
            store.update_status(saved.incident_id, IncidentStatus.notified)
            saved.status = IncidentStatus.notified
        except Exception as e:
            print(f"Integration failure: {e}")
            
    return saved

@app.get("/incidents")
def list_incidents():
    return store.get_all()

@app.get("/incidents/{incident_id}")
def get_incident(incident_id: str):
    inc = store.get_incident(incident_id)
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    return inc

@app.post("/incidents/{incident_id}/decision")
def make_decision(incident_id: str, decision_req: DecisionRequest):
    inc = store.get_incident(incident_id)
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
        
    if decision_req.decision.value == "approve":
        # For demo purposes, we automatically walk through the resolution steps
        new_status = IncidentStatus.approved
    else:
        new_status = IncidentStatus.rejected
        
    updated = store.update_status(incident_id, new_status)
    
    if INTEGRATIONS_AVAILABLE:
        try:
            update_notify(updated)
        except Exception as e:
            print(f"Integration failure: {e}")
            
    return updated

@app.patch("/incidents/{incident_id}/status")
def patch_status(incident_id: str, status_req: StatusUpdateRequest):
    updated = store.update_status(incident_id, status_req.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Incident not found")
    return updated
