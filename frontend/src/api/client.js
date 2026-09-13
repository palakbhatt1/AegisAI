import { fixtures } from './fixtures';

// In-memory store for optimistic updates during local dev before backend is ready
let localIncidents = [...fixtures];

// The backend URL will be set at the 2:30 checkpoint via Vercel env vars
// For local development it will fallback to localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Toggle this to false once the backend is ready (around 1:00 target)
const USE_MOCKS = true;

export async function getIncidents() {
  if (USE_MOCKS) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...localIncidents].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  const response = await fetch(`${API_BASE_URL}/incidents`);
  if (!response.ok) throw new Error('Failed to fetch incidents');
  return response.json();
}

export async function getIncident(id) {
  if (USE_MOCKS) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const incident = localIncidents.find(inc => inc.incident_id === id);
    if (!incident) throw new Error('Incident not found');
    return incident;
  }

  const response = await fetch(`${API_BASE_URL}/incidents/${id}`);
  if (!response.ok) throw new Error('Failed to fetch incident');
  return response.json();
}

export async function sendDecision(id, decision) {
  if (USE_MOCKS) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = localIncidents.findIndex(inc => inc.incident_id === id);
    if (index !== -1) {
      localIncidents[index] = { 
        ...localIncidents[index], 
        status: decision === 'approve' ? 'approved' : 'rejected' 
      };
      return localIncidents[index];
    }
    throw new Error('Incident not found');
  }

  const response = await fetch(`${API_BASE_URL}/incidents/${id}/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision })
  });
  if (!response.ok) throw new Error('Failed to submit decision');
  return response.json();
}
