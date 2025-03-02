
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SavingsGoal } from '@/components/SavingsGoals';

interface UpdateSavingsProgressProps {
  goals: SavingsGoal[];
  onUpdateProgress: (id: string, amount: number) => void;
}

const UpdateSavingsProgress: React.FC<UpdateSavingsProgressProps> = ({ 
  goals, 
  onUpdateProgress 
}) => {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGoalId || !amount) {
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

    onUpdateProgress(selectedGoalId, amountNum);

    const goal = goals.find(g => g.id === selectedGoalId);
    toast({
      title: "Progress updated",
      description: `Added $${amountNum.toFixed(2)} to ${goal?.name}`,
    });

    // Reset form
    setSelectedGoalId('');
    setAmount('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Update Savings Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <p className="text-sm text-muted-foreground">Create a savings goal first.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="goal" className="text-sm font-medium">
                Select Goal
              </label>
              <select
                id="goal"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedGoalId}
                onChange={(e) => setSelectedGoalId(e.target.value)}
              >
                <option value="">Select a goal</option>
                {goals.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.name} (${goal.current.toLocaleString()} of ${goal.target.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount to Add ($)
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
            
            <Button type="submit" className="w-full">
              Update Progress
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateSavingsProgress;
