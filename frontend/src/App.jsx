import { useState } from 'react';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import LandingPage from './pages/LandingPage';
import './index.css';

// SVG Icons for the sidebar
const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>;
const IconIncidents = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>;
const IconAgents = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
const IconAnalytics = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>;
const IconIntegrations = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;

function App() {
  const [activeView, setActiveView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  if (activeView === 'landing') {
    return <LandingPage onLaunch={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="h-screen w-screen flex bg-[#c8d4c8] overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[240px] flex flex-col p-6 border-r border-black/10 shrink-0 relative">
        <div className="mb-12">
          <h1 
            onClick={() => setActiveView('landing')}
            className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-70 transition-opacity"
          >
            Aegis
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {['Dashboard', 'Incidents', 'Agents', 'Analytics', 'Integrations', 'Settings'].map(tab => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'Dashboard' && <IconDashboard />}
              {tab === 'Incidents' && <IconIncidents />}
              {tab === 'Agents' && <IconAgents />}
              {tab === 'Analytics' && <IconAnalytics />}
              {tab === 'Integrations' && <IconIntegrations />}
              {tab === 'Settings' && <IconSettings />}
              {tab}
            </div>
          ))}
        </nav>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none">
          <img src="/chrome_thorn.png" alt="" className="w-[120%] max-w-none opacity-80 object-contain mix-blend-darken translate-y-8 scale-x-125" style={{ filter: 'grayscale(50%) brightness(1.2)' }} />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search incidents, agents, traces..." className="w-full bg-[#dde5dd] border border-black/10 rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-black/20" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-black/40 font-mono bg-black/5 px-2 py-0.5 rounded">/</div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-black/60 hover:text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">P</div>
              <div className="text-xs">
                <div className="font-bold">Palak</div>
                <div className="text-black/50">Engineering Team</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Title Area */}
        <div className="px-8 pt-0 pb-4 shrink-0 relative -mt-2">
          <h2 className="text-4xl lg:text-[3.5rem] font-black tracking-tighter leading-[0.85] text-black w-3/4">
            Agents<br/>run the world.<br/>We keep them on track.
          </h2>
          <div className="mt-8 font-mono text-[11px] font-bold tracking-widest text-black/70 flex items-center gap-4">
            <span>MONITOR</span> &rarr; <span>DIAGNOSE</span> &rarr; <span>RESPOND</span> &rarr; <span>PREVENT</span>
          </div>
          
          {/* Top Right text */}
          <div className="absolute top-36 right-12 text-right font-mono text-[9px] uppercase tracking-widest text-black/80 leading-relaxed z-20">
            REAL AGENTS<br/>REAL WORKFLOWS<br/>REAL RELIABILITY
          </div>

          {/* Large Chrome abstract on the right */}
          <img src="/chrome_fluid.png" alt="" className="absolute right-[-150px] top-[-50px] w-[800px] opacity-90 pointer-events-none object-contain mix-blend-darken z-0" style={{ filter: 'grayscale(50%) brightness(1.2)' }} />
        </div>

        {/* Split Views Area */}
        {activeTab === 'Dashboard' ? (
          <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6">
            {/* Left Column - List */}
            <div className="w-1/3 min-w-[320px] max-w-[400px] flex flex-col h-full bg-[#c8d4c8] relative z-10">
              <IncidentList 
                selectedId={selectedIncidentId} 
                onSelect={setSelectedIncidentId}
                onViewAll={() => setActiveTab('Incidents')}
              />
            </div>

            {/* Right Column - Detail */}
            <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm">
              <IncidentDetail 
                incidentId={selectedIncidentId}
                onClose={() => setSelectedIncidentId(null)}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center pb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-black/10 tracking-tighter uppercase">
              {activeTab} <br/> MODULE <br/> COMING SOON
            </h2>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
