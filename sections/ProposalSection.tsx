
import React from 'react';
import { Zap, Shield, EyeOff, Code, Layers, CheckCircle } from 'lucide-react';

const ProposalSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right duration-500">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-6 text-blue-400 ring-8 ring-blue-500/5">
          <Zap size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4">مکانیزم دفاعی پیشنهادی: هدر Origin</h2>
        <p className="text-xl text-slate-400 mb-6">ایجاد شفافیت در منشأ درخواست‌های میان‌سایتی</p>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-right">
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>توضیح راهکار (Subtitle):</strong> برخلاف هدر Referer که تمام URL را ارسال می‌کند، هدر Origin فقط شامل "پروتکل"، "دامنه" و "پورت" است. این کار باعث می‌شود حریم خصوصی کاربر حفظ شود در حالی که سرور همچنان می‌تواند تشخیص دهد درخواست از سایت خودی است یا یک سایت مخرب.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
            <Code className="text-blue-500" />
            تحلیل فنی هدر (Subtitle)
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-black/40 rounded-xl border border-slate-700 font-mono text-xs">
              <span className="text-blue-400">Origin:</span> https://evil-attacker.com
            </div>
            <p className="text-xs text-slate-500 italic">
              مقایسه با Referer: این هدر اطلاعات حساسی مثل Query Params را ارسال نمی‌کند.
            </p>
            <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="text-blue-500 shrink-0 mt-1" size={16} />
                    <span><strong>عدم نشت اطلاعات:</strong> جلوگیری از لو رفتن توکن‌های امنیتی موجود در URL.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="text-blue-500 shrink-0 mt-1" size={16} />
                    <span><strong>پایداری در شبکه:</strong> عبور از پروکسی‌ها و فایروال‌ها بدون حذف شدن به دلیل مسائل Privacy.</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-green-500 hover:bg-green-500/5 transition-all">
            <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 shadow-lg shadow-green-500/10"><Shield size={28} /></div>
            <div>
              <h4 className="font-bold mb-1">دفاع در برابر Login CSRF</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">این هدر اجازه می‌دهد سرور قبل از تایید نشست (Session)، منبع درخواست ورود را اعتبارسنجی کند.</p>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-indigo-500 hover:bg-indigo-500/5 transition-all">
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 shadow-lg shadow-indigo-500/10"><EyeOff size={28} /></div>
            <div>
              <h4 className="font-bold mb-1">تضمین حریم خصوصی</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">حذف اطلاعات مسیر (Path) باعث می‌شود مرورگر با خیال راحت‌تری هویت مبدأ را فاش کند.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Layers size={80} /></div>
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">منطق پیاده‌سازی سمت سرور (Server-Side Pseudo-code)</h4>
        <div className="max-w-lg mx-auto bg-black/60 p-6 rounded-2xl text-left font-mono text-xs text-blue-300 border border-blue-500/20">
            <span className="text-slate-500 italic">// Robust CSRF Check Logic</span><br/>
            <span className="text-purple-400">if</span> (request.method === <span className="text-orange-300">"POST"</span>) {'{'}<br/>
            &nbsp;&nbsp;<span className="text-purple-400">const</span> origin = request.headers[<span className="text-orange-300">"Origin"</span>];<br/>
            &nbsp;&nbsp;<span className="text-purple-400">if</span> (origin && origin !== <span className="text-orange-300">"https://bank.com"</span>) {'{'}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;console.warn(<span className="text-red-400">"CSRF Blocked: "</span> + origin);<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;return response.status(<span className="text-red-400">403</span>).send(<span className="text-red-400">"Forbidden"</span>);<br/>
            &nbsp;&nbsp;{'}'}<br/>
            {'}'}
        </div>
      </div>
    </div>
  );
};

export default ProposalSection;
