
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import BalanceChart from '@/components/BalanceChart';
import SpendingByCategory from '@/components/SpendingByCategory';
import SavingsGoals from '@/components/SavingsGoals';
import RecentTransactions from '@/components/RecentTransactions';
import ExpenseForm from '@/components/ExpenseForm';
import IncomeForm from '@/components/IncomeForm';
import UpiTransactionForm from '@/components/UpiTransactionForm';
import BudgetPlanner from '@/components/BudgetPlanner';
import AddSavingsGoal from '@/components/AddSavingsGoal';
import UpdateSavingsProgress from '@/components/UpdateSavingsProgress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowUpDown, 
  DollarSign, 
  PiggyBank, 
  Wallet,
  Plus,
  Minus,
  LineChart,
  Smartphone
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
import { Transaction } from '@/components/RecentTransactions';
import { SavingsGoal } from '@/components/SavingsGoals';
import { SpendingCategory } from '@/components/SpendingByCategory';
import { Budget } from '@/components/BudgetPlanner';

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
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const { toast } = useToast();

  // Show forms state
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);

  // Function to add a new expense
  const handleAddExpense = (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    // Create transaction object
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      type: 'expense',
      category: expense.category,
      timestamp: Date.now() // Add current timestamp
    };

    // Update transactions list
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update total expenses
    setTotalExpenses(prev => prev + expense.amount);
    
    // Update total balance
    setTotalBalance(prev => prev - expense.amount);
    
    // Update spending categories
    const categoryIndex = spendingCategories.findIndex(cat => cat.name.toLowerCase() === expense.category);
    
    if (categoryIndex !== -1) {
      const updatedCategories = [...spendingCategories];
      updatedCategories[categoryIndex].value += expense.amount;
      setSpendingCategories(updatedCategories);
    } else {
      // Add new category if it doesn't exist
      const newCategory: SpendingCategory = {
        name: expense.category.charAt(0).toUpperCase() + expense.category.slice(1),
        value: expense.amount,
        color: getRandomColor()
      };
      setSpendingCategories(prev => [...prev, newCategory]);
    }

    // Update budget if exists
    const budgetIndex = budgets.findIndex(b => b.category.toLowerCase() === expense.category.toLowerCase());
    if (budgetIndex !== -1) {
      const updatedBudgets = [...budgets];
      updatedBudgets[budgetIndex].spent += expense.amount;
      
      // Check if we're over budget
      if (updatedBudgets[budgetIndex].spent >= updatedBudgets[budgetIndex].limit) {
        toast({
          title: "Budget Alert",
          description: `You've exceeded your ${expense.category} budget`,
          variant: "destructive",
        });
      } else if (updatedBudgets[budgetIndex].spent >= 0.8 * updatedBudgets[budgetIndex].limit) {
        toast({
          title: "Budget Warning",
          description: `You're approaching your ${expense.category} budget limit`,
        });
      }
      
      setBudgets(updatedBudgets);
    }

    // Hide form after submission
    setShowExpenseForm(false);
  };

  // Function to add a new income
  const handleAddIncome = (income: {
    title: string;
    amount: number;
    source: string;
    date: string;
  }) => {
    // Create transaction object
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: income.title,
      amount: income.amount,
      date: income.date,
      type: 'income',
      category: income.source,
      timestamp: Date.now() // Add current timestamp
    };

    // Update transactions list
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update total income
    setTotalIncome(prev => prev + income.amount);
    
    // Update total balance
    setTotalBalance(prev => prev + income.amount);

    // Hide form after submission
    setShowIncomeForm(false);
  };

  // Function to add a new UPI transaction
  const handleAddUpiTransaction = (upiTransaction: {
    title: string;
    amount: number;
    upiId: string;
    transactionId: string;
    type: 'expense' | 'income';
  }) => {
    // Create transaction object
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: upiTransaction.title,
      amount: upiTransaction.amount,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      type: upiTransaction.type,
      category: 'upi',
      timestamp: Date.now(), // Add current timestamp
      upiDetails: {
        upiId: upiTransaction.upiId,
        transactionId: upiTransaction.transactionId,
        status: 'completed'
      }
    };

    // Update transactions list
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update totals based on transaction type
    if (upiTransaction.type === 'expense') {
      setTotalExpenses(prev => prev + upiTransaction.amount);
      setTotalBalance(prev => prev - upiTransaction.amount);
      
      // Update UPI Payments category in spending categories
      const categoryIndex = spendingCategories.findIndex(cat => cat.name === 'UPI Payments');
      if (categoryIndex !== -1) {
        const updatedCategories = [...spendingCategories];
        updatedCategories[categoryIndex].value += upiTransaction.amount;
        setSpendingCategories(updatedCategories);
      }
    } else {
      setTotalIncome(prev => prev + upiTransaction.amount);
      setTotalBalance(prev => prev + upiTransaction.amount);
    }

    // Show success notification
    toast({
      title: "UPI Transaction Processed",
      description: `${upiTransaction.type === 'expense' ? 'Paid' : 'Received'} ${upiTransaction.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })} ${upiTransaction.type === 'expense' ? 'to' : 'from'} ${upiTransaction.upiId}`,
    });

    // Hide form after submission
    setShowUpiForm(false);
  };

  // Function to add a new budget
  const handleAddBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: budget.category,
      limit: budget.limit,
      spent: 0
    };

    setBudgets(prev => [...prev, newBudget]);
  };

  // Function to add a new savings goal
  const handleAddSavingsGoal = (goal: {
    name: string;
    target: number;
    dueDate: string;
  }) => {
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: goal.name,
      current: 0,
      target: goal.target,
      dueDate: goal.dueDate
    };

    setSavingsGoals(prev => [...prev, newGoal]);
    
    // Hide form after submission
    setShowAddGoalForm(false);
  };

  // Function to update a savings goal progress
  const handleUpdateSavingsProgress = (id: string, amount: number) => {
    const updatedGoals = savingsGoals.map(goal => {
      if (goal.id === id) {
        const newCurrent = goal.current + amount;
        
        // Check if goal reached
        if (newCurrent >= goal.target && goal.current < goal.target) {
          toast({
            title: "Goal Reached! 🎉",
            description: `Congratulations! You've reached your "${goal.name}" savings goal.`,
          });
        }
        
        return {
          ...goal,
          current: newCurrent
        };
      }
      return goal;
    });

    setSavingsGoals(updatedGoals);
    setTotalSavings(prev => prev + amount);
    setTotalBalance(prev => prev - amount);
  };

  // Helper function to generate a random color for new categories
  const getRandomColor = () => {
    const colors = ['#FF5A5F', '#0EA5E9', '#6554C0', '#00C781', '#94A3B8', '#8B5CF6', '#EC4899', '#F59E0B'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            onClick={() => setShowExpenseForm(!showExpenseForm)} 
            variant={showExpenseForm ? "default" : "outline"}>
            <Minus className="mr-2 h-4 w-4" /> 
            {showExpenseForm ? "Hide Expense Form" : "Add Expense"}
          </Button>
          <Button 
            onClick={() => setShowIncomeForm(!showIncomeForm)} 
            variant={showIncomeForm ? "default" : "outline"}>
            <Plus className="mr-2 h-4 w-4" /> 
            {showIncomeForm ? "Hide Income Form" : "Add Income"}
          </Button>
          <Button 
            onClick={() => setShowUpiForm(!showUpiForm)} 
            variant={showUpiForm ? "default" : "outline"}
            className="bg-blue-600 hover:bg-blue-700 text-white">
            <Smartphone className="mr-2 h-4 w-4" /> 
            {showUpiForm ? "Hide UPI Form" : "UPI Transaction"}
          </Button>
          <Button 
            onClick={() => setShowAddGoalForm(!showAddGoalForm)} 
            variant={showAddGoalForm ? "default" : "outline"}>
            <PiggyBank className="mr-2 h-4 w-4" /> 
            {showAddGoalForm ? "Hide Goal Form" : "Add Savings Goal"}
          </Button>
        </div>
        
        {/* Forms Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {showExpenseForm && (
            <ExpenseForm onAddExpense={handleAddExpense} />
          )}
          {showIncomeForm && (
            <IncomeForm onAddIncome={handleAddIncome} />
          )}
          {showUpiForm && (
            <UpiTransactionForm onAddUpiTransaction={handleAddUpiTransaction} />
          )}
          {showAddGoalForm && (
            <AddSavingsGoal onAddGoal={handleAddSavingsGoal} />
          )}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <BalanceChart data={balanceData} />
          <SpendingByCategory data={spendingCategories} />
        </div>

        {/* Budget and Goal Management Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BudgetPlanner 
            budgets={budgets} 
            onAddBudget={handleAddBudget}
          />
          <UpdateSavingsProgress 
            goals={savingsGoals}
            onUpdateProgress={handleUpdateSavingsProgress}
          />
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
