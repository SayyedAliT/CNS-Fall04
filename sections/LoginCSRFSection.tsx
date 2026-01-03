
import React from 'react';
import { ShieldX, HelpCircle } from 'lucide-react';

const LoginCSRFSection: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/20">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <ShieldX className="text-indigo-400" />
          مفهوم کلیدی مقاله: Login CSRF
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          اکثر بحث‌ها درباره CSRF روی تغییر حالت (Mutation) حساب کاربر تمرکز داشتند. اما این مقاله مفهومی را معرفی کرد که در آن مهاجم قربانی را مجبور می‌کند به حساب خودِ مهاجم وارد شود!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-400" />
            چرا این حمله خطرناک است؟
          </h3>
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-blue-300 mb-1">ردیابی تاریخچه (Search History)</h4>
              <p className="text-sm text-slate-400">اگر قربانی در حالی که به حساب مهاجم وارد شده (بدون اطلاع) جستجو کند، تمام تاریخچه او در حساب مهاجم ذخیره شده و مهاجم می‌تواند بعداً آن‌ها را ببیند.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-blue-300 mb-1">سرقت اطلاعات مالی (PayPal Example)</h4>
              <p className="text-sm text-slate-400">قربانی به حساب مهاجم وارد می‌شود، سپس شماره کارت خود را برای پرداخت وارد می‌کند. در واقع کارت او به حساب مهاجم اضافه می‌شود!</p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <img 
            src="https://picsum.photos/seed/security/800/600" 
            alt="Security Visualization" 
            className="rounded-2xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent flex flex-col justify-end p-6">
            <span className="text-xs text-blue-400 font-mono mb-1">Visual Concept</span>
            <span className="text-lg font-bold">تزریق نشست (Session Injection)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCSRFSection;
