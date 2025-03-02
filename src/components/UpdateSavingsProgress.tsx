
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SavingsGoal } from '@/components/SavingsGoals';
import { PiggyBank, TrendingUp, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const selectedGoal = goals.find(g => g.id === selectedGoalId);
  const progress = selectedGoal 
    ? Math.min(100, Math.round((selectedGoal.current / selectedGoal.target) * 100)) 
    : 0;

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

    setIsUpdating(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      onUpdateProgress(selectedGoalId, amountNum);

      const goal = goals.find(g => g.id === selectedGoalId);
      toast({
        title: "Progress updated",
        description: `Added $${amountNum.toFixed(2)} to ${goal?.name}`,
      });

      // Reset form
      setSelectedGoalId('');
      setAmount('');
      setIsUpdating(false);
    }, 600);
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-medium animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-finance-accent/10 to-finance-savings/10">
        <CardTitle className="text-lg font-medium flex items-center">
          <PiggyBank className="mr-2 h-5 w-5 text-finance-savings" />
          Update Savings Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {goals.length === 0 ? (
          <div className="text-center py-4">
            <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">Create a savings goal first.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="goal" className="text-sm font-medium block mb-1.5">
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
            
            {selectedGoalId && (
              <div className="bg-muted p-3 rounded-md animate-fade-in">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{selectedGoal?.name}</span>
                  <span className="text-xs text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mb-1" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">${selectedGoal?.current.toLocaleString()}</span>
                  <span className="text-muted-foreground">${selectedGoal?.target.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="amount" className="text-sm font-medium block mb-1.5">
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
            
            <Button 
              type="submit" 
              className="w-full relative group" 
              disabled={isUpdating}
            >
              <span className="flex items-center justify-center">
                {isUpdating ? (
                  <TrendingUp className="mr-2 h-4 w-4 animate-pulse" />
                ) : (
                  <PiggyBank className="mr-2 h-4 w-4" />
                )}
                {isUpdating ? "Updating..." : "Update Progress"}
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateSavingsProgress;
