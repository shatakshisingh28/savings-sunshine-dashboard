
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals }) => {
  return (
    <Card className="col-span-2 transition-all duration-200 hover:shadow-medium animate-fade-up animate-delay-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {goals.map((goal) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
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
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;
