
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Smartphone } from 'lucide-react';

interface UpiTransactionFormProps {
  onAddUpiTransaction: (transaction: {
    title: string;
    amount: number;
    upiId: string;
    transactionId: string;
    type: 'expense' | 'income';
  }) => void;
}

const UpiTransactionForm: React.FC<UpiTransactionFormProps> = ({ onAddUpiTransaction }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !upiId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
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

    // Generate transaction ID if not provided
    const finalTransactionId = transactionId || `UPI${Date.now().toString().slice(-8)}`;

    onAddUpiTransaction({
      title,
      amount: amountNum,
      upiId,
      transactionId: finalTransactionId,
      type,
    });

    toast({
      title: "UPI transaction added",
      description: `${type === 'expense' ? 'Payment to' : 'Payment from'} ${upiId}`,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setUpiId('');
    setTransactionId('');
  };

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Smartphone className="mr-2 h-5 w-5 text-blue-500" />
          Add UPI Transaction
        </CardTitle>
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
              placeholder="Grocery payment, Rent transfer, etc."
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
            <label htmlFor="upiId" className="text-sm font-medium">
              UPI ID
            </label>
            <input
              id="upiId"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="name@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="transactionId" className="text-sm font-medium">
              Transaction ID (Optional)
            </label>
            <input
              id="transactionId"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Auto-generated if empty"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Transaction Type</label>
            <div className="flex mt-1 space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Payment (Expense)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Receive (Income)</span>
              </label>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Smartphone className="mr-2 h-4 w-4" /> Process UPI Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpiTransactionForm;
