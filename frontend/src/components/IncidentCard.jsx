import SeverityBadge from './SeverityBadge';

export default function IncidentCard({ incident, isSelected, onClick }) {
  
  const getSeverityColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-emerald-500';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'under_review': return 'bg-red-100 text-red-800';
      case 'notified': return 'bg-orange-100 text-orange-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-black/5 text-black';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer flex items-center justify-between transition-all duration-200
        ${isSelected 
          ? 'bg-black/5 border border-black/20 rounded-xl shadow-sm' 
          : 'border-b border-black/10 border-transparent hover:bg-black/5 rounded-xl'}`}
    >
      <div className="flex gap-4 items-start">
        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${getSeverityColor(incident.severity)}`}></div>
        <div>
          <div className="font-bold text-black text-sm tracking-tight capitalize">{incident.failure_type.replace(/_/g, ' ')}</div>
          <div className="text-xs text-black/50 mt-0.5">{incident.agent_id}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-xs text-black/40 hidden xl:block">
          {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide whitespace-nowrap ${getStatusStyle(incident.status)}`}>
          {incident.status.replace('_', ' ')}
        </div>
        <svg className={`w-4 h-4 text-black/20 group-hover:text-black/50 transition-colors ${isSelected ? 'text-black/50' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </div>
    </div>
  );
}
