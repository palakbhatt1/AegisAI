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
      setError('Failed to load incidents. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white/40">
      <div className="p-6 border-b border-black/10 bg-white/50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <h2 className="font-bold text-xl text-black tracking-tight flex items-center gap-2">
          Active Events
        </h2>
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-bold">
          {incidents.length}
        </span>
      </div>
      
      {error && (
        <div className="p-4 m-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {incidents.length === 0 && !error ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            NO ANOMALIES DETECTED
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
