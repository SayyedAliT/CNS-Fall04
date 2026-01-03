
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-gray-100 selection:bg-blue-500 selection:text-white">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px]"></div>
      </div>
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="relative z-10 border-t border-gray-800 mt-20 py-8 text-center text-gray-500 text-sm">
        <p dir="rtl">ارائه شده برای درس امنیت شبکه - دانشگاه</p>
        <p className="mt-1">Based on "Robust Defenses for Cross-Site Request Forgery" (Barth et al.)</p>
      </footer>
    </div>
  );
};

export default Layout;
