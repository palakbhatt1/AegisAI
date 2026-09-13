import React from 'react';

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


export default function LandingPage({ onLaunch }) {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#c8d4c8] transition-opacity duration-1000 flex items-center justify-center">
      
      {/* Massive Text (Behind Image) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mt-[-20vh] pointer-events-none z-0">
        <h1 className="hero-text text-black">
          Aegis:<br/>reliability for<br/>the agent era
        </h1>
      </div>

      {/* 3D Chrome Thorn Background Image (In Front of Text) */}
      <img 
        src="/chrome_thorn.png" 
        alt="Chrome abstract structure" 
        className="absolute z-10 w-[800px] max-w-[90vw] object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[5vh]"
      />

      {/* Top Navbar */}
      <div className="absolute top-0 left-0 w-full p-8 px-12 flex justify-between items-center pointer-events-none z-20 font-mono text-sm">
        
        {/* Logo */}
        <div className="font-sans font-black tracking-tighter text-3xl">
          Aegis
        </div>
        
        {/* Center Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 tracking-widest text-black/80">
          <span className="cursor-pointer pointer-events-auto border-b border-black pb-1 hover:text-black transition-colors">HOME</span>
          <span className="cursor-pointer pointer-events-auto hover:text-black transition-colors">FEATURES</span>
          <span className="cursor-pointer pointer-events-auto hover:text-black transition-colors">HOW IT WORKS</span>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <span className="cursor-pointer hover:text-black/70 transition-colors flex items-center gap-2 leading-none">
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            Log In
          </span>
          <button onClick={onLaunch} className="px-6 h-9 flex items-center justify-center bg-[#1a1a1a] text-white rounded-full font-sans text-sm hover:bg-black transition-colors leading-none">
            Get Started
          </button>
        </div>
      </div>

      {/* Bottom Center Elements (Subtitle, Button, Icons) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full text-center z-20 pointer-events-auto">
        <p className="font-mono text-sm md:text-base text-black/80 mb-6 tracking-wide">
          Autonomous incident response<br/>for AI agents.
        </p>
        
        <button 
          onClick={onLaunch}
          className="px-10 py-3.5 bg-[#1a1a1a] text-white rounded-full font-mono text-xs font-bold tracking-widest hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg mx-auto block mb-8"
        >
          GET STARTED
        </button>
        
        {/* Integration Icons */}
        <div className="flex justify-center items-center gap-6 text-black">
          <a href="#" className="hover:opacity-70 transition-opacity"><GithubIcon /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><SlackIcon /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><SheetsIcon /></a>
        </div>
      </div>
      
    </div>
  );
}
