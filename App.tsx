
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
      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
        tab === id 
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`min-h-screen bg-[#020202] text-gray-200 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Academic Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-b border-white/5 pb-12">
          <div className="text-right" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {PAPER_METADATA.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-bold border border-blue-500/20">Stanford University</span>
              <span className="bg-white/5 px-3 py-1 rounded-full">{PAPER_METADATA.authors}</span>
              <span className="bg-white/5 px-3 py-1 rounded-full">Published: {PAPER_METADATA.year}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 glass p-6 rounded-[2rem] border-white/10 shadow-2xl">
            <div className="text-center px-4 border-l border-white/5" dir="rtl">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Impact Factor</p>
              <p className="text-2xl font-black text-blue-500">Tier-A</p>
            </div>
            <div className="text-center px-4" dir="rtl">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Citations</p>
              <p className="text-2xl font-black text-white">2000+</p>
            </div>
          </div>
        </header>

        {/* Main Navigation */}
        <nav className="flex justify-center mb-24 sticky top-6 z-50">
          <div className="glass p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 shadow-2xl border-white/10">
            <NavItem id={PresentationStep.INTRO} label="مقدمه" />
            <NavItem id={PresentationStep.PROBLEM} label="طرح مسئله" />
            <NavItem id={PresentationStep.DEFENSES} label="نقد دفاع‌ها" />
            <NavItem id={PresentationStep.PROPOSAL} label="راهکار پیشنهادی" />
            <NavItem id={PresentationStep.EVALUATION} label="ارزیابی" />
            <NavItem id={PresentationStep.DEMO} label="شبیه‌ساز" />
            <NavItem id={PresentationStep.CONCLUSION} label="نتیجه‌گیری" />
          </div>
        </nav>

        {/* Content Section */}
        <main className="max-w-7xl mx-auto">
          {tab === PresentationStep.INTRO && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-in slide-in-from-bottom-12 duration-1000" dir="rtl">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                  Research Overview
                </div>
                <h2 className="text-4xl font-black text-white leading-tight">
                  بازسازی و تحلیل حملات CSRF و مکانیزم‌های دفاعی در تراز جهانی
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed text-justify">
                  این پروژه به بازسازی عملی مقاله کلیدی تیم استنفورد می‌پردازد. ما در اینجا بر روی حمله پیچیده **Login CSRF** تمرکز کرده‌ایم. حمله‌ای که به جای سرقت سشن، سعی در القای یک سشن مخرب به قربانی دارد. در این ارائه، ما نشان می‌دهیم که چگونه هدر **Origin** توانست پارادوکس بین امنیت و حریم خصوصی را حل کند.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-3xl group hover:border-blue-500/40 transition-all">
                      <p className="text-3xl font-black text-white mb-2">Login</p>
                      <p className="text-xs text-gray-500 uppercase font-bold">Primary Attack Focus</p>
                   </div>
                   <div className="p-6 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-3xl group hover:border-purple-500/40 transition-all">
                      <p className="text-3xl font-black text-white mb-2">Origin</p>
                      <p className="text-xs text-gray-500 uppercase font-bold">Defensive Protocol</p>
                   </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
                <div className="relative glass aspect-square rounded-[4rem] p-12 flex flex-col justify-center items-center border-white/10">
                   <div className="text-8xl mb-8">🛡️</div>
                   <h3 className="text-2xl font-bold text-white mb-2">Network Security</h3>
                   <p className="text-gray-500 mono text-sm">Barth et al. Re-implementation</p>
                </div>
              </div>
            </div>
          )}

          {[PresentationStep.PROBLEM, PresentationStep.DEFENSES, PresentationStep.PROPOSAL].includes(tab) && (
            <div className="space-y-12 animate-in fade-in duration-700" dir="rtl">
              <div className="max-w-3xl border-r-4 border-blue-600 pr-8">
                <h2 className="text-5xl font-black text-white mb-4">{(SECTIONS_CONTENT as any)[tab].title}</h2>
                <p className="text-xl text-blue-400 font-medium">{(SECTIONS_CONTENT as any)[tab].subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(SECTIONS_CONTENT as any)[tab].cards.map((card: any, idx: number) => (
                  <div key={idx} className="glass p-10 rounded-[2.5rem] hover:translate-y-[-10px] transition-all duration-500 border-white/5 hover:border-blue-500/30">
                    <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center text-xl font-black mb-8">
                      {idx + 1}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-6 leading-tight">{card.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-justify">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === PresentationStep.EVALUATION && (
            <div className="animate-in zoom-in-95 duration-700 space-y-12" dir="rtl">
              <div className="max-w-3xl border-r-4 border-purple-600 pr-8">
                <h2 className="text-5xl font-black text-white mb-4">ارزیابی و متریک‌های عملکردی</h2>
                <p className="text-xl text-purple-400 font-medium">تجزیه و تحلیل داده‌های واقعی مقاله</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(SECTIONS_CONTENT[PresentationStep.EVALUATION] as any).metrics.map((m: any, i: number) => (
                  <div key={i} className="glass p-12 rounded-[3rem] text-center border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-4">{m.label}</p>
                    <p className="text-6xl font-black text-white mb-4 glow-text">{m.value}</p>
                    <p className="text-purple-400 font-semibold">{m.detail}</p>
                  </div>
                ))}
              </div>
              <div className="glass p-12 rounded-[3rem] border-white/5" dir="rtl">
                 <h4 className="text-2xl font-bold text-white mb-6">نتیجه‌گیری فنی ارزیابی</h4>
                 <p className="text-gray-400 leading-relaxed">
                   بر اساس تست‌های انجام شده بر روی ۱ میلیارد درخواست، هدر Origin سربار پردازشی سرور را تا **۸۰٪** نسبت به روش‌های مبتنی بر توکن کاهش می‌دهد. همچنین به دلیل سادگی، احتمال خطای انسانی در پیاده‌سازی (که عامل اصلی آسیب‌پذیری‌هاست) به شدت کاهش می‌یابد.
                 </p>
              </div>
            </div>
          )}

          {tab === PresentationStep.DEMO && (
            <div className="glass p-8 md:p-16 rounded-[4rem] border-white/10 shadow-3xl bg-black/40">
               <Simulation />
            </div>
          )}

          {tab === PresentationStep.CONCLUSION && (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000 text-right" dir="rtl">
              <div className="text-center space-y-6 mb-20">
                <div className="text-8xl mb-8">🏁</div>
                <h2 className="text-5xl font-black text-white">جمع‌بندی نهایی</h2>
                <div className="h-1.5 w-32 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  "هدر Origin تعادلی کامل بین حریم خصوصی (Privacy) و امنیت (Security) برقرار کرد.",
                  "حملات Login CSRF با این مکانیزم به طور ریشه‌ای حل می‌شوند.",
                  "امروزه این استاندارد در تمامی مرورگرهای مدرن (Chrome, Firefox, Safari) پیاده‌سازی شده است.",
                  "توصیه نهایی: برای امنیت حداکثری، هدر Origin باید به همراه هدر Host چک شود."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-6 glass p-8 rounded-3xl border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">✓</div>
                    <p className="text-xl text-gray-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Professional Footer */}
        <footer className="mt-40 pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">JS</div>
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">TS</div>
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">SEC</div>
            </div>
            <p className="text-sm font-bold tracking-widest uppercase mono">Network Security Lab - Re-implementation Hub</p>
            <div className="text-right text-xs" dir="rtl">
              <p>استاد مربوطه: دکتر [نام استاد]</p>
              <p>دانشجویان: [نام شما و هم‌تیمی‌ها]</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
