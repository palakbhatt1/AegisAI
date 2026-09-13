import { useState } from 'react';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import LandingPage from './pages/LandingPage';
import './index.css';

function App() {
  const [activeView, setActiveView] = useState('landing');
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  return (
    <div className="h-screen w-screen relative flex overflow-hidden">
      
      {/* Background with abstract shapes/gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-sky-100 to-emerald-100 opacity-60"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/30 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-300/30 blur-3xl mix-blend-multiply"></div>

      {/* Hero Typography Background (Chromaflux style) */}
      {activeView === 'dashboard' && !selectedIncidentId && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10">
          <h1 className="hero-text text-center break-words w-full text-black">
            AEGIS<br/>INCIDENT<br/>RESPONSE
          </h1>
        </div>
      )}

      {/* Landing Page */}
      {activeView === 'landing' && (
        <LandingPage onLaunch={() => setActiveView('dashboard')} />
      )}

      {/* Main UI Container */}
      <div className={`z-10 flex w-full h-full p-4 lg:p-8 gap-6 transition-all duration-1000 ${activeView === 'landing' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        
        {/* Left Sidebar - List View */}
        <div className={`w-full lg:w-[400px] xl:w-[450px] h-full flex-shrink-0 transition-all duration-500 ease-in-out ${selectedIncidentId ? 'hidden lg:block' : 'block mx-auto max-w-2xl lg:mx-0'}`}>
          <div className="glass-card h-full overflow-hidden flex flex-col border border-white/60">
            <IncidentList 
              selectedId={selectedIncidentId} 
              onSelect={setSelectedIncidentId} 
            />
          </div>
        </div>

        {/* Main Content - Detail View */}
        <div className={`flex-1 h-full transition-all duration-500 ease-in-out ${!selectedIncidentId ? 'hidden lg:flex opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="glass-card h-full w-full overflow-hidden border border-white/60">
            <IncidentDetail 
              incidentId={selectedIncidentId}
              onClose={() => setSelectedIncidentId(null)}
            />
          </div>
        </div>
        
      </div>

      {/* Top Nav for Dashboard */}
      {activeView === 'dashboard' && (
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-20">
          <div className="font-bold tracking-tighter text-xl cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity" onClick={() => setActiveView('landing')}>
            AEGIS
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span>Dashboard</span>
            <span className="hidden sm:inline">Analytics</span>
            <span className="hidden sm:inline">Settings</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
