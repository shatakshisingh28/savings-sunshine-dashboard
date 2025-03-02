import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpRight, Coffee, CreditCard, ShoppingBag, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  category: string;
  timestamp?: number; // Unix timestamp for real-time display
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="h-4 w-4" />,
  shopping: <ShoppingBag className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
  default: <CreditCard className="h-4 w-4" />
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // Update time every minute to refresh relative timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Function to format transaction time in a relative format
  const formatTransactionTime = (dateString: string, timestamp?: number) => {
    // If we have a timestamp, use it for relative time
    if (timestamp) {
      return formatDistanceToNow(timestamp, { addSuffix: true });
    }
    
    // Otherwise, display the original date string
    return dateString;
  };
  
  // Format transaction amount with proper currency symbol
  const formatAmount = (amount: number) => {
    return Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  };

  return (
    <Card className="col-span-3 transition-all duration-200 hover:shadow-medium animate-fade-up animate-delay-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <div className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
          Live
          <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CreditCard className="h-10 w-10 text-muted-foreground mb-2 opacity-50" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-xs text-muted-foreground mt-1">Transactions will appear here as you add them</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 hover:bg-muted/30 p-2 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center mr-3",
                    transaction.type === 'expense' ? "bg-finance-expense/10" : "bg-finance-income/10"
                  )}>
                    {transaction.type === 'expense' 
                      ? <ArrowUpRight className="h-4 w-4 text-finance-expense" />
                      : <ArrowDownLeft className="h-4 w-4 text-finance-income" />
                    }
                  </div>
                  <div>
                    <p className="font-medium flex items-center">
                      {transaction.title}
                      {transaction.timestamp && Date.now() - transaction.timestamp < 300000 && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full animate-pulse">New</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      {formatTransactionTime(transaction.date, transaction.timestamp)}
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                      <span className="flex items-center">
                        {categoryIcons[transaction.category.toLowerCase()] || categoryIcons.default}
                        <span className="ml-1 capitalize">{transaction.category}</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={cn(
                    "font-medium",
                    transaction.type === 'expense' ? "text-finance-expense" : "text-finance-income"
                  )}>
                    {transaction.type === 'expense' ? '-' : '+'} {formatAmount(transaction.amount)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
