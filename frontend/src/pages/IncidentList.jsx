import { useEffect, useState } from 'react';
import { getIncidents } from '../api/client';
import IncidentCard from '../components/IncidentCard';

export default function IncidentList({ selectedId, onSelect, onViewAll }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTab, setFilterTab] = useState('all');

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

  const counts = {
    all: incidents.length,
    critical: incidents.filter(i => i.severity?.toLowerCase() === 'critical').length,
    high: incidents.filter(i => i.severity?.toLowerCase() === 'high').length,
    medium: incidents.filter(i => i.severity?.toLowerCase() === 'medium').length,
    low: incidents.filter(i => i.severity?.toLowerCase() === 'low').length,
  };

  const filteredIncidents = filterTab === 'all' 
    ? incidents 
    : incidents.filter(i => i.severity?.toLowerCase() === filterTab);

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Header Area */}
      <div className="pb-4 border-b border-black/10 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg text-black tracking-tight">Live Incidents</h2>
            <div className="flex items-center gap-1.5 text-xs text-black/50">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Real-time
            </div>
          </div>
          <div className="text-xs text-black/40">Auto-refreshing (5s)</div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'critical', label: 'Critical' },
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' }
          ].map(tab => (
            <div 
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`cursor-pointer pb-1 transition-colors ${
                filterTab === tab.id 
                  ? 'font-bold text-black border-b border-black' 
                  : 'text-black/50 hover:text-black border-b border-transparent'
              }`}
            >
              {tab.label} ({counts[tab.id]})
            </div>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="p-4 m-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 pb-4 pr-2">
        {filteredIncidents.length === 0 && !error ? (
          <div className="p-12 text-center text-black/40 text-sm font-medium">
            NO {filterTab.toUpperCase()} ANOMALIES DETECTED
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {filteredIncidents.map(incident => (
              <IncidentCard 
                key={incident.incident_id}
                incident={incident}
                isSelected={selectedId === incident.incident_id}
                onClick={() => onSelect(incident.incident_id)}
              />
            ))}
          </div>
        )}
      </div>

      <div 
        onClick={onViewAll}
        className="shrink-0 pt-4 border-t border-black/10 text-center text-xs font-bold text-black cursor-pointer flex justify-center items-center gap-2 hover:opacity-70 transition-opacity"
      >
        View All Incidents &rarr;
      </div>
    </div>
  );
}
