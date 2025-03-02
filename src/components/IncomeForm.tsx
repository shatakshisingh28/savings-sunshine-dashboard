
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

interface IncomeFormProps {
  onAddIncome: (income: {
    title: string;
    amount: number;
    source: string;
    date: string;
  }) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAddIncome }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !source) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getHours()}:${today.getMinutes() < 10 ? '0' : ''}${today.getMinutes()} ${today.getHours() >= 12 ? 'PM' : 'AM'}`;

    onAddIncome({
      title,
      amount: amountNum,
      source,
      date: formattedDate,
    });

    toast({
      title: "Income added",
      description: `$${amountNum.toFixed(2)} from ${title}`,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setSource('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Add New Income</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Description
            </label>
            <input
              id="title"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Monthly salary, Freelance work, etc."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="text-sm font-medium">
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="source" className="text-sm font-medium">
              Source
            </label>
            <select
              id="source"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Select a source</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="investments">Investments</option>
              <option value="business">Business</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Income
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncomeForm;
