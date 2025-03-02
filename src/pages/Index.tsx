
import React from 'react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import BalanceChart from '@/components/BalanceChart';
import SpendingByCategory from '@/components/SpendingByCategory';
import SavingsGoals from '@/components/SavingsGoals';
import RecentTransactions from '@/components/RecentTransactions';
import { 
  ArrowUpDown, 
  DollarSign, 
  PiggyBank, 
  Wallet
} from 'lucide-react';

import { 
  balanceData, 
  recentTransactionsData, 
  savingsGoalsData, 
  spendingCategoriesData,
  totalBalance,
  totalExpenses,
  totalIncome,
  totalSavings
} from '@/data/dashboardData';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-semibold mb-6">Financial Overview</h1>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard 
            title="Total Balance"
            value={`$${totalBalance.toLocaleString()}`}
            change="2.3% from last month"
            isPositive={true}
            icon={Wallet}
            iconColor="bg-finance-accent"
            className="animate-fade-up"
          />
          <MetricCard 
            title="Monthly Income"
            value={`$${totalIncome.toLocaleString()}`}
            change="5.1% from last month"
            isPositive={true}
            icon={DollarSign}
            iconColor="bg-finance-income"
            className="animate-fade-up animate-delay-100"
          />
          <MetricCard 
            title="Monthly Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            change="1.4% from last month"
            isPositive={false}
            icon={ArrowUpDown}
            iconColor="bg-finance-expense"
            className="animate-fade-up animate-delay-200"
          />
          <MetricCard 
            title="Total Savings"
            value={`$${totalSavings.toLocaleString()}`}
            change="8.2% from last month"
            isPositive={true}
            icon={PiggyBank}
            iconColor="bg-finance-savings"
            className="animate-fade-up animate-delay-300"
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <BalanceChart data={balanceData} />
          <SpendingByCategory data={spendingCategoriesData} />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <SavingsGoals goals={savingsGoalsData} />
          <RecentTransactions transactions={recentTransactionsData} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
