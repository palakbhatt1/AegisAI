import { useEffect, useState } from 'react';
import { getIncidents } from '../api/client';
import IncidentCard from '../components/IncidentCard';

export default function IncidentList({ selectedId, onSelect }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load incidents. Retrying...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    // Poll every 5 seconds for new incidents
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/50 border-r border-slate-700/50">
      <div className="p-4 border-b border-slate-700/50 bg-slate-900 sticky top-0 z-10 flex justify-between items-center">
        <h2 className="font-semibold text-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Active Incidents
        </h2>
        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full font-medium">
          {incidents.length}
        </span>
      </div>
      
      {error && (
        <div className="p-3 m-4 bg-rose-900/30 border border-rose-800/50 rounded-lg text-rose-300 text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {incidents.length === 0 && !error ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No incidents detected. All systems nominal.
          </div>
        ) : (
          incidents.map(incident => (
            <IncidentCard 
              key={incident.incident_id}
              incident={incident}
              isSelected={selectedId === incident.incident_id}
              onClick={() => onSelect(incident.incident_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
