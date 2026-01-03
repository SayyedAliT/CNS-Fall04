
import React from 'react';
import { Section } from '../types.ts';
import { 
  FileText, 
  ShieldAlert, 
  Database, 
  ShieldCheck, 
  Zap, 
  PlayCircle, 
  AlertTriangle,
  Lock
} from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  // --- فیلدهای قابل تغییر توسط شما ---
  const PROFESSOR_NAME = "دکتر مهسا سعیدی"; 
  const GROUP_MEMBERS = "پوریا مهدیان - علی دهقان زاده -  سیدعلی تهامی"; 
  // ---------------------------------

  const items = [
    { id: Section.Introduction, label: 'معرفی مقاله', icon: FileText },
    { id: Section.Problem, label: 'طرح مسئله (CSRF)', icon: ShieldAlert },
    { id: Section.LoginCSRF, label: 'Login CSRF', icon: Lock },
    { id: Section.Defenses, label: 'دفاع‌های موجود', icon: ShieldCheck },
    { id: Section.Experiment, label: 'آزمایش و نتایج', icon: Database },
    { id: Section.Proposal, label: 'راهکار پیشنهادی (Origin)', icon: Zap },
    { id: Section.Simulation, label: 'نمایش عملی (Demo)', icon: PlayCircle },
    { id: Section.Limitations, label: 'محدودیت‌ها و جمع‌بندی', icon: AlertTriangle },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col h-screen z-20 shadow-2xl">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          پروژه امنیت شبکه
        </h1>
        <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">تحلیل و بازسازی حملات CSRF</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-right ${
              activeSection === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} className={activeSection === item.id ? 'ml-3' : 'ml-3 opacity-50'} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-500 space-y-2">
        <p className="flex flex-col">
          <span className="opacity-50">استاد مربوطه:</span>
          <span className="text-slate-300 font-bold">{PROFESSOR_NAME}</span>
        </p>
        <p className="flex flex-col mt-2">
          <span className="opacity-50">اعضای گروه:</span>
          <span className="text-slate-300 font-bold">{GROUP_MEMBERS}</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
