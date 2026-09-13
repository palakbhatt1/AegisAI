import json
import os
import threading
from typing import List, Optional
from app.core.schema import Incident, IncidentStatus

# Use a relative path from the project root or backend dir
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")
DB_FILE = os.path.join(DATA_DIR, "incidents.json")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# In-memory cache for speed during demo
_cache: dict[str, dict] = {}
_lock = threading.Lock()

def _load_db():
    global _cache
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                _cache = json.load(f)
        except json.JSONDecodeError:
            _cache = {}
    else:
        _cache = {}

def _save_db():
    with open(DB_FILE, "w") as f:
        json.dump(_cache, f, indent=2)

# Load initially
with _lock:
    _load_db()

def save_incident(incident: Incident) -> Incident:
    with _lock:
        _cache[incident.incident_id] = incident.model_dump()
        _save_db()
    return incident

def get_incident(incident_id: str) -> Optional[Incident]:
    with _lock:
        data = _cache.get(incident_id)
        if data:
            return Incident(**data)
        return None

def get_all() -> List[Incident]:
    with _lock:
        # Sort newest first by parsing timestamp
        incidents = [Incident(**data) for data in _cache.values()]
        incidents.sort(key=lambda x: x.timestamp, reverse=True)
        return incidents

def update_status(incident_id: str, status: IncidentStatus) -> Optional[Incident]:
    with _lock:
        if incident_id in _cache:
            _cache[incident_id]["status"] = status.value
            _save_db()
            return Incident(**_cache[incident_id])
        return None
