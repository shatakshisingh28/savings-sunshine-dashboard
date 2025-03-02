
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpRight, Coffee, CreditCard, ShoppingBag, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  category: string;
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
  return (
    <Card className="col-span-3 transition-all duration-200 hover:shadow-medium animate-fade-up animate-delay-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
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
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={cn(
                  "font-medium",
                  transaction.type === 'expense' ? "text-finance-expense" : "text-finance-income"
                )}>
                  {transaction.type === 'expense' ? '-' : '+'} ${Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
