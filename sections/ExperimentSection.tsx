
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'HTTP (Cross-Domain)', value: 11.2, color: '#ef4444' },
  { name: 'HTTP (Same-Domain)', value: 3.5, color: '#f87171' },
  { name: 'HTTPS (Cross-Domain)', value: 0.22, color: '#22c55e' },
  { name: 'HTTPS (Same-Domain)', value: 0.05, color: '#4ade80' },
];

const ExperimentSection: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="prose prose-invert max-w-none">
        <h3 className="text-2xl font-bold">آزمایش: سرکوب هدر Referer</h3>
        <p className="text-slate-400">
          نویسندگان ۲۸۳,۹۴۵ نمایش تبلیغات را در دو شبکه تبلیغاتی خریداری کردند تا بسنجند هدر Referer چقدر حذف می‌شود.
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 h-[400px]">
        <h4 className="text-center mb-6 text-slate-500 text-sm">نرخ حذف هدر Referer (درصد)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
          <h4 className="font-bold text-blue-400 mb-2">یافته اول: مشکل حریم خصوصی</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            در HTTP معمولی، فایروال‌ها و پروکسی‌های شبکه‌های سازمانی هدر Referer را برای حفظ حریم خصوصی حذف می‌کنند (تا ۱۱٪ موارد). این باعث می‌شود دفاع مبتنی بر Referer غیرقابل اعتماد باشد.
          </p>
        </div>
        <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
          <h4 className="font-bold text-green-400 mb-2">یافته دوم: امنیت در HTTPS</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            در بستر HTTPS، به دلیل رمزنگاری، نودهای میانی نمی‌توانند هدر را دستکاری کنند. نرخ حذف در اینجا بسیار ناچیز است (۰.۰۵٪). بنابراین Referer برای سایت‌های تماماً HTTPS قابل استفاده است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperimentSection;
