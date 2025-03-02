
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = "text-finance-accent",
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-medium", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            {change && (
              <p className={cn(
                "text-sm flex items-center",
                isPositive ? "text-finance-income" : "text-finance-expense"
              )}>
                {isPositive ? '↑' : '↓'} {change}
              </p>
            )}
          </div>
          <div className={cn("p-2 rounded-lg", iconColor)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
