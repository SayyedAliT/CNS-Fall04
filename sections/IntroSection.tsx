
import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight text-white">
          Robust Defenses for Cross-Site Request Forgery
        </h1>
        <p className="text-xl text-blue-400 font-medium">تحلیل عمیق مکانیزم‌های دفاعی و بازسازی پروتکل‌های امنیتی وب</p>
        <div className="h-1 w-24 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-8 rounded-2xl border-t border-blue-500/30">
          <h3 className="text-blue-400 font-bold mb-4 border-b border-slate-700 pb-2 flex justify-between">
            <span>مشخصات فنی مقاله</span>
            <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded uppercase font-mono">Academic Info</span>
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between items-center"><span className="text-slate-500">نویسندگان اصلی:</span> <span className="font-semibold text-slate-200">Adam Barth, Collin Jackson, John Mitchell</span></li>
            <li className="flex justify-between items-center"><span className="text-slate-500">موسسه پژوهشی:</span> <span className="text-slate-200 italic">Stanford University Security Group</span></li>
            <li className="flex justify-between items-center"><span className="text-slate-500">کنفرانس هدف:</span> <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-[10px] font-bold">ACM CCS (Top-tier)</span></li>
            <li className="flex justify-between items-center"><span className="text-slate-500">دستاورد کلیدی:</span> <span className="text-slate-200">معرفی استاندارد هدر Origin</span></li>
          </ul>
        </div>
        
        <div className="glass-panel p-8 rounded-2xl border-t border-indigo-500/30">
          <h3 className="text-indigo-400 font-bold mb-4 border-b border-slate-700 pb-2">چشم‌انداز پژوهش (Subtitle)</h3>
          <p className="text-sm leading-relaxed text-slate-300 text-justify">
            این مقاله با نگاهی انتقادی به مدل امنیتی حاکم بر کوکی‌ها (Ambient Authority)، نشان می‌دهد که چگونه سایت‌های مخرب می‌توانند از اعتماد مرورگر به کوکی‌ها سوءاستفاده کنند. تمرکز اصلی ما در این پروژه، بازسازی حمله <strong>Login CSRF</strong> و تحلیل عملکرد هدر پیشنهادی <strong>Origin</strong> در مقابله با آن است. این هدر تعادلی بین امنیت هدر Referer و حریم خصوصی کاربر ایجاد می‌کند.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-bold px-4 border-r-4 border-blue-500">سرفصل‌های ارائه و بازسازی عملی</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "تحلیل ریشه‌ای ضعف‌ها", a: "بررسی اینکه چرا مکانیزم‌هایی مثل Referer در دنیای واقعی به دلیل حذف توسط پروکسی‌ها شکست می‌خورند." },
            { q: "شبیه‌سازی Login CSRF", a: "نمایش اینکه چگونه یک مهاجم می‌تواند هویت خود را به نشست (Session) کاربر تزریق کند." },
            { q: "اثبات کارایی هدر Origin", a: "بازسازی عملیاتی هدر Origin و مشاهده نحوه بلاک شدن درخواست‌های مشکوک توسط سرور." }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="text-blue-400 font-bold text-sm mb-3 group-hover:translate-x-1 transition-transform">{item.q}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
