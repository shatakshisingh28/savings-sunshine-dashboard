
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BarChart2, CreditCard, HelpCircle, Home, PieChart, Settings, Wallet } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={cn("fixed left-0 top-0 h-full w-16 md:w-64 bg-white border-r border-border flex flex-col py-6 z-10", className)}>
      <div className="flex items-center justify-center md:justify-start md:px-6 mb-8">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-finance-accent to-primary flex items-center justify-center text-white font-bold">
          FD
        </div>
        <span className="ml-2 text-xl font-semibold hidden md:block">FinDash</span>
      </div>
      
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link active">
            <Home className="h-5 w-5" />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <PieChart className="h-5 w-5" />
            <span className="hidden md:inline">Expenses</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <Wallet className="h-5 w-5" />
            <span className="hidden md:inline">Savings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <BarChart2 className="h-5 w-5" />
            <span className="hidden md:inline">Investments</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <CreditCard className="h-5 w-5" />
            <span className="hidden md:inline">Accounts</span>
          </Button>
        </div>
      </nav>
      
      <div className="px-2 mt-auto">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <Settings className="h-5 w-5" />
            <span className="hidden md:inline">Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 nav-link">
            <HelpCircle className="h-5 w-5" />
            <span className="hidden md:inline">Help</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
