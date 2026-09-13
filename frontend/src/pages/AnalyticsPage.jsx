export default function AnalyticsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm p-8 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-black mb-1">Analytics & Insights</h1>
        <p className="text-black/50 text-sm font-medium">System-wide AI reliability metrics</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/40 border border-black/5 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-2">Total Interventions</div>
          <div className="text-3xl font-black text-black">1,492</div>
          <div className="text-xs text-emerald-600 font-bold mt-2">↓ 12% from last week</div>
        </div>
        <div className="bg-white/40 border border-black/5 rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-2">Mean Time to Resolve (MTTR)</div>
          <div className="text-3xl font-black text-black font-mono">1.2m</div>
          <div className="text-xs text-emerald-600 font-bold mt-2">↓ 45% using Aegis</div>
        </div>
        <div className="bg-[#1a1a1a] border border-black rounded-xl p-5 shadow-sm text-white relative overflow-hidden">
          <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 relative z-10">System Reliability</div>
          <div className="text-3xl font-black text-white relative z-10">99.98%</div>
          <div className="text-xs text-white/70 font-bold mt-2 relative z-10">Across all connected agents</div>
          
          <div className="absolute right-0 bottom-0 opacity-10 w-32 h-32 translate-x-4 translate-y-4 rounded-full border-[20px] border-emerald-400"></div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mock Chart 1 */}
        <div className="bg-white/40 border border-black/5 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-6">Failure Types Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Hallucination</span>
                <span className="font-mono text-black/50">45%</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Incorrect Tool Usage</span>
                <span className="font-mono text-black/50">30%</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-indigo-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Task Incomplete</span>
                <span className="font-mono text-black/50">15%</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="w-[15%] h-full bg-emerald-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>API Rate Limit</span>
                <span className="font-mono text-black/50">10%</span>
              </div>
              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="w-[10%] h-full bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Chart 2 */}
        <div className="bg-white/40 border border-black/5 rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="font-bold text-sm mb-6">Incidents Over Time</h3>
          <div className="flex-1 flex items-end gap-2 mt-auto pb-2 h-32">
            {[30, 45, 20, 60, 40, 80, 50, 30, 25, 45, 60, 90, 40, 20].map((h, i) => (
              <div key={i} className="flex-1 bg-black/10 rounded-t-sm hover:bg-black/30 transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {h}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-black/40 mt-2 border-t border-black/5 pt-2">
            <span>Sep 1</span>
            <span>Sep 7</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
