
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
      className={`px-8 py-4 rounded-2xl text-[14px] font-black transition-all duration-500 relative group shrink-0 ${
        tab === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {tab === id && (
        <span className="absolute inset-0 bg-blue-600 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)] animate-in zoom-in-95"></span>
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-[#020202] text-gray-200 transition-opacity duration-1000 selection:bg-blue-600/30 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[180px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 container mx-auto px-8 py-16 md:py-28">
        {/* Academic Presentation Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-16 mb-32 border-b border-white/5 pb-20">
          <div className="text-right flex-1" dir="rtl">
            <div className="flex items-center gap-4 mb-6 justify-end">
              <span className="h-1 w-16 bg-blue-600 rounded-full"></span>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.5em]">{PAPER_METADATA.venue}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1] mb-10 drop-shadow-2xl">
              {PAPER_METADATA.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-bold justify-end">
              <span className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">🏫 {PAPER_METADATA.institution}</span>
              <span className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">✍️ {PAPER_METADATA.authors}</span>
              <span className="bg-blue-600/10 text-blue-400 px-6 py-3 rounded-2xl border border-blue-500/20">📅 {PAPER_METADATA.year}</span>
            </div>
          </div>
        </header>

        {/* User-Requested Menu Structure */}
        <nav className="flex justify-center mb-36 sticky top-12 z-50">
          <div className="glass p-2.5 rounded-[2.5rem] flex flex-nowrap overflow-x-auto custom-scrollbar gap-1.5 shadow-4xl border-white/10 bg-black/90 backdrop-blur-3xl no-scrollbar">
            <NavItem id={PresentationStep.INTRO} label="شروع ارائه" />
            <NavItem id={PresentationStep.PROBLEM} label="۱. طرح مسئله" />
            <NavItem id={PresentationStep.PROPOSAL} label="۲. روش پیشنهادی" />
            <NavItem id={PresentationStep.DEMO} label="۳. نمایش عملی" />
            <NavItem id={PresentationStep.LIMITATIONS} label="۴. بحث محدودیت‌ها" />
            <NavItem id={PresentationStep.CONCLUSION} label="نتیجه‌گیری" />
          </div>
        </nav>

        <main className="max-w-7xl mx-auto pb-52">
          {tab === PresentationStep.INTRO && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-28 items-center animate-in slide-in-from-bottom-24 duration-1000" dir="rtl">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-7xl font-black text-white leading-tight tracking-tighter">
                    مهار تهدیدات <span className="text-blue-600">Cross-Site</span> در وب مدرن
                  </h2>
                  <p className="text-gray-400 text-3xl leading-relaxed text-justify font-medium">
                    ما در این پروژه به بررسی تخصصی مقاله دوران‌ساز استنفورد می‌پردازیم. راهکاری که با تغییر پارادایم از کوکی‌های کورکورانه به **Origin Header**، لایه‌ای نفوذناپذیر در برابر حملات جعل درخواست ایجاد کرد.
                  </p>
                </div>
                <div className="flex gap-6">
                  <button onClick={() => setTab(PresentationStep.PROBLEM)} className="bg-blue-600 px-14 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-3xl shadow-blue-600/30">آغاز ارائه فنی</button>
                  <button onClick={() => setTab(PresentationStep.DEMO)} className="bg-white/5 border border-white/10 px-14 py-5 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all">مشاهده دمو زنده</button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/20 blur-[150px] rounded-full group-hover:bg-blue-600/30 transition-all duration-1000" />
                <div className="relative glass aspect-square rounded-[6rem] flex flex-col items-center justify-center border-white/10 shadow-5xl group-hover:rotate-3 transition-transform duration-700">
                   <div className="text-[180px] drop-shadow-[0_0_60px_rgba(59,130,246,0.5)] mb-8">💎</div>
                   <div className="text-center">
                     <p className="text-blue-400 font-black tracking-[0.6em] uppercase text-xs">Security Excellence</p>
                     <p className="text-2xl font-black text-white">Academic Project 2024</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {[PresentationStep.PROBLEM, PresentationStep.PROPOSAL, PresentationStep.LIMITATIONS].includes(tab) && (
            <div className="space-y-28 animate-in fade-in slide-in-from-right-16 duration-700" dir="rtl">
              <div className="max-w-5xl border-r-[12px] border-blue-600 pr-12">
                <h2 className="text-8xl font-black text-white mb-8 tracking-tighter">{(SECTIONS_CONTENT as any)[tab].title}</h2>
                <p className="text-3xl text-blue-500 font-black uppercase tracking-tight">{(SECTIONS_CONTENT as any)[tab].subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {(SECTIONS_CONTENT as any)[tab].details.map((detail: any, idx: number) => (
                  <div key={idx} className="glass p-14 rounded-[4rem] hover:translate-y-[-20px] transition-all duration-700 border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="w-20 h-20 bg-blue-600/20 text-blue-500 rounded-[2rem] flex items-center justify-center text-3xl font-black mb-12 shadow-inner">0{idx + 1}</div>
                    <h4 className="text-4xl font-black text-white mb-8 leading-[1.2] tracking-tight">{detail.header}</h4>
                    <p className="text-gray-400 text-xl leading-relaxed text-justify font-medium">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === PresentationStep.DEMO && (
            <div className="space-y-20">
               <div className="max-w-5xl mx-auto text-center space-y-6" dir="rtl">
                  <h2 className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">آزمایشگاه شبیه‌سازی زنده</h2>
                  <p className="text-3xl text-gray-500 font-black uppercase tracking-[0.3em]">Network Traffic & Protocol Analysis</p>
               </div>
               <div className="glass p-12 md:p-24 rounded-[6rem] border-white/10 shadow-6xl bg-black/60 relative">
                  <div className="absolute top-12 right-12 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Attack Simulation</span>
                  </div>
                  <Simulation />
               </div>
            </div>
          )}

          {tab === PresentationStep.CONCLUSION && (
            <div className="max-w-5xl mx-auto space-y-24 animate-in fade-in duration-1000 text-right" dir="rtl">
              <div className="text-center space-y-12 mb-40">
                <div className="text-[180px] mb-12 animate-pulse drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]">🏆</div>
                <h2 className="text-8xl font-black text-white tracking-tighter leading-none">جمع‌بندی و نتیجه‌گیری</h2>
                <div className="h-3 w-64 bg-blue-600 mx-auto rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)]"></div>
              </div>
              <div className="grid grid-cols-1 gap-12">
                {[
                  "هدر Origin موازنه کاملی بین امنیت وب و حریم خصوصی کاربر ایجاد کرد.",
                  "حملات Login CSRF با این متد به یک تهدید 'مهار شده' تبدیل شدند.",
                  "این تحقیق پایه و اساس استانداردهای مدرن امنیتی در مرورگرهای امروزی است."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-12 glass p-14 rounded-[4rem] border-white/5 hover:bg-white/10 transition-all group shadow-3xl">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-blue-600 text-white flex items-center justify-center text-4xl font-black shrink-0 shadow-2xl group-hover:rotate-12 transition-transform">✓</div>
                    <p className="text-3xl text-gray-100 font-black leading-tight tracking-tight">{text}</p>
                  </div>
                ))}
              </div>
              <div className="pt-40 text-center">
                 <p className="text-gray-600 font-black uppercase tracking-[1em] text-xs">Thank you for your attention</p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-80 pt-24 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-1000">
             <div className="flex gap-6">
                <span className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[11px] font-black tracking-widest">PAPER-ID: Barth-CCS-08</span>
                <span className="px-6 py-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 font-mono text-[11px] font-black tracking-widest">SEC-LAB-READY</span>
             </div>
             <div className="text-right" dir="rtl">
                <p className="text-lg font-black text-white">طراحی و پیاده‌سازی ارائه: تیم شماره ۳</p>
                <p className="text-[11px] text-gray-600 font-mono uppercase tracking-[0.4em] mt-2">Academic Presentation Framework v6.0-ULTRA</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
