
import { Transaction } from "@/components/RecentTransactions";
import { SavingsGoal } from "@/components/SavingsGoals";
import { SpendingCategory } from "@/components/SpendingByCategory";

export const balanceData = [
  { name: 'Jan', income: 2500, expenses: 1800, balance: 700 },
  { name: 'Feb', income: 2700, expenses: 2000, balance: 700 },
  { name: 'Mar', income: 2600, expenses: 1900, balance: 700 },
  { name: 'Apr', income: 3000, expenses: 2200, balance: 800 },
  { name: 'May', income: 2800, expenses: 2100, balance: 700 },
  { name: 'Jun', income: 3200, expenses: 2300, balance: 900 },
  { name: 'Jul', income: 3500, expenses: 2400, balance: 1100 },
];

export const spendingCategoriesData: SpendingCategory[] = [
  { name: 'Housing', value: 1200, color: '#FF5A5F' },
  { name: 'Food', value: 500, color: '#0EA5E9' },
  { name: 'Transport', value: 300, color: '#6554C0' },
  { name: 'Shopping', value: 200, color: '#00C781' },
  { name: 'Others', value: 200, color: '#94A3B8' }
];

export const savingsGoalsData: SavingsGoal[] = [
  { id: "1", name: "Emergency Fund", current: 3000, target: 10000, dueDate: "Dec 2023" },
  { id: "2", name: "Vacation", current: 1500, target: 3000, dueDate: "Aug 2023" },
];

export const recentTransactionsData: Transaction[] = [
  { 
    id: "1", 
    title: "Grocery Shopping", 
    amount: 85.75, 
    date: "Today", 
    type: "expense", 
    category: "Food",
    timestamp: Date.now() - 3600000 // 1 hour ago
  },
  { 
    id: "2", 
    title: "Salary Deposit", 
    amount: 3200, 
    date: "Yesterday", 
    type: "income", 
    category: "Salary",
    timestamp: Date.now() - 86400000 // 1 day ago
  },
  { 
    id: "3", 
    title: "Restaurant Bill", 
    amount: 56.50, 
    date: "3 days ago", 
    type: "expense", 
    category: "Food",
    timestamp: Date.now() - (3 * 86400000) // 3 days ago
  },
];

export const totalIncome = 3500;
export const totalExpenses = 2400;
export const totalSavings = 4500;
export let totalBalance = 8000; // Set to a starting value but kept as 'let' so it can be modified
