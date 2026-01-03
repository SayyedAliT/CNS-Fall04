
import React from 'react';
import { AlertCircle, FileText, CheckCircle } from 'lucide-react';

const LimitationsSection: React.FC = () => {
  // --- تنظیمات شخصی‌سازی ---
  const SEMESTER = "نیمسال دوم ۱۴۰۳-۱۴۰۴"; // نیمسال تحصیلی
  const UNIVERSITY = "دانشگاه فنی مهندسی"; // نام دانشگاه
  // -----------------------

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom duration-500 pb-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
            <AlertCircle className="text-yellow-500" />
            محدودیت‌های راهکار پیشنهادی
          </h3>
          <div className="space-y-4">
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1 text-white">عدم جایگزینی کامل Token</h4>
              <p className="text-xs text-slate-400 leading-relaxed">هدر Origin فقط در برابر CSRF دفاع می‌کند و جایگزین مکانیزم‌های دیگر (مثل دفاع در برابر XSS) نیست.</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1 text-white">وابستگی به مرورگر</h4>
              <p className="text-xs text-slate-400 leading-relaxed">این راهکار نیاز به پیاده‌سازی در تمام مرورگرها داشت (که البته امروزه اکثر مرورگرها آن را پیاده کرده‌اند).</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1 text-white">مسائل مربوط به Plug-inها</h4>
              <p className="text-xs text-slate-400 leading-relaxed">پلاگین‌هایی مثل Flash یا Java در آن زمان می‌توانستند هدرها را دور بزنند.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
            <CheckCircle className="text-blue-500" />
            نتیجه‌گیری و دستاوردها
          </h3>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              اثبات اینکه CSRF حتی قبل از ایجاد نشست (در صفحه لاگین) خطرناک است.
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              نقد علمی هدر Referer و ارائه آمار واقعی از نرخ حذف آن.
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              معرفی هدر Origin که امروزه به یکی از استانداردهای اصلی وب تبدیل شده است.
            </li>
          </ul>
          <div className="pt-6 border-t border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-xl text-slate-400"><FileText /></div>
            <div>
              <p className="text-xs font-bold text-white">تأثیرگذاری آکادمیک</p>
              <p className="text-[10px] text-slate-500 leading-tight">این مقاله با بیش از هزاران ارجاع، سنگ بنای امنیت مدرن در کنترل دسترسی‌های Cross-Origin است.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800/50">
        <h2 className="text-4xl font-black text-white mb-4">با تشکر از توجه شما</h2>
        <div className="flex flex-col items-center gap-2">
          <p className="text-blue-400 font-medium">{UNIVERSITY}</p>
          <p className="text-slate-500 text-sm tracking-widest uppercase">{SEMESTER}</p>
        </div>
      </div>
    </div>
  );
};

export default LimitationsSection;
