import SeverityBadge from './SeverityBadge';

export default function IncidentCard({ incident, isSelected, onClick }) {
  const isPending = incident.status === 'notified' || incident.status === 'under_review';
  
  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-200 border-b border-slate-700/50 hover:bg-slate-800/80 
        ${isSelected ? 'bg-slate-800 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <SeverityBadge severity={incident.severity} />
          <span className="text-sm text-slate-400 font-mono">{incident.incident_id.split('-')[1]}</span>
        </div>
        <span className="text-xs text-slate-500">
          {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <h3 className="text-slate-100 font-medium text-sm mb-1 truncate">
        {incident.failure_type.replace(/_/g, ' ')}
      </h3>
      
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-slate-400 font-mono">Agent: {incident.agent_id}</span>
        
        <span className={`text-xs px-2 py-1 rounded-md capitalize ${
          incident.status === 'approved' ? 'bg-emerald-900/30 text-emerald-400' :
          incident.status === 'rejected' ? 'bg-rose-900/30 text-rose-400' :
          isPending ? 'bg-indigo-900/30 text-indigo-400 animate-pulse' :
          'bg-slate-800 text-slate-400'
        }`}>
          {incident.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
