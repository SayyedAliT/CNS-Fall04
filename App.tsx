
import React, { useState, useEffect } from 'react';
import { PresentationStep } from './types';
import { PAPER_METADATA, SECTIONS_CONTENT } from './constants';
import Simulation from './components/Simulation';

const App: React.FC = () => {
  const [tab, setTab] = useState<PresentationStep>(PresentationStep.INTRO);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const NavItem = ({ id, label }: { id: PresentationStep; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-6 py-3 rounded-2xl text-[13px] font-black transition-all duration-500 relative group shrink-0 ${
        tab === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {tab === id && (
        <span className="absolute inset-0 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-in zoom-in-95"></span>
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-[#050505] text-gray-200 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[180px] translate-y-1/2 -translate-x-1/4" />
        <div className="scanline" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-24">
        {/* Academic Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-28 border-b border-white/5 pb-16">
          <div className="text-right flex-1" dir="rtl">
            <div className="flex items-center gap-3 mb-4 justify-end">
              <span className="h-0.5 w-12 bg-blue-600"></span>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em]">Network Security Research</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
              {PAPER_METADATA.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-bold justify-end">
              <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">🏫 {PAPER_METADATA.institution}</span>
              <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">✍️ {PAPER_METADATA.authors}</span>
              <span className="bg-blue-600/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20">📅 {PAPER_METADATA.year}</span>
            </div>
          </div>
        </header>

        {/* User-Requested Navigation Structure */}
        <nav className="flex justify-center mb-32 sticky top-8 z-50">
          <div className="glass p-2 rounded-[2.2rem] flex flex-nowrap overflow-x-auto custom-scrollbar gap-1 shadow-3xl border-white/10 bg-black/80 backdrop-blur-3xl">
            <NavItem id={PresentationStep.INTRO} label="شروع ارائه" />
            <NavItem id={PresentationStep.PROBLEM} label="۱. طرح مسئله" />
            <NavItem id={PresentationStep.PROPOSAL} label="۲. روش پیشنهادی" />
            <NavItem id={PresentationStep.DEMO} label="۳. نمایش عملی" />
            <NavItem id={PresentationStep.LIMITATIONS} label="۴. بحث محدودیت‌ها" />
            <NavItem id={PresentationStep.CONCLUSION} label="نتیجه‌گیری" />
          </div>
        </nav>

        <main className="max-w-7xl mx-auto pb-40">
          {tab === PresentationStep.INTRO && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center animate-in slide-in-from-bottom-20 duration-1000" dir="rtl">
              <div className="space-y-10">
                <h2 className="text-6xl font-black text-white leading-tight">
                  بازتعریف امنیت وب در برابر حملات <span className="text-blue-600">Cross-Site</span>
                </h2>
                <p className="text-gray-400 text-2xl leading-relaxed text-justify font-medium">
                  این ارائه بر پایه مقاله کلیدی سال ۲۰۰۸ استنفورد است که استانداردهای مرورگرهای مدرن را با معرفی هدر **Origin** دگرگون کرد. ما به بررسی ریشه‌ای مشکل CSRF و راهکار عملی این مقاله می‌پردازیم.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setTab(PresentationStep.PROBLEM)} className="bg-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-blue-600/20">شروع تحلیل فنی</button>
                </div>
              </div>
              <div className="relative glass aspect-square rounded-[5rem] flex items-center justify-center border-white/10 shadow-3xl">
                <div className="text-[160px] drop-shadow-[0_0_50px_rgba(59,130,246,0.4)]">🛡️</div>
              </div>
            </div>
          )}

          {[PresentationStep.PROBLEM, PresentationStep.PROPOSAL, PresentationStep.LIMITATIONS].includes(tab) && (
            <div className="space-y-24 animate-in fade-in slide-in-from-right-10 duration-700" dir="rtl">
              <div className="max-w-4xl border-r-8 border-blue-600 pr-10">
                <h2 className="text-7xl font-black text-white mb-6">{(SECTIONS_CONTENT as any)[tab].title}</h2>
                <p className="text-2xl text-blue-500 font-black uppercase">{(SECTIONS_CONTENT as any)[tab].subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {(SECTIONS_CONTENT as any)[tab].details.map((detail: any, idx: number) => (
                  <div key={idx} className="glass p-12 rounded-[3.5rem] hover:translate-y-[-10px] transition-all duration-500 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                    <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-3xl flex items-center justify-center text-2xl font-black mb-10 shadow-inner">0{idx + 1}</div>
                    <h4 className="text-3xl font-black text-white mb-6 leading-tight">{detail.header}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed text-justify font-medium">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === PresentationStep.DEMO && (
            <div className="space-y-16">
               <div className="max-w-4xl mx-auto text-center space-y-4" dir="rtl">
                  <h2 className="text-7xl font-black text-white tracking-tighter">شبیه‌ساز عملی حمله و دفاع</h2>
                  <p className="text-2xl text-gray-500 font-bold uppercase tracking-widest">Protocol Visualization Laboratory</p>
               </div>
               <div className="glass p-12 md:p-20 rounded-[5rem] border-white/10 shadow-4xl bg-black/40">
                  <Simulation />
               </div>
            </div>
          )}

          {tab === PresentationStep.CONCLUSION && (
            <div className="max-w-4xl mx-auto space-y-20 animate-in fade-in duration-1000 text-right" dir="rtl">
              <div className="text-center space-y-8 mb-32">
                <div className="text-[140px] mb-12 animate-pulse">🏁</div>
                <h2 className="text-7xl font-black text-white tracking-tighter">جمع‌بندی نهایی</h2>
                <div className="h-2 w-48 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {[
                  "هدر Origin توانست تعادل بین حریم خصوصی و امنیت را برقرار کند.",
                  "حملات خطرناک Login CSRF با این متد به طور ریشه‌ای حل شدند.",
                  "امروزه این استاندارد در RFC 6454 تثبیت شده و پایه امنیت وب مدرن است."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-10 glass p-10 rounded-[3rem] border-white/5 hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 text-2xl font-black shrink-0 shadow-inner">✓</div>
                    <p className="text-2xl text-gray-200 font-black leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-60 pt-20 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 opacity-30 hover:opacity-100 transition-opacity duration-700">
             <div className="flex gap-4">
                <span className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] font-black">CSRF-DEFENSE-STK-01</span>
             </div>
             <div className="text-right" dir="rtl">
                <p className="text-sm font-black text-white">طراحی ارائه برای درس امنیت شبکه - دانشگاه</p>
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Framework v5.0.0-PRO-FINAL</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
