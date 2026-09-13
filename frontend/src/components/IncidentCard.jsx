import SeverityBadge from './SeverityBadge';

export default function IncidentCard({ incident, isSelected, onClick }) {
  const isPending = incident.status === 'notified' || incident.status === 'under_review';
  
  return (
    <div 
      onClick={onClick}
      className={`p-5 cursor-pointer transition-all duration-300 border-b border-black/5 hover:bg-white/40 
        ${isSelected ? 'bg-white/60 shadow-inner' : 'bg-transparent'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <SeverityBadge severity={incident.severity} />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{incident.incident_id.split('-')[1]}</span>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <h3 className="text-black font-bold text-lg mb-2 truncate capitalize tracking-tight">
        {incident.failure_type.replace(/_/g, ' ')}
      </h3>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-black/5 px-2 py-1 rounded">Agent: {incident.agent_id}</span>
        
        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest ${
          incident.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
          incident.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
          isPending ? 'bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse' :
          'bg-slate-100 text-slate-800 border border-slate-200'
        }`}>
          {incident.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
