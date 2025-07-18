import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, Calendar, TrendingUp } from 'lucide-react';
import { type SubscriptionStats } from '@/api/subscriptions';

interface StatsCardsProps {
  stats: SubscriptionStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalMonthlySpending.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            ${stats.totalYearlySpending.toFixed(2)} per year
          </p>
        </CardContent>
      </Card>
      
      <Card className="backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
          <p className="text-xs text-muted-foreground">
            Currently active services
          </p>
        </CardContent>
      </Card>
      
      <Card className="backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingPayments}</div>
          <p className="text-xs text-muted-foreground">
            Due in next 7 days
          </p>
        </CardContent>
      </Card>
      
      <Card className="backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.categoryBreakdown[0]?.category || 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground">
            ${stats.categoryBreakdown[0]?.amount.toFixed(2) || '0.00'} monthly
          </p>
        </CardContent>
      </Card>
    </div>
  );
}