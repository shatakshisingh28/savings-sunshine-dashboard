
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import BalanceChart from '@/components/BalanceChart';
import SpendingByCategory from '@/components/SpendingByCategory';
import SavingsGoals from '@/components/SavingsGoals';
import RecentTransactions from '@/components/RecentTransactions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  ArrowUpDown, 
  DollarSign, 
  PiggyBank, 
  Wallet,
  RotateCcw
} from 'lucide-react';

import { 
  balanceData as initialBalanceData, 
  recentTransactionsData as initialTransactionsData, 
  savingsGoalsData as initialSavingsGoalsData, 
  spendingCategoriesData as initialSpendingCategoriesData,
  totalBalance as initialTotalBalance,
  totalExpenses as initialTotalExpenses,
  totalIncome as initialTotalIncome,
  totalSavings as initialTotalSavings
} from '@/data/dashboardData';

const Index = () => {
  // State for all the data
  const [totalBalance, setTotalBalance] = useState(initialTotalBalance);
  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);
  const [totalExpenses, setTotalExpenses] = useState(initialTotalExpenses);
  const [totalSavings, setTotalSavings] = useState(initialTotalSavings);
  const [balanceData, setBalanceData] = useState(initialBalanceData);
  const [transactions, setTransactions] = useState(initialTransactionsData);
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoalsData);
  const [spendingCategories, setSpendingCategories] = useState(initialSpendingCategoriesData);
  const { toast } = useToast();

  // Reset balance dialog state
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [newBalance, setNewBalance] = useState('');

  // Function to handle balance reset/update
  const handleBalanceReset = () => {
    const balanceAmount = parseFloat(newBalance);
    
    if (isNaN(balanceAmount) || balanceAmount < 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    
    setTotalBalance(balanceAmount);
    setShowBalanceDialog(false);
    setNewBalance('');
    
    toast({
      title: "Balance Updated",
      description: `Total balance has been set to $${balanceAmount.toLocaleString()}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-semibold mb-6">Financial Overview</h1>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="relative group">
            <button 
              onClick={() => setShowBalanceDialog(true)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Reset balance"
              title="Set balance manually"
            >
              <RotateCcw className="h-4 w-4 text-gray-500" />
            </button>
            <MetricCard 
              title="Total Balance"
              value={`$${totalBalance.toLocaleString()}`}
              icon={Wallet}
              iconColor="bg-finance-accent"
              className="animate-fade-up group-hover:shadow-md transition-all"
            />
          </div>
          <MetricCard 
            title="Monthly Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={DollarSign}
            iconColor="bg-finance-income"
            className="animate-fade-up animate-delay-100"
          />
          <MetricCard 
            title="Monthly Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={ArrowUpDown}
            iconColor="bg-finance-expense"
            className="animate-fade-up animate-delay-200"
          />
          <MetricCard 
            title="Total Savings"
            value={`$${totalSavings.toLocaleString()}`}
            icon={PiggyBank}
            iconColor="bg-finance-savings"
            className="animate-fade-up animate-delay-300"
          />
        </div>

        {/* Balance Update Dialog */}
        <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Total Balance</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="balance" className="text-sm font-medium block mb-2">
                Enter New Balance Amount ($)
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                min="0"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBalanceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleBalanceReset}>
                Update Balance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Set Balance Button */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={() => setShowBalanceDialog(true)}
            variant="default"
            className="border-finance-accent bg-finance-accent text-white hover:bg-finance-accent/90">
            <Wallet className="mr-2 h-4 w-4" />
            Set Balance Manually
          </Button>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <BalanceChart data={balanceData} />
          <SpendingByCategory data={spendingCategories} />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <SavingsGoals goals={savingsGoals} />
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
