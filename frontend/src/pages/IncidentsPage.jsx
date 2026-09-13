export default function IncidentsPage() {
  const mockIncidents = [
    { id: 'INC-7829', agent: 'demo-agent-001', type: 'Incorrect Tool Usage', severity: 'High', status: 'Resolved', time: '10 mins ago' },
    { id: 'INC-7828', agent: 'demo-agent-001', type: 'Task Incomplete', severity: 'Medium', status: 'Approved', time: '1 hr ago' },
    { id: 'INC-7827', agent: 'demo-agent-001', type: 'Hallucination Detected', severity: 'High', status: 'Resolved', time: '2 hrs ago' },
    { id: 'INC-7826', agent: 'scraper-bot-prod', type: 'API Rate Limit', severity: 'Medium', status: 'Resolved', time: '5 hrs ago' },
    { id: 'INC-7825', agent: 'support-agent-v2', type: 'Data Leak Risk', severity: 'Critical', status: 'Under Review', time: '1 day ago' },
    { id: 'INC-7824', agent: 'demo-agent-001', type: 'Incorrect Tool Usage', severity: 'High', status: 'Resolved', time: '2 days ago' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm p-8 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black mb-1">Incident History</h1>
          <p className="text-black/50 text-sm font-medium">Complete audit log of all agent interventions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/50 border border-black/10 rounded-lg text-xs font-bold text-black/70 hover:bg-white/80 transition-colors">Filter</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-black/80 transition-colors">Export CSV</button>
        </div>
      </div>

      <div className="bg-white/40 border border-black/5 rounded-xl overflow-hidden shadow-inner">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/5 text-[10px] uppercase tracking-wider text-black/40 font-bold bg-white/20">
              <th className="p-4">Incident ID</th>
              <th className="p-4">Agent</th>
              <th className="p-4">Failure Type</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium">
            {mockIncidents.map((inc, i) => (
              <tr key={i} className="border-b border-black/5 hover:bg-white/40 transition-colors cursor-pointer group">
                <td className="p-4 font-mono text-black/70 group-hover:text-black">{inc.id}</td>
                <td className="p-4 font-mono text-black/70">{inc.agent}</td>
                <td className="p-4 text-black/90 font-bold">{inc.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    inc.severity === 'Critical' ? 'bg-red-200 text-red-900' :
                    inc.severity === 'High' ? 'bg-orange-200 text-orange-900' :
                    'bg-indigo-200 text-indigo-900'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    inc.status === 'Resolved' ? 'bg-emerald-100 border-emerald-200 text-emerald-800' :
                    inc.status === 'Approved' ? 'bg-blue-100 border-blue-200 text-blue-800' :
                    'bg-yellow-100 border-yellow-200 text-yellow-800'
                  }`}>
                    {inc.status}
                  </span>
                </td>
                <td className="p-4 text-right text-black/40">{inc.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
