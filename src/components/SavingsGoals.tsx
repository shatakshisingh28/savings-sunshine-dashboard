
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  dueDate: string;
}

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  onEdit?: (goal: SavingsGoal) => void;
  onDelete?: (goalId: string) => void;
  onAddNew?: () => void;
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ 
  goals, 
  onEdit, 
  onDelete,
  onAddNew 
}) => {
  return (
    <Card className="col-span-2 transition-all duration-200 hover:shadow-medium animate-fade-up animate-delay-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        {onAddNew && (
          <Button 
            onClick={onAddNew} 
            size="sm" 
            variant="outline" 
            className="h-8 gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Goal</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No savings goals yet</p>
            {onAddNew && (
              <Button 
                onClick={onAddNew} 
                variant="outline" 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add your first goal
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {goals.map((goal) => {
              const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div key={goal.id} className="space-y-2 relative group">
                  {onEdit && (
                    <div className="absolute right-0 top-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7" 
                        onClick={() => onEdit(goal)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      {onDelete && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7 text-destructive" 
                          onClick={() => onDelete(goal.id)}
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Due: {goal.dueDate}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">${goal.current.toLocaleString()}</span>
                    <span className="text-muted-foreground">${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;
