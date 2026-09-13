export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#dde5dd] rounded-xl border border-black/5 shadow-sm p-8 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-black mb-1">Settings</h1>
        <p className="text-black/50 text-sm font-medium">Manage your workspace and API keys</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* API Keys Section */}
        <section className="bg-white/40 border border-black/5 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            API Keys
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1">Aegis Public Key</label>
              <div className="flex gap-2">
                <input type="text" readOnly value="pk_live_8f7d9a2c3b4e5f6g" className="flex-1 bg-white border border-black/10 rounded-lg px-3 py-2 text-xs font-mono text-black/80 focus:outline-none" />
                <button className="px-3 py-2 bg-black/5 rounded-lg text-xs font-bold hover:bg-black/10 transition-colors">Copy</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1">Aegis Secret Key</label>
              <div className="flex gap-2">
                <input type="password" readOnly value="sk_live_very_secret_key_123" className="flex-1 bg-white border border-black/10 rounded-lg px-3 py-2 text-xs font-mono text-black/80 focus:outline-none" />
                <button className="px-3 py-2 bg-black/5 rounded-lg text-xs font-bold hover:bg-black/10 transition-colors">Reveal</button>
              </div>
            </div>
            <button className="text-xs font-bold text-red-600 mt-2">Roll API Keys</button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white/40 border border-black/5 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            Auto-Approval Policies
          </h2>
          <p className="text-xs text-black/60 mb-4 leading-relaxed max-w-lg">
            Configure which agents and failure types Aegis is allowed to automatically remediate without requiring human approval on the dashboard.
          </p>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-black/5 rounded-lg bg-white/20 hover:bg-white/40 cursor-pointer transition-colors">
              <input type="checkbox" className="accent-black w-4 h-4" defaultChecked />
              <div className="flex-1">
                <div className="text-xs font-bold">Safe Modes</div>
                <div className="text-[10px] text-black/50">Auto-approve formatting, rate limits, and minor hallucinations</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-black/5 rounded-lg bg-white/20 hover:bg-white/40 cursor-pointer transition-colors">
              <input type="checkbox" className="accent-black w-4 h-4" />
              <div className="flex-1">
                <div className="text-xs font-bold">Production Workflows</div>
                <div className="text-[10px] text-black/50">Auto-approve non-destructive code changes</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-black/5 rounded-lg bg-white/20 hover:bg-white/40 cursor-pointer transition-colors opacity-50">
              <input type="checkbox" className="accent-black w-4 h-4" disabled />
              <div className="flex-1">
                <div className="text-xs font-bold">Destructive Actions (Disabled by Admin)</div>
                <div className="text-[10px] text-black/50">Auto-approve database drops and irreversible API calls</div>
              </div>
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold hover:bg-black/5 transition-colors">Cancel</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-black/80 transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
