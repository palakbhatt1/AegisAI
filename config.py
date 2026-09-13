"""
Shared configuration for /agent scripts.

Reads from a .env file (see .env.example) so BACKEND_URL can be swapped between
localhost, the deployed Render/Railway URL, or an ngrok tunnel without touching code —
see deploy.md's fallback plan.
"""
import os

from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000").rstrip("/")
AGENT_ID = os.getenv("AGENT_ID", "demo-research-agent-01")
REQUEST_TIMEOUT = float(os.getenv("REQUEST_TIMEOUT", "10"))
