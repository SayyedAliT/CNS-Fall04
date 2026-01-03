
import React, { useState } from 'react';
import { SIMULATION_DATA } from '../constants';

const Simulation: React.FC = () => {
  const [step, setStep] = useState(0);
  const data = SIMULATION_DATA[step];

  return (
    <div className="space-y-10">
      {/* Visual Flow Indicator */}
      <div className="relative py-12 px-4 glass rounded-[3rem] border-white/5 bg-white/[0.02]">
        <div className="flex justify-between items-center max-w-4xl mx-auto relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
             <div className={`h-full bg-blue-500 transition-all duration-1000 ${
               data.flow === 'H2V' ? 'w-1/3 left-0' :
               data.flow === 'V2S' ? 'w-1/3 left-1/3' :
               data.flow === 'S2V' ? 'w-1/3 left-2/3' : 'w-0'
             } absolute`} />
          </div>

          <div className={`z-10 flex flex-col items-center gap-3 transition-transform ${data.flow.startsWith('H') ? 'scale-125' : 'opacity-40'}`}>
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">👤</div>
            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Attacker</span>
          </div>

          <div className={`z-10 flex flex-col items-center gap-3 transition-all duration-500 ${data.flow.includes('V') ? 'scale-125' : 'opacity-40'}`}>
            <div className="w-20 h-20 rounded-full bg-blue-600 border-2 border-blue-400 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
               💻
               {data.flow === 'V2S' && <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-bounce">➡️</div>}
            </div>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Victim</span>
          </div>

          <div className={`z-10 flex flex-col items-center gap-3 transition-transform ${data.flow.includes('S') ? 'scale-125' : 'opacity-40'}`}>
            <div className="w-16 h-16 rounded-2xl bg-green-600/20 border border-green-500/50 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">🏦</div>
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Bank Server</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Consoles */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            <div className="glass rounded-[2rem] border-red-500/20 flex flex-col overflow-hidden">
               <div className="bg-red-500/10 px-6 py-2 border-b border-red-500/10 text-[10px] font-bold text-red-400 uppercase tracking-widest">Attacker Console</div>
               <div className="flex-1 p-6 mono text-[11px] text-red-200/60 overflow-y-auto bg-black/40">
                 <pre>{data.hackerAction}</pre>
               </div>
            </div>
            <div className="glass rounded-[2rem] border-blue-500/20 flex flex-col overflow-hidden">
               <div className="bg-blue-500/10 px-6 py-2 border-b border-blue-500/10 text-[10px] font-bold text-blue-400 uppercase tracking-widest">Victim Browser</div>
               <div className="flex-1 p-6 flex items-center justify-center text-center bg-gray-900/60">
                 <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-300">{data.victimAction}</p>
                    {step === 0 && <button className="bg-blue-600 px-6 py-2 rounded-lg text-xs font-black hover:bg-blue-500 transition-all">CLICK HERE!</button>}
                 </div>
               </div>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 border-yellow-500/20 bg-black/40 h-40 flex items-center gap-8 overflow-hidden">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">📡</div>
            <div className="flex-1 grid grid-cols-2 gap-8 overflow-hidden">
               <div className="text-[10px] space-y-1">
                 <p className="text-gray-500 font-black mb-2">HTTP HEADERS</p>
                 {data.requestHeaders ? Object.entries(data.requestHeaders).map(([k, v]) => (
                   <p key={k} className="mono truncate"><span className="text-blue-400">{k}:</span> {v}</p>
                 )) : <p className="italic text-gray-700">Idle...</p>}
               </div>
               <div className="text-[10px] space-y-1 border-r border-white/5 pr-4">
                 <p className="text-gray-500 font-black mb-2">SERVER RESPONSE</p>
                 <pre className="mono text-green-400/80">{data.serverResponse}</pre>
               </div>
            </div>
          </div>
        </div>

        {/* Real-time Logs */}
        <div className="lg:col-span-4 glass rounded-[2.5rem] border-white/5 flex flex-col h-[500px]">
           <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
             <span className="text-xs font-black text-gray-400">NETWORK TRAFFIC LOG</span>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
             </div>
           </div>
           <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
             {data.logs.map(log => (
               <div key={log.id} className="text-[11px] space-y-1 border-b border-white/5 pb-3 last:border-0">
                  <div className="flex justify-between text-gray-600 font-mono">
                    <span className={`px-1.5 rounded ${
                      log.source === 'ATTACKER' ? 'bg-red-500/10 text-red-500' :
                      log.source === 'VICTIM' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>{log.source}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className={`${
                    log.type === 'error' || log.type === 'critical' ? 'text-red-300' :
                    log.type === 'success' ? 'text-green-300' : 'text-gray-300'
                  } font-semibold`}>{log.message}</p>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <button 
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all font-bold text-sm"
        >
          ← Previous
        </button>
        <div className="text-xs font-black tracking-widest text-gray-500 uppercase">Phase {step + 1} / {SIMULATION_DATA.length}</div>
        <button 
          onClick={() => setStep(s => Math.min(SIMULATION_DATA.length - 1, s + 1))}
          disabled={step === SIMULATION_DATA.length - 1}
          className="px-10 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 disabled:opacity-20 transition-all font-black text-sm"
        >
          Next Phase →
        </button>
      </div>
    </div>
  );
};

export default Simulation;
