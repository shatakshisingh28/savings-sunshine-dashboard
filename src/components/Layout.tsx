
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-16 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
