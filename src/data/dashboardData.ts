
import { Transaction } from "@/components/RecentTransactions";
import { SavingsGoal } from "@/components/SavingsGoals";
import { SpendingCategory } from "@/components/SpendingByCategory";

export const balanceData = [
  { name: 'Jan', income: 0, expenses: 0, balance: 0 },
  { name: 'Feb', income: 0, expenses: 0, balance: 0 },
  { name: 'Mar', income: 0, expenses: 0, balance: 0 },
  { name: 'Apr', income: 0, expenses: 0, balance: 0 },
  { name: 'May', income: 0, expenses: 0, balance: 0 },
  { name: 'Jun', income: 0, expenses: 0, balance: 0 },
  { name: 'Jul', income: 0, expenses: 0, balance: 0 },
];

export const spendingCategoriesData: SpendingCategory[] = [
  { name: 'Housing', value: 0, color: '#FF5A5F' },
  { name: 'Food', value: 0, color: '#0EA5E9' },
  { name: 'Transport', value: 0, color: '#6554C0' },
  { name: 'Shopping', value: 0, color: '#00C781' },
  { name: 'Others', value: 0, color: '#94A3B8' }
];

export const savingsGoalsData: SavingsGoal[] = [];

export const recentTransactionsData: Transaction[] = [];

export const totalIncome = 0;
export const totalExpenses = 0;
export const totalSavings = 0;
export let totalBalance = 0; // Set to 0 but kept as 'let' so it can be modified
