
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PiggyBank } from 'lucide-react';

interface AddSavingsGoalProps {
  onAddGoal: (goal: {
    name: string;
    target: number;
    dueDate: string;
  }) => void;
}

const AddSavingsGoal: React.FC<AddSavingsGoalProps> = ({ onAddGoal }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !target || !dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const targetNum = parseFloat(target);
    if (isNaN(targetNum) || targetNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid target amount",
        variant: "destructive",
      });
      return;
    }

    onAddGoal({
      name,
      target: targetNum,
      dueDate,
    });

    toast({
      title: "Savings goal created",
      description: `${name}: $${targetNum.toLocaleString()}`,
    });

    // Reset form
    setName('');
    setTarget('');
    setDueDate('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Create Savings Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Goal Name
            </label>
            <input
              id="name"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Vacation, New Car, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="target" className="text-sm font-medium">
              Target Amount ($)
            </label>
            <input
              id="target"
              type="number"
              step="0.01"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="0.00"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="text-sm font-medium">
              Target Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            <PiggyBank className="mr-2 h-4 w-4" /> Create Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSavingsGoal;
