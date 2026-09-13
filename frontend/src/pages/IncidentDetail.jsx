import { useEffect, useState } from 'react';
import { getIncident, sendDecision } from '../api/client';
import SeverityBadge from '../components/SeverityBadge';
import DecisionButtons from '../components/DecisionButtons';

export default function IncidentDetail({ incidentId, onClose }) {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!incidentId) return;
    
    let isMounted = true;
    setLoading(true);
    
    getIncident(incidentId)
      .then(data => {
        if (isMounted) {
          setIncident(data);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) setError('Failed to load incident details');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [incidentId]);

  const handleDecision = async (decision) => {
    setSubmitting(true);
    try {
      const updated = await sendDecision(incidentId, decision);
      setIncident(updated);
    } catch (err) {
      setError('Failed to submit decision');
    } finally {
      setSubmitting(false);
    }
  };

  if (!incidentId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white/30">
        <svg width="64" height="64" className="w-16 h-16 text-black/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <p className="font-bold tracking-tight">Select an event to view telemetry</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white/30">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!incident) return null;

  const isPending = incident.status === 'notified' || incident.status === 'under_review';

  return (
    <div className="h-full flex flex-col overflow-y-auto p-6 lg:p-12 custom-scrollbar bg-white/60">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SeverityBadge severity={incident.severity} />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{incident.incident_id}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-black tracking-tighter leading-none capitalize">
              {incident.failure_type.replace(/_/g, ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Status</div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest
                ${incident.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                  incident.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  isPending ? 'bg-indigo-100 text-indigo-800 animate-pulse' :
                  'bg-white text-black border border-black/10'}
              `}>
                {incident.status.replace('_', ' ')}
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-black hover:bg-black/5 rounded-full transition-colors lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/50 border border-black/5 rounded-2xl p-6">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Agent Target</div>
            <div className="font-mono font-bold text-black text-lg">{incident.agent_id}</div>
          </div>
          <div className="bg-white/50 border border-black/5 rounded-2xl p-6">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Timestamp</div>
            <div className="font-bold text-black text-lg">{new Date(incident.timestamp).toLocaleTimeString()}</div>
          </div>
          <div className="bg-white/50 border border-black/5 rounded-2xl p-6">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Trace Ref</div>
            <div className="font-mono font-bold text-black text-lg truncate" title={incident.trace_ref}>{incident.trace_ref}</div>
          </div>
        </div>

        {/* Diagnosis & Root Cause */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            Root Cause Analysis
          </h3>
          <p className="text-black text-xl lg:text-2xl font-medium leading-tight tracking-tight">
            {incident.root_cause}
          </p>
        </div>

        {/* Suggested Fix */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Proposed Solution
          </h3>
          <div className="mb-6 text-black text-lg font-medium">
            {incident.suggested_fix.description}
          </div>
          
          {incident.suggested_fix.target_file && (
            <div className="mb-4 inline-block px-4 py-2 bg-black text-white text-xs font-mono font-bold rounded-lg shadow-lg">
              {incident.suggested_fix.target_file}
            </div>
          )}

          {incident.suggested_fix.diff && (
            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-2xl">
              <div className="bg-slate-100 px-6 py-3 text-xs text-slate-500 font-bold uppercase tracking-widest border-b border-black/5">
                Diff View
              </div>
              <pre className="bg-white p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                {incident.suggested_fix.diff.split('\n').map((line, i) => {
                  if (line.startsWith('+')) return <div key={i} className="text-emerald-700 bg-emerald-50 px-2 -mx-2">{line}</div>;
                  if (line.startsWith('-')) return <div key={i} className="text-red-700 bg-red-50 px-2 -mx-2">{line}</div>;
                  if (line.startsWith('@@')) return <div key={i} className="text-indigo-500 my-2 font-bold">{line}</div>;
                  return <div key={i} className="text-slate-600 px-2 -mx-2">{line}</div>;
                })}
              </pre>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isPending && (
          <DecisionButtons 
            onApprove={() => handleDecision('approve')}
            onReject={() => handleDecision('reject')}
            isSubmitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
