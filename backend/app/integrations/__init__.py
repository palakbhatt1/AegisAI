"""Integrations module."""
import os
import requests

# Member B built this as a Next.js API route in the frontend.
# We will POST to it.

FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

def notify_all(incident):
    try:
        payload = {"action": "create", "incident": incident.model_dump()}
        requests.post(f"{FRONTEND_URL}/api/notify", json=payload, timeout=5)
    except Exception as e:
        print(f"Failed to call notify API: {e}")

def update_notify(incident):
    try:
        payload = {"action": "update", "incident": incident.model_dump()}
        requests.post(f"{FRONTEND_URL}/api/notify", json=payload, timeout=5)
    except Exception as e:
        print(f"Failed to call notify API: {e}")
