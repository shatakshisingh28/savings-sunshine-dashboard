
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
  RotateCcw,
  Plus,
  PenLine,
  Edit,
  BarChart2,
  LineChart
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

  // Dialog states
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [showExpensesDialog, setShowExpensesDialog] = useState(false);
  const [showSavingsDialog, setShowSavingsDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  // Input states
  const [newBalance, setNewBalance] = useState('');
  const [newIncome, setNewIncome] = useState('');
  const [newExpenses, setNewExpenses] = useState('');
  const [newSavings, setNewSavings] = useState('');
  const [editingMonth, setEditingMonth] = useState('');
  const [newMonthIncome, setNewMonthIncome] = useState('');
  const [newMonthExpenses, setNewMonthExpenses] = useState('');
  const [editingCategory, setEditingCategory] = useState<SpendingCategory | null>(null);
  const [newCategoryValue, setNewCategoryValue] = useState('');

  // Helper function to validate number input
  const validateAmount = (value: string): number | null => {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return null;
    }
    return amount;
  };

  // Function to handle balance update
  const handleBalanceUpdate = () => {
    const balanceAmount = validateAmount(newBalance);
    if (balanceAmount === null) return;
    
    setTotalBalance(balanceAmount);
    setShowBalanceDialog(false);
    setNewBalance('');
    
    toast({
      title: "Balance Updated",
      description: `Total balance has been set to $${balanceAmount.toLocaleString()}`,
    });
  };

  // Function to handle income update
  const handleIncomeUpdate = () => {
    const incomeAmount = validateAmount(newIncome);
    if (incomeAmount === null) return;
    
    setTotalIncome(incomeAmount);
    setShowIncomeDialog(false);
    setNewIncome('');
    
    toast({
      title: "Income Updated",
      description: `Monthly income has been set to $${incomeAmount.toLocaleString()}`,
    });
  };

  // Function to handle expenses update
  const handleExpensesUpdate = () => {
    const expensesAmount = validateAmount(newExpenses);
    if (expensesAmount === null) return;
    
    setTotalExpenses(expensesAmount);
    setShowExpensesDialog(false);
    setNewExpenses('');
    
    toast({
      title: "Expenses Updated",
      description: `Monthly expenses have been set to $${expensesAmount.toLocaleString()}`,
    });
  };

  // Function to handle savings update
  const handleSavingsUpdate = () => {
    const savingsAmount = validateAmount(newSavings);
    if (savingsAmount === null) return;
    
    setTotalSavings(savingsAmount);
    setShowSavingsDialog(false);
    setNewSavings('');
    
    toast({
      title: "Savings Updated",
      description: `Total savings have been set to $${savingsAmount.toLocaleString()}`,
    });
  };

  // Function to handle chart data update
  const handleChartUpdate = () => {
    const incomeAmount = validateAmount(newMonthIncome);
    const expensesAmount = validateAmount(newMonthExpenses);
    if (incomeAmount === null || expensesAmount === null) return;
    
    const updatedBalanceData = balanceData.map(month => {
      if (month.name === editingMonth) {
        return {
          ...month,
          income: incomeAmount,
          expenses: expensesAmount,
          balance: incomeAmount - expensesAmount
        };
      }
      return month;
    });
    
    setBalanceData(updatedBalanceData);
    setShowChartDialog(false);
    setEditingMonth('');
    setNewMonthIncome('');
    setNewMonthExpenses('');
    
    toast({
      title: "Chart Data Updated",
      description: `Data for ${editingMonth} has been updated`,
    });
  };

  // Function to handle category update
  const handleCategoryUpdate = () => {
    if (!editingCategory) return;
    const categoryAmount = validateAmount(newCategoryValue);
    if (categoryAmount === null) return;
    
    const updatedCategories = spendingCategories.map(category => {
      if (category.name === editingCategory.name) {
        return {
          ...category,
          value: categoryAmount
        };
      }
      return category;
    });
    
    setSpendingCategories(updatedCategories);
    setShowCategoryDialog(false);
    setEditingCategory(null);
    setNewCategoryValue('');
    
    toast({
      title: "Category Updated",
      description: `${editingCategory.name} has been set to $${categoryAmount.toLocaleString()}`,
    });
  };

  // Function to open chart editing dialog
  const handleEditChartMonth = (month: string) => {
    const monthData = balanceData.find(m => m.name === month);
    if (monthData) {
      setEditingMonth(month);
      setNewMonthIncome(monthData.income.toString());
      setNewMonthExpenses(monthData.expenses.toString());
      setShowChartDialog(true);
    }
  };

  // Function to open category editing dialog
  const handleEditCategory = (category: SpendingCategory) => {
    setEditingCategory(category);
    setNewCategoryValue(category.value.toString());
    setShowCategoryDialog(true);
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
              aria-label="Edit balance"
              title="Edit balance"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </button>
            <MetricCard 
              title="Total Balance"
              value={`$${totalBalance.toLocaleString()}`}
              icon={Wallet}
              iconColor="bg-finance-accent"
              className="animate-fade-up group-hover:shadow-md transition-all"
            />
          </div>
          <div className="relative group">
            <button 
              onClick={() => setShowIncomeDialog(true)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit income"
              title="Edit income"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </button>
            <MetricCard 
              title="Monthly Income"
              value={`$${totalIncome.toLocaleString()}`}
              icon={DollarSign}
              iconColor="bg-finance-income"
              className="animate-fade-up animate-delay-100"
            />
          </div>
          <div className="relative group">
            <button 
              onClick={() => setShowExpensesDialog(true)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit expenses"
              title="Edit expenses"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </button>
            <MetricCard 
              title="Monthly Expenses"
              value={`$${totalExpenses.toLocaleString()}`}
              icon={ArrowUpDown}
              iconColor="bg-finance-expense"
              className="animate-fade-up animate-delay-200"
            />
          </div>
          <div className="relative group">
            <button 
              onClick={() => setShowSavingsDialog(true)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit savings"
              title="Edit savings"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </button>
            <MetricCard 
              title="Total Savings"
              value={`$${totalSavings.toLocaleString()}`}
              icon={PiggyBank}
              iconColor="bg-finance-savings"
              className="animate-fade-up animate-delay-300"
            />
          </div>
        </div>

        {/* Balance Dialog */}
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
              <Button onClick={handleBalanceUpdate}>
                Update Balance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Income Dialog */}
        <Dialog open={showIncomeDialog} onOpenChange={setShowIncomeDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Monthly Income</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="income" className="text-sm font-medium block mb-2">
                Enter New Monthly Income ($)
              </label>
              <Input
                id="income"
                type="number"
                step="0.01"
                min="0"
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIncomeDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleIncomeUpdate}>
                Update Income
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Expenses Dialog */}
        <Dialog open={showExpensesDialog} onOpenChange={setShowExpensesDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Monthly Expenses</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="expenses" className="text-sm font-medium block mb-2">
                Enter New Monthly Expenses ($)
              </label>
              <Input
                id="expenses"
                type="number"
                step="0.01"
                min="0"
                value={newExpenses}
                onChange={(e) => setNewExpenses(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExpensesDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleExpensesUpdate}>
                Update Expenses
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Savings Dialog */}
        <Dialog open={showSavingsDialog} onOpenChange={setShowSavingsDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Total Savings</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="savings" className="text-sm font-medium block mb-2">
                Enter New Total Savings ($)
              </label>
              <Input
                id="savings"
                type="number"
                step="0.01"
                min="0"
                value={newSavings}
                onChange={(e) => setNewSavings(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSavingsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavingsUpdate}>
                Update Savings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Chart Month Edit Dialog */}
        <Dialog open={showChartDialog} onOpenChange={setShowChartDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {editingMonth} Data</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label htmlFor="monthIncome" className="text-sm font-medium block mb-2">
                  Income for {editingMonth} ($)
                </label>
                <Input
                  id="monthIncome"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newMonthIncome}
                  onChange={(e) => setNewMonthIncome(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="monthExpenses" className="text-sm font-medium block mb-2">
                  Expenses for {editingMonth} ($)
                </label>
                <Input
                  id="monthExpenses"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newMonthExpenses}
                  onChange={(e) => setNewMonthExpenses(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowChartDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleChartUpdate}>
                Update Chart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Category Edit Dialog */}
        <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {editingCategory?.name} Amount</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="categoryValue" className="text-sm font-medium block mb-2">
                Amount for {editingCategory?.name} ($)
              </label>
              <Input
                id="categoryValue"
                type="number"
                step="0.01"
                min="0"
                value={newCategoryValue}
                onChange={(e) => setNewCategoryValue(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCategoryUpdate}>
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Manual Edit Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={() => setShowBalanceDialog(true)}
            variant="default"
            className="border-finance-accent bg-finance-accent text-white hover:bg-finance-accent/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Balance
          </Button>
          <Button
            onClick={() => setShowIncomeDialog(true)}
            variant="default"
            className="border-finance-income bg-finance-income text-white hover:bg-finance-income/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Income
          </Button>
          <Button
            onClick={() => setShowExpensesDialog(true)}
            variant="default"
            className="border-finance-expense bg-finance-expense text-white hover:bg-finance-expense/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Expenses
          </Button>
          <Button
            onClick={() => setShowSavingsDialog(true)}
            variant="default"
            className="border-finance-savings bg-finance-savings text-white hover:bg-finance-savings/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Savings
          </Button>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-3 relative group">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                {balanceData.map((month) => (
                  <Button 
                    key={month.name}
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditChartMonth(month.name)}
                    className="bg-white/80 hover:bg-white"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {month.name}
                  </Button>
                ))}
              </div>
            </div>
            <BalanceChart data={balanceData} />
          </div>
          <div className="relative group">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="space-y-2">
                {spendingCategories.map((category) => (
                  <Button 
                    key={category.name}
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCategory(category)}
                    className="bg-white/80 hover:bg-white w-full flex justify-between"
                  >
                    <span>
                      <div 
                        className="w-3 h-3 rounded-full inline-block mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </span>
                    <Edit className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
            <SpendingByCategory data={spendingCategories} />
          </div>
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
