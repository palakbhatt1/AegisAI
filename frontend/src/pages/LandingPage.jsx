import React, { useState } from 'react';

// Simple SVG Icons for Integrations
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
);
const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.958a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.52v-2.522h2.523zM15.165 17.687a2.528 2.528 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"></path></svg>
);
const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M4.459 4.208c.746.065 1.543.084 1.83.178.232.073.344.203.385.57.062.535.084 10.37.039 12.015-.028.995-.49 1.34-1.258 1.488-.344.067-1.378.106-2.127.135v1.077c1.776-.11 3.563-.223 5.352-.317 1.87-.098 3.551-.159 5.39-.247v-1.077c-.524-.038-1.572-.07-2.112-.132-.821-.093-1.155-.389-1.127-1.46.046-1.684.094-11.775.094-11.775l7.986 11.238 2.454-2.54V5.412c.006-.827-.376-1.096-1.196-1.218-.684-.102-1.458-.124-2.13-.153V2.946l6.816-.481v1.1c-.812.093-1.699.167-2.077.292-.375.123-.529.351-.541.777-.044 1.353-.131 11.668-.131 11.668.01 1.109-.107 1.408.855 2.378l2.955 2.91V22.6c-1.84.237-3.662.499-5.463.76-.02-.13-.042-.262-.061-.396L8.435 7.15v11.13c-.021 1.05.355 1.365 1.144 1.468.623.08 1.597.109 2.219.141v1.1c-1.801.123-3.618.256-5.421.39-1.802.133-3.633.27-5.42.404v-1.076c.725-.067 1.761-.106 2.128-.136.786-.062 1.153-.33 1.174-1.399.066-2.903.111-8.528.094-12.008-.009-.949-.407-1.255-1.166-1.35-.747-.093-1.697-.133-2.132-.162V4.542l5.404-.334z"></path></svg>
);
const SheetsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M14.667 2H4.667C3.197 2 2 3.197 2 4.667v14.666C2 20.803 3.197 22 4.667 22h14.666c1.47 0 2.667-1.197 2.667-2.667V9.333L14.667 2zm1.333 16h-8v-2h8v2zm0-4h-8v-2h8v2zm-2-5.333V3.533L19.8 8.667h-5.8z"></path></svg>
);

// Feature Card Component (for FEATURES tab)
const FeatureCard = ({ number, icon, title, description, features, footerText }) => (
  <div className="border border-black/10 rounded-2xl p-5 bg-transparent hover:bg-white/10 transition-colors flex flex-col group shadow-sm h-fit">
    <div className="text-[9px] font-mono font-bold tracking-widest text-black/50 mb-3">{number}</div>
    <div className="mb-3 flex flex-col items-start gap-3">
      <div className="text-black w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-base font-bold tracking-tight text-black">{title}</h3>
    </div>
    <p className="text-xs text-black/70 leading-relaxed mb-5 font-mono">
      {description}
    </p>
    <div className="flex gap-3 mb-6">
      <div className="mt-1 text-black/50 text-[10px] font-bold">↘</div>
      <ul className="text-[10px] font-mono text-black/60 space-y-1 list-disc list-inside">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
    <div className="mt-2 text-right text-[9px] font-mono font-bold tracking-widest uppercase text-black/40 group-hover:text-black/80 transition-colors">
      {footerText}
    </div>
  </div>
);

// Process Card Component (for HOW IT WORKS tab)
const ProcessCard = ({ number, icon, title, description, features }) => (
  <div className="flex-1 border border-black/10 rounded-2xl p-5 bg-white/30 backdrop-blur-sm flex flex-col h-full relative shadow-sm hover:shadow-md transition-shadow">
    <div className="text-[10px] font-mono font-bold tracking-widest text-black/50 mb-3">{number}</div>
    <div className="mb-3 flex flex-col items-start gap-3">
      <div className="text-black w-6 h-6 flex items-center justify-center">{icon}</div>
      <h3 className="text-[15px] font-bold tracking-tight text-black">{title}</h3>
    </div>
    <p className="text-[10px] text-black/60 leading-relaxed mb-5 font-mono min-h-[50px]">{description}</p>
    <ul className="text-[10px] font-mono text-black/50 space-y-1.5 list-disc list-inside mt-auto">
      {features.map((f, i) => <li key={i}>{f}</li>)}
    </ul>
  </div>
);

// Arrow separator
const ArrowSeparator = () => (
  <div className="text-black/30 flex items-center justify-center px-1">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  </div>
);

export default function LandingPage({ onLaunch }) {
  const [currentTab, setCurrentTab] = useState('HOME'); // 'HOME', 'FEATURES', or 'HOW IT WORKS');

  return (
    <div className="absolute inset-0 z-50 overflow-y-auto custom-scrollbar bg-[#c8d4c8] transition-opacity duration-1000 flex flex-col">
      
      {/* Top Navbar */}
      <div className="w-full p-4 px-12 flex justify-between items-center z-20 font-mono text-sm relative shrink-0">
        <div 
          onClick={() => setCurrentTab('HOME')}
          className="font-sans font-black tracking-tighter text-3xl z-10 text-black cursor-pointer"
        >
          Aegis
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 tracking-widest text-black/80 z-10">
          <span 
            onClick={() => setCurrentTab('HOME')}
            className={`cursor-pointer pb-1 hover:text-black transition-colors ${currentTab === 'HOME' ? 'border-b border-black' : ''}`}
          >
            HOME
          </span>
          <span 
            onClick={() => setCurrentTab('FEATURES')} 
            className={`cursor-pointer pb-1 hover:text-black transition-colors ${currentTab === 'FEATURES' ? 'border-b border-black' : ''}`}
          >
            FEATURES
          </span>
          <span 
            onClick={() => setCurrentTab('HOW IT WORKS')} 
            className={`cursor-pointer pb-1 hover:text-black transition-colors ${currentTab === 'HOW IT WORKS' ? 'border-b border-black' : ''}`}
          >
            HOW IT WORKS
          </span>
        </div>
        <div className="flex items-center gap-6 z-10">
          <span 
            onClick={onLaunch}
            className="cursor-pointer hover:text-black/70 transition-colors flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span className="mt-[2px] text-black font-bold">Log In</span>
          </span>
          <button onClick={onLaunch} className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-full font-sans text-sm font-bold tracking-wide hover:bg-black transition-colors shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* HOME VIEW */}
      {currentTab === 'HOME' && (
        <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
          {/* Massive Text (Behind Image) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mt-[-25vh] pointer-events-none z-0">
            <h1 className="hero-text text-black">
              Aegis:<br/>reliability for<br/>the agent era
            </h1>
          </div>

          {/* 3D Chrome Thorn Background Image (In Front of Text) */}
          <img 
            src="/chrome_thorn.png" 
            alt="Chrome abstract structure" 
            className="absolute z-10 w-[800px] max-w-[90vw] object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0"
          />

          {/* Bottom Center Elements (Subtitle, Button, Icons) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
            <div className="text-center flex flex-col items-center">
              <p className="font-mono text-sm md:text-base text-black/80 mb-8 tracking-wide">
                Autonomous incident response<br/>for AI agents.
              </p>
              
              <button 
                onClick={onLaunch}
                className="px-10 py-3.5 bg-[#1a1a1a] text-white rounded-full font-mono text-xs font-bold tracking-widest hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg mb-8"
              >
                GET STARTED
              </button>
              
              {/* Integration Icons */}
              <div className="flex justify-center items-center gap-6 text-black">
                <span className="hover:opacity-70 transition-opacity"><GithubIcon /></span>
                <span className="hover:opacity-70 transition-opacity"><SlackIcon /></span>
                <span className="hover:opacity-70 transition-opacity"><SheetsIcon /></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEATURES VIEW */}
      {currentTab === 'FEATURES' && (
        <div className="flex-1 w-full relative flex flex-col">
          {/* Header Area */}
          <div className="px-12 pt-2 pb-6 w-full max-w-[1400px] mx-auto relative shrink-0">
            <div className="text-[10px] font-mono tracking-widest uppercase text-black/50 mb-2">Features</div>
            <h1 className="text-5xl md:text-[4rem] font-black tracking-tighter text-black leading-[0.85] max-w-4xl relative z-10">
              From failures<br/>to fixes.
            </h1>
            <p className="mt-4 text-black/80 font-mono text-xs max-w-lg leading-relaxed relative z-10">
              Everything you need to monitor, diagnose and respond<br/>to AI agent incidents — in one place.
            </p>

            <img 
              src="/chrome_double_prong.png" 
              alt="" 
              className="absolute right-[-50px] top-[-180px] w-[600px] max-w-[50vw] object-contain opacity-90 mix-blend-darken pointer-events-none z-0" 
              style={{ filter: 'grayscale(50%) brightness(1.2)' }}
            />
          </div>

          {/* Grid Area */}
          <div className="px-12 pb-4 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10 flex-1">
            <div className="flex flex-col gap-4">
              <FeatureCard 
                number="01"
                icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                title="Real-Time Telemetry Feed"
                description="Live incident stream from your agents. Automatically updates every few seconds, so you're always in the loop."
                features={["Live polling (5s)", "Severity levels", "Agent ID & failure type", "Status tracking"]}
                footerText="MONITOR"
              />
            </div>

            <div className="flex flex-col gap-4">
              <FeatureCard 
                number="02"
                icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                title="Deep-Dive Diagnostics"
                description="Get a complete breakdown of what went wrong, why it happened, and how to fix it."
                features={["AI-generated root cause analysis", "Execution traces & metadata", "Proposed fixes with code diffs", "Context-rich debugging info"]}
                footerText="DIAGNOSE"
              />
              <FeatureCard 
                number="04"
                icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                title="Seamless Integrations"
                description="Automatically creates GitHub issues, sends Slack notifications, and logs incidents to Notion or Google Sheets."
                features={["GitHub issue creation & closure", "Slack alerts", "Notion / Google Sheets logging", "Customizable workflows"]}
                footerText="INTEGRATE"
              />
            </div>

            <div className="flex flex-col gap-4">
              <FeatureCard 
                number="03"
                icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="Human-in-the-Loop Authorization"
                description="Stay in control. Approve or reject proposed fixes before any action is taken."
                features={["Authorization panel for critical incidents", "Approve / reject with one click", "Triggers automated workflows", "Full audit trail"]}
                footerText="RESPOND"
              />
              <FeatureCard 
                number="05"
                icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                title="Analytics & Insights"
                description="Track incident trends, agent reliability, and resolution times to prevent recurring issues."
                features={["Failure type breakdown", "Resolution time metrics", "Agent performance trends", "Proactive recommendations"]}
                footerText="PREVENT"
              />
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS VIEW */}
      {currentTab === 'HOW IT WORKS' && (
        <div className="flex-1 w-full max-w-[1800px] mx-auto px-12 pb-16 flex flex-col relative">
           
           {/* Header Area */}
           <div className="pt-10 pb-8 flex items-start justify-between relative z-10">
             
             {/* Main Title Area */}
             <div className="flex-1 max-w-4xl">
               <div className="text-[10px] font-mono tracking-widest uppercase text-black/50 mb-4">How it works</div>
               <h1 className="text-5xl md:text-[4.5rem] font-black tracking-tighter text-black leading-[0.85]">
                 From incident<br/>to resolution.
               </h1>
               <p className="mt-6 text-black/70 font-mono text-sm max-w-2xl leading-relaxed">
                 Aegis automatically detects agent failures, analyzes the root cause,<br/>takes action, and keeps your agents running reliably.
               </p>
             </div>

             {/* Right Decorative Text */}
             <div className="text-right text-[9px] font-mono tracking-widest uppercase text-black/60 leading-relaxed hidden xl:block pt-8 pr-12">
               REAL AGENTS<br/>REAL INCIDENTS<br/>REAL RELIABILITY<br/>
               <div className="w-12 h-px bg-black/20 ml-auto mt-4"></div>
             </div>
             
           </div>

           {/* Large abstract loop asset (Top Right) */}
           <img 
             src="/chrome_fluid.png" 
             alt="" 
             className="absolute right-[-100px] top-[-80px] w-[800px] opacity-80 mix-blend-darken pointer-events-none z-0" 
             style={{ filter: 'grayscale(50%) brightness(1.2)' }} 
           />

           {/* Flow Process Cards */}
           <div className="flex items-stretch gap-2 mb-10 relative z-10">
             <ProcessCard 
               number="01" 
               icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
               title="Monitor"
               description="Continuously tracks agent execution traces, tool usage, and behavior in real time."
               features={["Live telemetry", "Anomaly detection", "Multi-agent support"]}
             />
             <ArrowSeparator />
             <ProcessCard 
               number="02" 
               icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
               title="Diagnose"
               description="Analyzes failures using LLMs to identify the root cause, severity, and affected components."
               features={["Root cause analysis", "Failure classification", "Trace inspection"]}
             />
             <ArrowSeparator />
             <ProcessCard 
               number="03" 
               icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
               title="Propose Fix"
               description="Generates actionable fixes with code diffs, configuration changes, or prompt updates."
               features={["AI-generated solutions", "Code diff viewer", "Context-aware suggestions"]}
             />
             <ArrowSeparator />
             <ProcessCard 
               number="04" 
               icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
               title="Take Action"
               description="With human approval, executes the response workflow across your tools."
               features={["Create / close GitHub issues", "Send Slack notifications", "Log in Notion / Google Sheets"]}
             />
             <ArrowSeparator />
             <ProcessCard 
               number="05" 
               icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
               title="Learn & Prevent"
               description="Tracks incident trends and provides insights to prevent recurring issues."
               features={["Reliability analytics", "Pattern detection", "Proactive recommendations"]}
             />
           </div>

           {/* Bottom Footer Area */}
           <div className="mt-12 flex justify-between items-end relative z-10">
             
             {/* Left Spiky Thorn Area */}
             <div className="relative w-[300px] h-[200px]">
                <img 
                  src="/chrome_thorn.png" 
                  alt="" 
                  className="absolute left-[-150px] bottom-[-80px] w-[500px] opacity-80 mix-blend-darken pointer-events-none scale-125" 
                  style={{ filter: 'grayscale(50%) brightness(1.2)' }} 
                />
             </div>
             
             {/* Center Get Started Button */}
             <div className="pb-8">
               <button onClick={onLaunch} className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                  Get Started <span>&rarr;</span>
               </button>
             </div>

             {/* Right Spacer (to keep button centered) */}
             <div className="w-[300px]"></div>
             
           </div>
        </div>
      )}
    </div>
  );
}
