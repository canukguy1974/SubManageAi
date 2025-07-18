import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  Trash2,
  ExternalLink,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Bot,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { type Subscription, updateSubscription, deleteSubscription, aiCancelSubscription } from '@/api/subscriptions';
import { useToast } from '@/hooks/useToast';
import { EditSubscriptionModal } from './EditSubscriptionModal';
import { AiCancelModal } from './AiCancelModal';

interface SubscriptionCardProps {
  subscription: Subscription;
  onUpdate: () => void;
}

export function SubscriptionCard({ subscription, onUpdate }: SubscriptionCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAiCancelModal, setShowAiCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'due_soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400';
      case 'cancelled': return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-500';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />;
      case 'due_soon': return <Clock className="h-3 w-3" />;
      case 'overdue': return <AlertTriangle className="h-3 w-3" />;
      case 'paused': return <XCircle className="h-3 w-3" />;
      case 'cancelled': return <XCircle className="h-3 w-3" />;
      default: return <CheckCircle className="h-3 w-3" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilPayment = (dateString: string) => {
    const paymentDate = new Date(dateString);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleTogglePause = async () => {
    try {
      setLoading(true);
      const newStatus = subscription.status === 'paused' ? 'active' : 'paused';
      await updateSubscription(subscription._id, { status: newStatus });
      toast({
        title: "Success",
        description: `Subscription ${newStatus === 'paused' ? 'paused' : 'resumed'} successfully`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSubscription(subscription._id);
      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCancellationUrl = () => {
    if (subscription.cancellationUrl) {
      window.open(subscription.cancellationUrl, '_blank');
    }
  };

  const daysUntilPayment = getDaysUntilPayment(subscription.nextPaymentDate);

  return (
    <>
      <Card className="glass-effect glow-effect transition-all duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{subscription.logo}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{subscription.name}</h3>
                  <Badge className={`text-xs ${getStatusColor(subscription.status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(subscription.status)}
                      {subscription.status.replace('_', ' ')}
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{subscription.category}</p>
                {subscription.description && (
                  <p className="text-xs text-muted-foreground mt-1">{subscription.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xl font-bold">
                  ${subscription.cost.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  /{subscription.billingFrequency}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  {formatDate(subscription.nextPaymentDate)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {daysUntilPayment > 0 ? `in ${daysUntilPayment} days` :
                   daysUntilPayment === 0 ? 'due today' : `${Math.abs(daysUntilPayment)} days overdue`}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" disabled={loading} className="glow-effect">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect">
                  <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleTogglePause}>
                    {subscription.status === 'paused' ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowAiCancelModal(true)} className="text-primary">
                    <Bot className="h-4 w-4 mr-2" />
                    AI Cancel
                  </DropdownMenuItem>
                  {subscription.cancellationUrl && (
                    <DropdownMenuItem onClick={handleOpenCancellationUrl}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Cancel Manually
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {subscription.paymentMethod && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-3 w-3" />
                {subscription.paymentMethod}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <EditSubscriptionModal
        subscription={subscription}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={onUpdate}
      />

      <AiCancelModal
        subscription={subscription}
        open={showAiCancelModal}
        onOpenChange={setShowAiCancelModal}
        onSuccess={onUpdate}
      />
    </>
  );
}