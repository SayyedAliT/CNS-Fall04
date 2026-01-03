
import React from 'react';
import { AlertCircle, FileText, CheckCircle } from 'lucide-react';

const LimitationsSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom duration-500 pb-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <AlertCircle className="text-yellow-500" />
            محدودیت‌های راهکار پیشنهادی
          </h3>
          <div className="space-y-4">
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1">عدم جایگزینی کامل Token</h4>
              <p className="text-xs text-slate-400 leading-relaxed">هدر Origin فقط در برابر CSRF دفاع می‌کند و جایگزین مکانیزم‌های دیگر (مثل دفاع در برابر XSS) نیست.</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1">وابستگی به مرورگر</h4>
              <p className="text-xs text-slate-400 leading-relaxed">این راهکار نیاز به پیاده‌سازی در تمام مرورگرها داشت (که البته امروزه اکثر مرورگرها آن را پیاده کرده‌اند).</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-yellow-500">
              <h4 className="font-bold text-sm mb-1">مسائل مربوط به Plug-inها</h4>
              <p className="text-xs text-slate-400 leading-relaxed">پلاگین‌هایی مثل Flash یا Java در آن زمان می‌توانستند هدرها را دور بزنند.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
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
              <p className="text-xs font-bold">Paper Validation</p>
              <p className="text-[10px] text-slate-500">This paper had a significant impact on modern web standards (RFC 6454).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <h2 className="text-3xl font-extrabold text-white mb-4">با تشکر از توجه شما</h2>
        <p className="text-slate-500">ارائه شده برای کلاس امنیت شبکه - نیمسال تحصیلی جاری</p>
      </div>
    </div>
  );
};

export default LimitationsSection;
