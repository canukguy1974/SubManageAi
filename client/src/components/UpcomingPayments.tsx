import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Clock } from 'lucide-react';
import { type Subscription } from '@/api/subscriptions';

interface UpcomingPaymentsProps {
  subscriptions: Subscription[];
}

export function UpcomingPayments({ subscriptions }: UpcomingPaymentsProps) {
  const getUpcomingPayments = () => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return subscriptions
      .filter(sub => {
        const paymentDate = new Date(sub.nextPaymentDate);
        return paymentDate <= thirtyDaysFromNow && sub.status !== 'cancelled';
      })
      .sort((a, b) => new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilPayment = (dateString: string) => {
    const paymentDate = new Date(dateString);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (days: number) => {
    if (days < 0) return 'bg-red-100 text-red-800';
    if (days === 0) return 'bg-orange-100 text-orange-800';
    if (days <= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusIcon = (days: number) => {
    if (days < 0) return <AlertTriangle className="h-3 w-3" />;
    if (days <= 3) return <Clock className="h-3 w-3" />;
    return <Calendar className="h-3 w-3" />;
  };

  const upcomingPayments = getUpcomingPayments();

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="h-4 w-4" />
          Upcoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingPayments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming payments in the next 30 days
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingPayments.map((subscription) => {
              const days = getDaysUntilPayment(subscription.nextPaymentDate);
              return (
                <div key={subscription._id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{subscription.logo}</span>
                    <div>
                      <p className="text-sm font-medium">{subscription.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(subscription.nextPaymentDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">${subscription.cost.toFixed(2)}</p>
                    <Badge className={`text-xs ${getStatusColor(days)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(days)}
                        {days < 0 ? `${Math.abs(days)}d overdue` :
                         days === 0 ? 'due today' :
                         `${days}d left`}
                      </div>
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}