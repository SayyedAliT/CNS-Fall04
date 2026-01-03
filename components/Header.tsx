
import React from 'react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: Section;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const getTitle = () => {
    switch (activeSection) {
      case Section.Introduction: return 'معرفی مقاله و نویسندگان';
      case Section.Problem: return 'تحلیل جامع آسیب‌پذیری CSRF';
      case Section.LoginCSRF: return 'حمله نوظهور: Login CSRF';
      case Section.Experiment: return 'تحلیل آماری و آزمایشگاهی';
      case Section.Defenses: return 'بررسی مکانیزم‌های دفاعی متداول';
      case Section.Proposal: return 'ارائه هدر پیشنهادی Origin';
      case Section.Simulation: return 'شبیه‌سازی تعاملی حمله و دفاع';
      case Section.Limitations: return 'بحث و نتیجه‌گیری نهایی';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full glass-panel border-b border-slate-800 px-8 py-6 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-slate-100">{getTitle()}</h2>
      <div className="flex items-center space-x-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          Top-tier Conf: CCS'08
        </span>
      </div>
    </header>
  );
};

export default Header;
