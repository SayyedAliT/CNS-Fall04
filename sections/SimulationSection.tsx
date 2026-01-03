
import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Shield, RefreshCw, Eye, User, Server, Globe, Search, AlertCircle, ShieldAlert, CheckCircle, Filter } from 'lucide-react';

type Phase = 'IDLE' | 'ATTACK_PREP' | 'VICTIM_LURE' | 'DATA_STEAL' | 'FORGERY_EXEC' | 'ANALYSIS';
type LogType = 'info' | 'warn' | 'success' | 'err';

const SimulationSection: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('IDLE');
  const [isDefenseOn, setIsDefenseOn] = useState(false);
  const [logs, setLogs] = useState<{msg: string, type: LogType}[]>([]);
  const [logFilter, setLogFilter] = useState<'all' | LogType>('all');
  const [userInput, setUserInput] = useState("");
  const [capturedKeys, setCapturedKeys] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: LogType = 'info') => {
    setLogs(prev => [...prev, { msg, type }].slice(-25)); // Increased buffer for better filtering
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, logFilter]);

  // Real-time tracking for the "Attacker POV"
  useEffect(() => {
    if (phase === 'DATA_STEAL' && userInput.length > 0) {
      setCapturedKeys(prev => {
        const last = prev[prev.length - 1];
        if (userInput.startsWith(last || "")) return [...prev.slice(0, -1), userInput];
        return [...prev, userInput];
      });
    }
  }, [userInput, phase]);

  const handleNext = () => {
    switch (phase) {
      case 'IDLE':
        setPhase('ATTACK_PREP');
        addLog('ATTACKER: Initializing C2 server at "attacker-lab.io"', 'warn');
        addLog('ATTACKER: Hosting hidden CSRF payload (auto-submit POST)', 'info');
        break;
      case 'ATTACK_PREP':
        setPhase('VICTIM_LURE');
        addLog('VICTIM: Browsing regular sites...', 'info');
        addLog('VICTIM: Clicked a phishing link / visited compromised "news-site.com"', 'warn');
        break;
      case 'VICTIM_LURE':
        setPhase('DATA_STEAL');
        addLog('SYSTEM: Malicious script loded in victim browser background', 'warn');
        addLog('ATTACKER: Keylogger/Activity tracker active on current tab', 'err');
        break;
      case 'DATA_STEAL':
        setPhase('FORGERY_EXEC');
        addLog('VICTIM: Initiating sensitive transaction on bank.com', 'info');
        addLog('BROWSER: Found valid cookies for domain "bank.com"', 'success');
        addLog('ATTACKER: Forging cross-origin POST request via hidden iframe', 'err');
        break;
      case 'FORGERY_EXEC':
        setPhase('ANALYSIS');
        addLog('SERVER: Incoming POST request received', 'info');
        if (isDefenseOn) {
          addLog('DEFENSE: Origin Header detected: "attacker-lab.io"', 'warn');
          addLog('DEFENSE: Mismatch with server domain "bank.com"', 'err');
          addLog('RESULT: Request REJECTED (403 Forbidden)', 'success');
        } else {
          addLog('DEFENSE: No Origin Header found (or ignored)', 'warn');
          addLog('RESULT: Request ACCEPTED using ambient cookies', 'err');
          addLog('IMPACT: Funds transferred / Account hijacked', 'err');
        }
        break;
      case 'ANALYSIS':
        setPhase('IDLE');
        setLogs([]);
        setUserInput("");
        setCapturedKeys([]);
        setLogFilter('all');
        break;
    }
  };

  const filteredLogs = logFilter === 'all' ? logs : logs.filter(l => l.type === logFilter);

  const getPhaseDescription = () => {
    switch(phase) {
      case 'IDLE': return "آماده‌سازی سناریو: حمله را شروع کنید تا زیرساخت مهاجم لود شود.";
      case 'ATTACK_PREP': return "گام ۱: مهاجم در حال آماده‌سازی یک صفحه وب حاوی فرم‌های مخفی و اسکریپت‌های مخرب است.";
      case 'VICTIM_LURE': return "گام ۲: قربانی فریب خورده و وارد سایت مهاجم می‌شود. در اینجا اسکریپت‌ها لود می‌شوند.";
      case 'DATA_STEAL': return "گام ۳ (تعاملی): در باکس جستجوی پایین چیزی تایپ کنید. ببینید مهاجم چگونه به صورت آنی اطلاعات شما را در کنسول خود دریافت می‌کند!";
      case 'FORGERY_EXEC': return "گام ۴: حمله نهایی CSRF. مرورگر ناخواسته درخواستی را به همراه کوکی‌های بانکی قربانی به سمت سرور اصلی شلیک می‌کند.";
      case 'ANALYSIS': return isDefenseOn ? "نتیجه نهایی: هدر Origin با تشخیص منشأ غیرمجاز، مانع از اجرای دستور شد. امنیت برقرار است." : "نتیجه نهایی: به دلیل نبود هدر Origin، سرور فریب خورد و عملیات مهاجم را تایید کرد. فاجعه رخ داد!";
      default: return "";
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 glass-panel p-8 rounded-3xl border-b-4 border-blue-500/20">
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-white tracking-tight">CSRF Attack & Origin Defense Lab</h3>
          <p className="text-sm text-blue-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            LIVE SIMULATION: CROSS-ORIGIN REQUEST TRACKING
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full lg:w-auto">
          <button 
            onClick={() => setIsDefenseOn(!isDefenseOn)}
            className={`group px-8 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest ${
              isDefenseOn ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isDefenseOn ? <Shield className="animate-bounce" size={18} /> : <ShieldAlert size={18} />}
            Origin Defense: {isDefenseOn ? 'ACTIVE' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Persian Subtitle / Step Indicator */}
      <div className="bg-blue-600/10 border border-blue-500/30 p-5 rounded-2xl flex items-center gap-4 transition-all hover:bg-blue-600/20">
        <div className="p-3 bg-blue-600/20 rounded-full text-blue-400 shadow-inner">
          <AlertCircle size={24} />
        </div>
        <div>
          <p className="text-xs text-blue-400 font-bold uppercase mb-1">توضیحات مرحله فعلی</p>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">{getPhaseDescription()}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[600px]">
        {/* Attacker Terminal (POV: The Hacker) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden border-red-500/20 flex flex-col shadow-2xl relative">
          <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20 flex justify-between items-center">
            <span className="text-xs font-black text-red-500 uppercase flex items-center gap-3">
              <Terminal size={16}/> ATTACKER CONSOLE [v2.4]
            </span>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto bg-black/80 text-red-400 leading-relaxed scrollbar-hide">
            <div className="text-red-900/60 text-[9px] mb-4 uppercase">--- INCOMING EXFILTRATED DATA STREAM ---</div>
            
            {phase === 'IDLE' && <div className="italic text-slate-700">Awaiting victim connection...</div>}
            
            <div className="space-y-3">
              {capturedKeys.map((k, i) => (
                <div key={i} className="flex gap-2 animate-in slide-in-from-right duration-300">
                  <span className="text-red-700 font-bold">[DATA_RECV]</span>
                  <span className="text-red-500">{`query: "${k}"`}</span>
                </div>
              ))}
              
              {phase === 'DATA_STEAL' && userInput.length === 0 && (
                <div className="text-yellow-600 animate-pulse italic"># Listening for keystrokes in victim's browser...</div>
              )}
            </div>

            {phase === 'FORGERY_EXEC' && (
              <div className="mt-8 p-4 bg-red-900/10 border border-red-900/30 rounded-xl space-y-1">
                <div className="text-red-600 font-bold mb-1">TRIGGERING FORGERY:</div>
                <div className="flex justify-between"><span>TARGET_URL:</span> <span className="text-white">bank.com/api/send</span></div>
                <div className="flex justify-between"><span>METHOD:</span> <span className="text-white">POST</span></div>
                <div className="flex justify-between"><span>PAYLOAD:</span> <span className="text-white">to_acc=Hacker_7&amt=5000</span></div>
              </div>
            )}
            
            {phase === 'ANALYSIS' && (
              <div className={`mt-8 p-4 text-center rounded-xl border-2 font-black text-lg ${!isDefenseOn ? 'bg-red-600/20 border-red-600 text-red-500 animate-bounce' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                {!isDefenseOn ? 'SYSTEM PWNED' : 'ATTACK_FAILED_403'}
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-6 right-6 h-1 bg-red-900/20 rounded-full overflow-hidden">
             <div className="h-full bg-red-600 animate-[progress_3s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Browser Simulation (POV: The Victim) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-8 flex flex-col items-center justify-between relative bg-slate-900/40 border-blue-500/10 shadow-xl">
          <div className="w-full space-y-8 z-10">
            <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-700 w-full flex flex-col items-center gap-6 ${
              phase === 'DATA_STEAL' || phase === 'FORGERY_EXEC' ? 'bg-blue-600/5 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)]' : 'bg-slate-800/50 border-slate-700'
            }`}>
              <div className="flex items-center gap-3 w-full bg-slate-950/50 p-2 rounded-xl border border-slate-800">
                <Globe size={14} className="text-blue-500" />
                <span className="text-[10px] text-slate-400 font-mono">https://normal-looking-site.com</span>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full opacity-50"></div>
                <User size={64} className={`relative transition-colors duration-500 ${phase === 'DATA_STEAL' ? 'text-blue-400' : 'text-slate-600'}`} />
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between px-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Victim's Input Area</label>
                  {phase === 'DATA_STEAL' && <span className="text-[9px] text-red-500 animate-pulse font-bold">MONITORED!</span>}
                </div>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                  <input 
                    type="text" 
                    placeholder={phase === 'DATA_STEAL' ? "اینجا تایپ کنید تا دزدیده شود..." : "فعلا غیرفعال"} 
                    disabled={phase !== 'DATA_STEAL'}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-blue-600 focus:outline-none transition-all placeholder:text-slate-700 text-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Flow Indicators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
             <svg className="w-full h-full opacity-30">
                {phase === 'FORGERY_EXEC' && (
                  <path 
                    d="M 50% 50% Q 80% 50% 80% 80%" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="animate-[dash_1s_linear_infinite]"
                    strokeDasharray="10,20"
                  />
                )}
             </svg>
          </div>

          <div className="w-full flex justify-between px-6 mt-auto">
             <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${phase === 'ATTACK_PREP' || phase === 'VICTIM_LURE' ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/10' : 'border-slate-800'}`}>
                  <Terminal size={28} className={phase === 'ATTACK_PREP' || phase === 'VICTIM_LURE' ? 'text-red-500' : 'text-slate-700'} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase">Malicious Host</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${phase === 'ANALYSIS' ? (isDefenseOn ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-slate-800'}`}>
                  <Server size={28} className={phase === 'ANALYSIS' ? (isDefenseOn ? 'text-green-400' : 'text-red-400') : 'text-slate-700'} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase">Trusted Server</span>
             </div>
          </div>
        </div>

        {/* Server System Logs (POV: The Defender) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden border-blue-500/20 flex flex-col shadow-2xl">
          <div className="bg-blue-500/10 px-6 py-4 border-b border-blue-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-500 uppercase flex items-center gap-3">
                <Shield size={16} className="text-blue-500" /> SYSTEM INTEGRITY LOG
              </span>
              <CheckCircle className={`transition-opacity duration-300 ${phase === 'ANALYSIS' && isDefenseOn ? 'opacity-100 text-green-500' : 'opacity-20'}`} size={16} />
            </div>
            
            {/* Filter UI */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-blue-500/10">
              <button 
                onClick={() => setLogFilter('all')}
                className={`text-[9px] px-2 py-1 rounded-md border transition-all ${logFilter === 'all' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-slate-300'}`}
              >
                All
              </button>
              <button 
                onClick={() => setLogFilter('info')}
                className={`text-[9px] px-2 py-1 rounded-md border transition-all ${logFilter === 'info' ? 'bg-blue-400/20 border-blue-400 text-blue-300' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-blue-400'}`}
              >
                Info
              </button>
              <button 
                onClick={() => setLogFilter('warn')}
                className={`text-[9px] px-2 py-1 rounded-md border transition-all ${logFilter === 'warn' ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-yellow-400'}`}
              >
                Warn
              </button>
              <button 
                onClick={() => setLogFilter('success')}
                className={`text-[9px] px-2 py-1 rounded-md border transition-all ${logFilter === 'success' ? 'bg-green-400/20 border-green-500 text-green-300' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-green-400'}`}
              >
                Success
              </button>
              <button 
                onClick={() => setLogFilter('err')}
                className={`text-[9px] px-2 py-1 rounded-md border transition-all ${logFilter === 'err' ? 'bg-red-400/20 border-red-400 text-red-300' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-red-400'}`}
              >
                Error
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 font-mono text-[10px] overflow-y-auto space-y-3 bg-slate-950/90 leading-relaxed scrollbar-hide">
            {filteredLogs.length === 0 ? (
              <div className="text-slate-700 italic text-center mt-10">No logs found for this filter.</div>
            ) : (
              filteredLogs.map((log, i) => (
                <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-left duration-500 ${
                  log.type === 'err' ? 'text-red-400 font-bold' : 
                  log.type === 'warn' ? 'text-yellow-400' : 
                  log.type === 'success' ? 'text-green-400 border-l-2 border-green-500 pl-2' : 'text-blue-300'
                }`}>
                  <span className="opacity-20 shrink-0 tabular-nums">[{new Date().toLocaleTimeString([], {minute:'2-digit', second:'2-digit'})}]</span>
                  <span>{log.msg}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>
          {phase === 'ANALYSIS' && (
             <div className={`p-4 border-t ${isDefenseOn ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className="flex items-center gap-2 mb-1">
                   <div className={`w-2 h-2 rounded-full ${isDefenseOn ? 'bg-green-500' : 'bg-red-500 animate-ping'}`}></div>
                   <span className={`text-[10px] font-black uppercase ${isDefenseOn ? 'text-green-500' : 'text-red-500'}`}>
                     {isDefenseOn ? 'Policy: Secure' : 'Policy: Violated'}
                   </span>
                </div>
                <p className="text-[9px] text-slate-500">{isDefenseOn ? 'Request Origin validated successfully.' : 'Potential CSRF detected. Unauthorized cross-origin access.'}</p>
             </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 pt-8 pb-12">
        <button 
          onClick={handleNext}
          className="group relative px-20 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2.5rem] font-black transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {phase === 'ANALYSIS' ? <RefreshCw className="relative z-10 group-hover:rotate-180 transition-transform duration-700" size={28} /> : <Send className="relative z-10" size={28} />}
          <div className="text-left relative z-10">
            <div className="text-[10px] opacity-70 uppercase tracking-widest font-black mb-1">Interactive Pipeline</div>
            <div className="text-xl">
                {phase === 'IDLE' && 'Start Attack Preparation'}
                {phase === 'ATTACK_PREP' && 'Deploy Phishing Link'}
                {phase === 'VICTIM_LURE' && 'Monitor Victim Activity'}
                {phase === 'DATA_STEAL' && 'Execute CSRF Forgery'}
                {phase === 'FORGERY_EXEC' && 'View Server Audit'}
                {phase === 'ANALYSIS' && 'Restart Lab Session'}
            </div>
          </div>
        </button>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default SimulationSection;
