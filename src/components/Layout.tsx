
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90">
      <Sidebar />
      <div className="ml-16 md:ml-64 transition-all duration-300">
        <Header />
        <main className="p-4 md:p-6 pb-20 max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-glass">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
