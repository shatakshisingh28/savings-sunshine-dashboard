
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

interface BudgetPlannerProps {
  budgets: Budget[];
  onAddBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
}

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({ budgets, onAddBudget }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !limit) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const limitNum = parseFloat(limit);
    if (isNaN(limitNum) || limitNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget limit",
        variant: "destructive",
      });
      return;
    }

    // Check if budget for this category already exists
    const existingBudget = budgets.find(b => b.category === category);
    if (existingBudget) {
      toast({
        title: "Budget already exists",
        description: `You already have a budget for ${category}`,
        variant: "destructive",
      });
      return;
    }

    onAddBudget({
      category,
      limit: limitNum,
    });

    toast({
      title: "Budget created",
      description: `$${limitNum.toFixed(2)} for ${category}`,
    });

    // Reset form
    setCategory('');
    setLimit('');
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Budget Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="food">Food</option>
              <option value="housing">Housing</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="utilities">Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="limit" className="text-sm font-medium">
              Monthly Limit ($)
            </label>
            <input
              id="limit"
              type="number"
              step="0.01"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="0.00"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Create Budget
          </Button>
        </form>

        <div className="space-y-6">
          <h3 className="text-sm font-medium">Current Budgets</h3>
          {budgets.length === 0 ? (
            <p className="text-sm text-muted-foreground">No budgets set yet.</p>
          ) : (
            budgets.map((budget) => {
              const progress = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
              const isNearLimit = progress >= 80;
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{budget.category}</span>
                    <div className="flex items-center">
                      <span className="text-sm">${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}</span>
                      {isNearLimit && (
                        <AlertCircle className="ml-2 h-4 w-4 text-finance-expense" />
                      )}
                    </div>
                  </div>
                  
                  <Progress 
                    value={progress} 
                    className={`h-2 ${isNearLimit ? 'bg-finance-expense/30' : 'bg-primary/30'}`} 
                  />
                  
                  <div className="flex justify-end">
                    <span className={`text-xs ${isNearLimit ? 'text-finance-expense' : 'text-muted-foreground'}`}>
                      {progress}% used
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPlanner;
