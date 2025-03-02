
import { Transaction } from "@/components/RecentTransactions";
import { SavingsGoal } from "@/components/SavingsGoals";
import { SpendingCategory } from "@/components/SpendingByCategory";

export const balanceData = [
  { name: 'Jan', income: 5000, expenses: 3200, balance: 1800 },
  { name: 'Feb', income: 5200, expenses: 3500, balance: 1700 },
  { name: 'Mar', income: 5400, expenses: 3100, balance: 2300 },
  { name: 'Apr', income: 5300, expenses: 3800, balance: 1500 },
  { name: 'May', income: 5600, expenses: 3300, balance: 2300 },
  { name: 'Jun', income: 5800, expenses: 3700, balance: 2100 },
  { name: 'Jul', income: 6000, expenses: 3500, balance: 2500 },
];

export const spendingCategoriesData: SpendingCategory[] = [
  { name: 'Housing', value: 1500, color: '#FF5A5F' },
  { name: 'Food', value: 800, color: '#0EA5E9' },
  { name: 'Transport', value: 400, color: '#6554C0' },
  { name: 'Shopping', value: 600, color: '#00C781' },
  { name: 'UPI Payments', value: 350, color: '#6366F1' },
  { name: 'Others', value: 200, color: '#94A3B8' }
];

export const savingsGoalsData: SavingsGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    current: 10000,
    target: 15000,
    dueDate: '2024-12-31'
  },
  {
    id: '2',
    name: 'Vacation',
    current: 2500,
    target: 5000,
    dueDate: '2025-06-30'
  },
  {
    id: '3',
    name: 'New Car',
    current: 8000,
    target: 25000,
    dueDate: '2025-12-31'
  }
];

export const recentTransactionsData: Transaction[] = [
  // UPI Transaction examples
  {
    id: 'upi1',
    title: 'Grocery Store Payment',
    amount: 87.50,
    date: 'Today, 1:45 PM',
    type: 'expense',
    category: 'upi',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
    upiDetails: {
      upiId: 'grocerystore@upi',
      transactionId: 'UPI12345678',
      status: 'completed'
    }
  },
  {
    id: 'upi2',
    title: 'Rent Payment',
    amount: 850.00,
    date: 'Today, 10:30 AM',
    type: 'expense',
    category: 'upi',
    timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
    upiDetails: {
      upiId: 'landlord@upi',
      transactionId: 'UPI87654321',
      status: 'completed'
    }
  },
  {
    id: 'upi3',
    title: 'Friend Payment',
    amount: 25.75,
    date: 'Yesterday, 5:20 PM',
    type: 'income',
    category: 'upi',
    timestamp: Date.now() - 1000 * 60 * 60 * 28, // 28 hours ago
    upiDetails: {
      upiId: 'friend@upi',
      transactionId: 'UPI23456789',
      status: 'completed'
    }
  },
  // Regular transactions
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 120.50,
    date: 'Yesterday, 2:30 PM',
    type: 'expense',
    category: 'food',
    timestamp: Date.now() - 1000 * 60 * 60 * 26 // 26 hours ago
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 5200.00,
    date: '2 days ago, 9:15 AM',
    type: 'income',
    category: 'income',
    timestamp: Date.now() - 1000 * 60 * 60 * 48 // 2 days ago
  },
  {
    id: '3',
    title: 'Restaurant Bill',
    amount: 85.75,
    date: 'Mar 25, 7:45 PM',
    type: 'expense',
    category: 'food',
    timestamp: Date.now() - 1000 * 60 * 60 * 72 // 3 days ago
  },
  {
    id: '4',
    title: 'Amazon Purchase',
    amount: 49.99,
    date: 'Mar 23, 11:30 AM',
    type: 'expense',
    category: 'shopping',
    timestamp: Date.now() - 1000 * 60 * 60 * 96 // 4 days ago
  },
  {
    id: '5',
    title: 'Freelance Payment',
    amount: 750.00,
    date: 'Mar 22, 3:20 PM',
    type: 'income',
    category: 'income',
    timestamp: Date.now() - 1000 * 60 * 60 * 120 // 5 days ago
  }
];

export const totalIncome = 5950;
export const totalExpenses = 3500;
export const totalSavings = 2450;
export const totalBalance = 24850;
