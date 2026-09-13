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
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <svg width="64" height="64" className="w-16 h-16 text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <p>Select an incident from the list to view details</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!incident) return null;

  const isPending = incident.status === 'notified' || incident.status === 'under_review';

  return (
    <div className="h-full flex flex-col overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <SeverityBadge severity={incident.severity} />
              <span className="text-sm font-mono text-slate-400">{incident.incident_id}</span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-100 capitalize">
              {incident.failure_type.replace(/_/g, ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">Status</div>
              <div className={`px-3 py-1 rounded-md text-sm font-medium capitalize inline-block
                ${incident.status === 'approved' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50' : 
                  incident.status === 'rejected' ? 'bg-rose-900/40 text-rose-400 border border-rose-800/50' :
                  isPending ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-800/50 animate-pulse' :
                  'bg-slate-800 text-slate-300 border border-slate-700'}
              `}>
                {incident.status.replace('_', ' ')}
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-900/30 border border-rose-800/50 rounded-lg text-rose-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="glass-card p-4">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Agent ID</div>
            <div className="font-mono text-slate-200">{incident.agent_id}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Time Detected</div>
            <div className="text-slate-200">{new Date(incident.timestamp).toLocaleString()}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Trace Ref</div>
            <div className="font-mono text-slate-200 text-sm truncate" title={incident.trace_ref}>{incident.trace_ref}</div>
          </div>
        </div>

        {/* Diagnosis & Root Cause */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-lg font-medium text-slate-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Root Cause Analysis
          </h3>
          <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            {incident.root_cause}
          </p>
        </div>

        {/* Suggested Fix */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-lg font-medium text-slate-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            Suggested Fix
          </h3>
          <div className="mb-4 text-slate-300">
            {incident.suggested_fix.description}
          </div>
          
          {incident.suggested_fix.target_file && (
            <div className="mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mr-2">Target File:</span>
              <span className="font-mono text-sm px-2 py-1 bg-slate-900 rounded text-indigo-300">
                {incident.suggested_fix.target_file}
              </span>
            </div>
          )}

          {incident.suggested_fix.diff && (
            <div className="mt-4 rounded-lg overflow-hidden border border-slate-700">
              <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700 flex justify-between">
                <span>Proposed Changes (Diff)</span>
              </div>
              <pre className="bg-slate-900 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                {incident.suggested_fix.diff.split('\n').map((line, i) => {
                  if (line.startsWith('+')) return <div key={i} className="text-emerald-400 bg-emerald-900/20 px-2 -mx-2">{line}</div>;
                  if (line.startsWith('-')) return <div key={i} className="text-rose-400 bg-rose-900/20 px-2 -mx-2">{line}</div>;
                  if (line.startsWith('@@')) return <div key={i} className="text-indigo-400 my-1">{line}</div>;
                  return <div key={i} className="text-slate-300 px-2 -mx-2">{line}</div>;
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
