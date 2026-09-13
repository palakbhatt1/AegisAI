import { useState } from 'react';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import './index.css'; // Just in case, though usually main.jsx imports it

function App() {
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 flex overflow-hidden font-sans">
      
      {/* Left Sidebar - List View */}
      <div className={`w-full lg:w-1/3 h-full flex-shrink-0 ${selectedIncidentId ? 'hidden lg:block' : 'block'}`}>
        <IncidentList 
          selectedId={selectedIncidentId} 
          onSelect={setSelectedIncidentId} 
        />
      </div>

      {/* Main Content - Detail View */}
      <div className={`flex-1 h-full bg-slate-950 shadow-2xl relative z-10 border-l border-slate-800/50 ${!selectedIncidentId ? 'hidden lg:block' : 'block'}`}>
        <IncidentDetail 
          incidentId={selectedIncidentId}
          onClose={() => setSelectedIncidentId(null)}
        />
      </div>
      
    </div>
  );
}

export default App;
