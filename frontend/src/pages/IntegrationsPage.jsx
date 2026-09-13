import { useState } from 'react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { name: 'Slack', desc: 'Send real-time alerts to a specific channel', connected: true, href: 'https://slack.com', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'GitHub', desc: 'Automatically create and manage issues/PRs', connected: true, href: 'https://github.com/palakbhatt1/AegisAI/issues', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'Google Sheets', desc: 'Log incident metrics for historical analysis', connected: true, href: 'https://docs.google.com/spreadsheets/d/1B6wFJ3OfU4jsbUNYlQokq9sVFTZDdh4Y8f3vLcLVl4s/edit', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM17 18H7v-2h10v2zm0-4H7v-2h10v2zm-3-4H7V8h7v2z' },
    { name: 'Notion', desc: 'Sync incident post-mortems to your wiki', connected: false, href: null, icon: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1 2.521-2.52A2.528 2.528 0 0 1 13.876 5.042a2.527 2.527 0 0 1-2.521 2.52H8.834v-2.52zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.52h-2.522v-2.52zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.522-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1-2.523 2.522A2.528 2.528 0 0 1 10.12 18.956a2.527 2.527 0 0 1 2.522-2.522h2.523v2.522zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.527 2.527 0 0 1 2.522-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z' },
    { name: 'PagerDuty', desc: 'Trigger on-call alerts for critical failures', connected: false, href: null, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { name: 'Datadog', desc: 'Correlate agent failures with infrastructure metrics', connected: false, href: null, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ]);

  const toggleIntegration = (index) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].connected = !newIntegrations[index].connected;
    setIntegrations(newIntegrations);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm p-8 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-black mb-1">Integrations</h1>
        <p className="text-black/50 text-sm font-medium">Connect Aegis to your existing dev tools</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {integrations.map((int, i) => (
          <div key={i} className={`bg-white/40 border rounded-xl p-5 shadow-sm transition-all flex items-start justify-between ${int.connected ? 'border-emerald-500/30 ring-1 ring-emerald-500/10' : 'border-black/5 opacity-70 hover:opacity-100'}`}>
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${int.connected ? 'bg-[#1a1a1a] text-white' : 'bg-black/5 text-black/50'}`}>
                {int.name === 'Notion' ? (
                  <span className="font-bold text-lg leading-none">N</span>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={int.icon}></path></svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-black text-sm mb-1">{int.name}</h3>
                <p className="text-xs text-black/60 leading-relaxed max-w-[200px] mb-3">{int.desc}</p>
                {int.connected && int.href && (
                  <a href={int.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-800 transition-colors bg-emerald-50 px-2 py-1 rounded">
                    Open {int.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => toggleIntegration(i)}
              className={`w-10 h-6 rounded-full relative transition-colors ${int.connected ? 'bg-emerald-500' : 'bg-black/20'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${int.connected ? 'translate-x-4' : ''}`}></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
