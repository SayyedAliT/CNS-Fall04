
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const DefenseSection: React.FC = () => {
  const defenses = [
    {
      name: 'Secret Validation Token',
      desc: 'اضافه کردن یک توکن تصادفی به هر فرم که مهاجم نمی‌تواند آن را حدس بزند.',
      pros: 'بسیار امن اگر درست پیاده شود.',
      cons: 'مشکل در Login CSRF (چون قبل از لاگین نشستی وجود ندارد که توکن به آن وصل شود). پیچیدگی در صفحات ایستا.'
    },
    {
      name: 'Referer Header Validation',
      desc: 'بررسی فیلد Referer در هدر HTTP برای اطمینان از اینکه درخواست از خود سایت ارسال شده.',
      pros: 'سادگی در پیاده‌سازی.',
      cons: 'توسط پروکسی‌ها و فایروال‌ها به دلایل حریم خصوصی حذف می‌شود. در آزمایش مقاله مشخص شد ۳-۱۱٪ درخواست‌ها هدر ندارند.'
    },
    {
      name: 'Custom HTTP Headers',
      desc: 'استفاده از XMLHttpRequest برای ارسال هدرهای دلخواه (مثل X-Requested-By).',
      pros: 'مرورگر اجازه ارسال هدر شخصی به دامنه‌های دیگر را نمی‌دهد.',
      cons: 'نیاز به استفاده اجباری از AJAX برای تمام درخواست‌های حساس.'
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <p className="text-slate-400 italic">در این بخش، مقاله سه دفاع متداول را به چالش می‌کشد:</p>
      
      <div className="space-y-6">
        {defenses.map((d, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 hover:scale-[1.01] transition-transform">
            <h3 className="text-xl font-bold text-white mb-3">{d.name}</h3>
            <p className="text-slate-300 mb-4">{d.desc}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2 bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={16} />
                <span className="text-xs text-slate-400">مزایا: {d.pros}</span>
              </div>
              <div className="flex items-start gap-2 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                <XCircle className="text-red-500 shrink-0 mt-1" size={16} />
                <span className="text-xs text-slate-400">چالش: {d.cons}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefenseSection;
