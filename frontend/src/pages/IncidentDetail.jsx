import { useEffect, useState } from 'react';
import { getIncident, sendDecision } from '../api/client';

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
      <div className="h-full flex flex-col items-center justify-center text-black/30">
        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <p className="font-bold tracking-tight">Select an event to view telemetry</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!incident) return null;

  const isPending = incident.status === 'notified' || incident.status === 'under_review';

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Header Area */}
      <div className="px-8 pt-5 pb-0 shrink-0">
        <div className="flex justify-between items-start mb-4">
          <div className="font-mono text-xs text-black/50 font-bold truncate max-w-sm" title={incident.incident_id}>{incident.incident_id}</div>
          <div className="flex gap-4 items-center shrink-0">
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              incident.severity.toLowerCase() === 'critical' ? 'bg-red-200 text-red-900' : 
              incident.severity.toLowerCase() === 'high' ? 'bg-orange-200 text-orange-900' : 'bg-green-200 text-green-900'
            }`}>
              <span className="w-1.5 h-1.5 inline-block rounded-full bg-current mr-1.5"></span>
              {incident.severity}
            </div>
            <div className="text-xs text-black/40">2 min ago</div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-black tracking-tight capitalize leading-tight">
          {incident.failure_type.replace(/_/g, ' ')}
        </h1>
        <div className="text-black/60 font-mono text-xs mt-1">{incident.agent_id}</div>

        {/* Tabs */}
        <div className="flex gap-8 text-xs mt-5 border-b border-black/10">
          <div className="font-bold text-black border-b-2 border-black pb-3 cursor-pointer">Overview</div>
          <div className="text-black/50 hover:text-black cursor-pointer pb-3">Trace</div>
          <div className="text-black/50 hover:text-black cursor-pointer pb-3">Proposed Fix</div>
          <div className="text-black/50 hover:text-black cursor-pointer pb-3">Integrations</div>
          <div className="text-black/50 hover:text-black cursor-pointer pb-3">Timeline</div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-12">
          {/* Left Content Column */}
          <div className="flex-1 max-w-2xl">
            
            {/* Root Cause Analysis */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  Root Cause Analysis
                </h3>
                <span className="text-[10px] text-black/40 font-mono">Generated by Aegis</span>
              </div>
              <p className="text-black/80 text-sm leading-relaxed mb-6">
                {incident.root_cause}
              </p>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-black/60 mb-2">
                  <span>Confidence</span>
                  <span>87%</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <div className="w-[87%] h-full bg-[#1a1a1a] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Proposed Solution */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  Proposed Solution
                </h3>
                <span className="text-[10px] text-black/40 font-mono">Generated by Aegis</span>
              </div>
              <p className="text-black/80 text-sm leading-relaxed">
                {incident.suggested_fix.description}
              </p>
            </div>

            {/* Code Diff */}
            {incident.suggested_fix.diff && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold">Code Diff</h3>
                  <button className="flex items-center gap-1.5 text-xs text-black/60 bg-black/5 px-3 py-1 rounded-md hover:bg-black/10 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Copy
                  </button>
                </div>
                <div className="bg-[#2d3331] rounded-xl overflow-hidden p-4 shadow-inner">
                  <pre className="text-[11px] font-mono leading-relaxed">
                    {incident.suggested_fix.diff.split('\n').map((line, i) => {
                      const isAdd = line.startsWith('+');
                      const isSub = line.startsWith('-');
                      const isHeader = line.startsWith('@@');
                      return (
                        <div key={i} className={`flex ${isAdd ? 'bg-emerald-900/30' : isSub ? 'bg-red-900/30' : ''}`}>
                          <div className="w-6 shrink-0 text-white/30 select-none border-r border-white/5 mr-4 text-right pr-2">
                            {i+1}
                          </div>
                          <div className="w-4 shrink-0 text-white/50 select-none">
                            {isAdd ? '+' : isSub ? '-' : ' '}
                          </div>
                          <div className={`whitespace-pre-wrap ${isAdd ? 'text-emerald-400' : isSub ? 'text-red-400' : isHeader ? 'text-indigo-300' : 'text-white/80'}`}>
                            {line.replace(/^[+-]/, '')}
                          </div>
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column */}
          <div className="w-64 shrink-0 flex flex-col gap-6">
            
            {/* Metadata Card */}
            <div className="bg-[#d2ded2] p-5 rounded-xl border border-black/5">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Incident Metadata
              </h3>
              <div className="grid grid-cols-[1fr_1fr] gap-y-3 text-[11px]">
                <div className="text-black/50">Agent ID</div>
                <div className="font-mono truncate" title={incident.agent_id}>{incident.agent_id}</div>
                
                <div className="text-black/50">Trace ID</div>
                <div className="font-mono truncate" title={incident.trace_ref}>{incident.trace_ref}</div>
                
                <div className="text-black/50">Failure Type</div>
                <div className="text-red-800 capitalize">{incident.failure_type.replace(/_/g, ' ')}</div>
                
                <div className="text-black/50">First Seen</div>
                <div className="font-mono">Sep 17, 2024, 14:32</div>
                
                <div className="text-black/50">Duration</div>
                <div className="font-mono">12.4s</div>
                
                <div className="text-black/50">Status</div>
                <div>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] ${
                    incident.status === 'approved' ? 'bg-emerald-200 text-emerald-900' :
                    incident.status === 'rejected' ? 'bg-red-200 text-red-900' :
                    isPending ? 'bg-indigo-200 text-indigo-900' :
                    'bg-black/10 text-black'
                  }`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Authorization Block */}
            {isPending && (
              <div className="bg-[#d2ded2] p-5 rounded-xl border border-black/5">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Authorization Required
                </h3>
                <p className="text-xs text-black/60 mb-4 leading-relaxed">
                  Review the proposed fix and approve to automatically execute the response pipeline.
                </p>
                
                <div className="flex gap-2 mb-6">
                  <button 
                    onClick={() => handleDecision('approve')}
                    disabled={submitting}
                    className="flex-1 bg-[#1a1a1a] text-white py-2 rounded-lg text-xs font-bold hover:bg-black active:scale-95 transition-all disabled:opacity-50"
                  >
                    {submitting ? '...' : 'Approve & Resolve'}
                  </button>
                  <button 
                    onClick={() => handleDecision('reject')}
                    disabled={submitting}
                    className="flex-1 bg-transparent border border-black/20 text-black py-2 rounded-lg text-xs font-bold hover:bg-black/5 active:scale-95 transition-all disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>

                <div className="text-[10px]">
                  <div className="font-bold mb-2">This will trigger:</div>
                  <div className="flex flex-col gap-2 text-black/70">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      Create / update GitHub issue
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1 2.521-2.52A2.528 2.528 0 0 1 13.876 5.042a2.527 2.527 0 0 1-2.521 2.52H8.834v-2.52zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.52h-2.522v-2.52zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.522-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1-2.523 2.522A2.528 2.528 0 0 1 10.12 18.956a2.527 2.527 0 0 1 2.522-2.522h2.523v2.522zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.527 2.527 0 0 1 2.522-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z"/></svg>
                      Send notification to Slack
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 flex items-center justify-center font-bold text-black border border-black rounded-[2px] leading-none">N</span>
                      Log incident in Notion
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Mark as resolved in Aegis
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
      
      {/* Bottom right decorative text */}
      <div className="absolute bottom-6 right-8 text-[9px] font-mono tracking-widest text-black/40">
        DETECT DIAGNOSE RESPOND PREVENT
      </div>
    </div>
  );
}
