export default function AgentsPage() {
  const mockAgents = [
    { id: 'demo-agent-001', name: 'Demo Workflow Agent', status: 'Healthy', uptime: '99.9%', errors: 3, lastActive: 'Just now' },
    { id: 'support-bot-prod', name: 'Customer Support LLM', status: 'Healthy', uptime: '99.99%', errors: 12, lastActive: '2m ago' },
    { id: 'scraper-bot-v2', name: 'Data Scraper', status: 'Warning', uptime: '98.5%', errors: 45, lastActive: '5m ago' },
    { id: 'code-gen-004', name: 'Internal Code Generator', status: 'Healthy', uptime: '100%', errors: 0, lastActive: '1h ago' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm p-8 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black mb-1">Agent Fleet</h1>
          <p className="text-black/50 text-sm font-medium">Monitor all connected AI agents across your infrastructure</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-black/80 transition-colors">+ Register Agent</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockAgents.map((agent, i) => (
          <div key={i} className="bg-white/40 border border-black/5 rounded-xl p-5 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="font-bold text-black text-sm mb-1">{agent.name}</h3>
                <div className="font-mono text-[10px] text-black/50">{agent.id}</div>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                agent.status === 'Healthy' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-orange-100 text-orange-800 border border-orange-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></span>
                {agent.status}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
              <div>
                <div className="text-[10px] text-black/40 font-bold uppercase tracking-wider mb-1">Uptime</div>
                <div className="font-mono text-sm font-bold text-black/80">{agent.uptime}</div>
              </div>
              <div>
                <div className="text-[10px] text-black/40 font-bold uppercase tracking-wider mb-1">Interventions</div>
                <div className="font-mono text-sm font-bold text-black/80">{agent.errors}</div>
              </div>
              <div>
                <div className="text-[10px] text-black/40 font-bold uppercase tracking-wider mb-1">Last Active</div>
                <div className="text-sm font-bold text-black/80">{agent.lastActive}</div>
              </div>
            </div>
            
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
