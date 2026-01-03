
import React, { useState } from 'react';
import { SIMULATION_DATA } from '../constants';

const Simulation: React.FC = () => {
  const [step, setStep] = useState(0);
  const data = SIMULATION_DATA[step];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Visual Flow Map */}
      <div className="relative py-16 px-8 glass rounded-[4rem] border-white/5 bg-black/40 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-50"></div>
        
        <div className="flex justify-between items-center max-w-5xl mx-auto relative z-10">
          {/* Main Connector Track */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-800/50 -translate-y-1/2 rounded-full">
             <div 
               className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-in-out absolute" 
               style={{ 
                 width: '33.33%', 
                 left: data.flow === 'H2V' ? '0%' : data.flow === 'V2S' ? '33.33%' : data.flow === 'S2V' ? '66.66%' : '0%' 
               }}
             >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-ping"></div>
             </div>
          </div>

          {/* Node: Attacker */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${data.flow.startsWith('H') ? 'scale-125' : 'opacity-30 grayscale'}`}>
            <div className="w-20 h-20 rounded-3xl bg-red-600/20 border-2 border-red-500/50 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">💀</div>
            <div className="text-center">
              <span className="block text-[11px] font-black text-red-400 uppercase tracking-widest">Attacker</span>
              <span className="text-[9px] text-gray-600 font-mono">hacker-lab.net</span>
            </div>
          </div>

          {/* Node: Victim */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${data.flow.includes('V') ? 'scale-125' : 'opacity-30 grayscale'}`}>
            <div className="w-24 h-24 rounded-full bg-blue-600/20 border-2 border-blue-400 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(59,130,246,0.3)] relative">
               👤
               {data.flow === 'V2S' && <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-blue-400 animate-pulse text-2xl">⚡</div>}
            </div>
            <div className="text-center">
              <span className="block text-[11px] font-black text-blue-400 uppercase tracking-widest">Victim Browser</span>
              <span className="text-[9px] text-gray-600 font-mono">End User</span>
            </div>
          </div>

          {/* Node: Server */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${data.flow.includes('S') ? 'scale-125' : 'opacity-30 grayscale'}`}>
            <div className="w-20 h-20 rounded-3xl bg-green-600/20 border-2 border-green-500/50 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(34,197,94,0.2)]">🏦</div>
            <div className="text-center">
              <span className="block text-[11px] font-black text-green-400 uppercase tracking-widest">Bank Server</span>
              <span className="text-[9px] text-gray-600 font-mono">trust-bank.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
            {/* Attacker IDE */}
            <div className="glass rounded-[2.5rem] border-red-500/20 flex flex-col overflow-hidden group hover:border-red-500/40 transition-colors">
               <div className="bg-red-500/10 px-8 py-4 border-b border-red-500/10 flex justify-between items-center">
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Attacker Payload IDE</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                  </div>
               </div>
               <div className="flex-1 p-8 mono text-[12px] text-red-200/70 overflow-y-auto bg-black/60 custom-scrollbar">
                 <pre className="whitespace-pre-wrap leading-relaxed">{data.hackerAction}</pre>
               </div>
            </div>

            {/* Victim Browser Environment */}
            <div className="glass rounded-[2.5rem] border-blue-500/20 flex flex-col overflow-hidden group hover:border-blue-500/40 transition-colors">
               <div className="bg-blue-500/10 px-8 py-4 border-b border-blue-500/10 flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Victim Sandbox</span>
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
               </div>
               <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-gray-950/80 space-y-6">
                 <div className="p-8 bg-white/5 rounded-3xl border border-white/10 w-full max-w-[280px] shadow-2xl">
                    <div className="text-3xl mb-4">🎁</div>
                    <p className="text-sm font-bold text-gray-200 leading-relaxed mb-6">{data.victimAction}</p>
                    {step === 0 && (
                      <button className="w-full bg-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/30">
                        Claim Your Prize
                      </button>
                    )}
                 </div>
               </div>
            </div>
          </div>

          {/* Network Packet Analyzer */}
          <div className="glass rounded-[3rem] p-10 border-yellow-500/20 bg-black/60 flex items-center gap-12 group hover:border-yellow-500/40 transition-colors">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-3xl shadow-inner">📡</div>
            <div className="flex-1 grid grid-cols-2 gap-12">
               <div className="space-y-4">
                 <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Traffic Headers</p>
                 <div className="space-y-1.5">
                   {data.requestHeaders ? Object.entries(data.requestHeaders).map(([k, v]) => (
                     <p key={k} className="mono text-[11px] truncate"><span className="text-blue-400 font-bold">{k}:</span> <span className="text-gray-400">{v}</span></p>
                   )) : <p className="italic text-gray-700 text-xs">Awaiting connection...</p>}
                 </div>
               </div>
               <div className="space-y-4 border-r border-white/5 pr-8">
                 <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Server Out</p>
                 <pre className="mono text-[11px] text-green-400 font-bold leading-relaxed">{data.serverResponse}</pre>
               </div>
            </div>
          </div>
        </div>

        {/* Real-time Audit Log */}
        <div className="lg:col-span-4 glass rounded-[3rem] border-white/5 flex flex-col h-[550px] shadow-2xl">
           <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
             <div>
               <span className="text-xs font-black text-gray-300 block">SYSTEM AUDIT</span>
               <span className="text-[8px] text-gray-600 font-mono tracking-widest uppercase">Kernel Mode Active</span>
             </div>
             <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             </div>
           </div>
           <div className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar bg-black/20" dir="rtl">
             {data.logs.map(log => (
               <div key={log.id} className="relative pr-6 before:absolute before:right-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500/50 border-b border-white/5 pb-4 last:border-0">
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mb-2 font-mono" dir="ltr">
                    <span>{log.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      log.source === 'ATTACKER' ? 'bg-red-500/10 text-red-500' :
                      log.source === 'VICTIM' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>{log.source}</span>
                  </div>
                  <p className={`${
                    log.type === 'error' || log.type === 'critical' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' : 'text-gray-300'
                  } text-[12px] font-bold leading-relaxed`}>{log.message}</p>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
        <button 
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="w-full md:w-auto px-12 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all font-black text-sm uppercase tracking-widest"
        >
          ← Previous Phase
        </button>
        <div className="text-[10px] font-black tracking-[0.5em] text-gray-600 uppercase mono">Phase {step + 1} of {SIMULATION_DATA.length}</div>
        <button 
          onClick={() => setStep(s => Math.min(SIMULATION_DATA.length - 1, s + 1))}
          disabled={step === SIMULATION_DATA.length - 1}
          className="w-full md:w-auto px-16 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/30 disabled:opacity-20 transition-all font-black text-sm uppercase tracking-widest"
        >
          Next Phase →
        </button>
      </div>
    </div>
  );
};

export default Simulation;
