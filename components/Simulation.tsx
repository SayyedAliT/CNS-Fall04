
import React, { useState } from 'react';
import { SIMULATION_DATA } from '../constants';

const Simulation: React.FC = () => {
  const [step, setStep] = useState(0);
  const data = SIMULATION_DATA[step];

  return (
    <div className="space-y-6 animate-in fade-in duration-1000">
      {/* Header with Progress */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
        <div className="text-right" dir="rtl">
          <h3 className="text-3xl font-black text-white glow-text mb-2">{data.phase}</h3>
          <p className="text-gray-400 max-w-xl">{data.description}</p>
        </div>
        <div className="flex gap-2">
          {SIMULATION_DATA.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-12 bg-blue-500 shadow-lg shadow-blue-500/50' : 'w-4 bg-gray-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Terminals */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
             {/* Attacker */}
             <div className="glass rounded-2xl overflow-hidden flex flex-col border-red-500/20">
                <div className="bg-red-500/10 px-4 py-2 border-b border-red-500/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="mono text-[10px] text-red-400 font-bold uppercase tracking-wider">Hacker Command Center</span>
                </div>
                <div className="flex-1 p-4 mono text-xs text-red-200/70 bg-black/60 overflow-y-auto custom-scrollbar">
                  <pre className="whitespace-pre-wrap">{data.hackerAction}</pre>
                </div>
             </div>

             {/* Victim */}
             <div className="glass rounded-2xl overflow-hidden flex flex-col border-blue-500/20">
                <div className="bg-blue-500/10 px-4 py-2 border-b border-blue-500/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="mono text-[10px] text-blue-400 font-bold uppercase tracking-wider">Victim Browser Environment</span>
                </div>
                <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-900/60">
                  <div className="w-full max-w-[220px] p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center space-y-4">
                    <p className="text-xs font-bold text-gray-300">{data.victimAction}</p>
                    {step === 0 && <div className="h-10 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-blue-500 transition-colors">CLICK FOR PRIZE</div>}
                  </div>
                </div>
             </div>
          </div>

          {/* Request/Response Monitor */}
          <div className="glass rounded-2xl overflow-hidden border-yellow-500/20 h-44 flex flex-col">
             <div className="bg-yellow-500/10 px-4 py-2 border-b border-yellow-500/20">
                <span className="mono text-[10px] text-yellow-400 font-bold uppercase">Network Inspector (HTTP Packets)</span>
             </div>
             <div className="flex-1 p-4 grid grid-cols-2 gap-4 bg-black/40 overflow-hidden">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Request Headers</p>
                  {data.requestHeaders ? Object.entries(data.requestHeaders).map(([k, v]) => (
                    <p key={k} className="mono text-[10px] truncate"><span className="text-blue-400">{k}:</span> {v}</p>
                  )) : <p className="text-[10px] italic text-gray-600">Waiting for request...</p>}
                </div>
                <div className="space-y-1 border-r border-white/5 pr-4">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Server Response</p>
                  <pre className="mono text-[10px] text-green-400/80 leading-tight">{data.serverResponse}</pre>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Logs */}
        <div className="lg:col-span-4 glass rounded-2xl overflow-hidden border-white/5 flex flex-col h-full min-h-[500px]">
           <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400">Security Audit Logs</span>
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
           </div>
           <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar bg-black/20">
              {data.logs.map((log) => (
                <div key={log.id} className="text-[10px] border-b border-white/5 pb-2 last:border-0">
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>{log.source}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className={`${
                    log.type === 'error' || log.type === 'critical' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' : 'text-blue-300'
                  } font-medium`}>{log.message}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between pt-4">
        <button 
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all disabled:opacity-20"
          disabled={step === 0}
        >
          Previous Phase
        </button>
        <button 
          onClick={() => setStep(s => Math.min(SIMULATION_DATA.length - 1, s + 1))}
          className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 transition-all disabled:opacity-20"
          disabled={step === SIMULATION_DATA.length - 1}
        >
          Next Phase
        </button>
      </div>
    </div>
  );
};

export default Simulation;
