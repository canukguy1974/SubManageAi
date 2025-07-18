import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { getSubscriptions, getSubscriptionStats, type Subscription, type SubscriptionStats } from '@/api/subscriptions';
import { getUserProfile, type UserProfile } from '@/api/user';
import { useToast } from '@/hooks/useToast';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { AddSubscriptionModal } from '@/components/AddSubscriptionModal';
import { ScanModal } from '@/components/ScanModal';
import { UpgradeModal } from '@/components/UpgradeModal';
import { StatsCards } from '@/components/StatsCards';
import { SpendingChart } from '@/components/SpendingChart';
import { UpcomingPayments } from '@/components/UpcomingPayments';

export function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Loading dashboard data...');
      
      const [subscriptionsResponse, statsResponse, profileResponse] = await Promise.all([
        getSubscriptions(),
        getSubscriptionStats(),
        getUserProfile()
      ]);

      setSubscriptions((subscriptionsResponse as any).subscriptions);
      setStats((statsResponse as any).stats);
      setUserProfile((profileResponse as any).user);
      
      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = () => {
    if (!userProfile?.isPremium && userProfile?.dailyScansUsed >= userProfile?.maxDailyScans) {
      setShowUpgradeModal(true);
    } else {
      setShowScanModal(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'due_soon': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      case 'paused': return 'bg-gray-500';
      case 'cancelled': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'due_soon': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'paused': return <XCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const filteredSubscriptions = (status?: string) => {
    if (!status) return subscriptions;
    return subscriptions.filter(sub => sub.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subscriptions and track your spending
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleScanClick} className="gap-2">
            <Scan className="h-4 w-4" />
            Scan Gmail
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscriptions List */}
        <div className="lg:col-span-2">
          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Your Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All ({subscriptions.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({filteredSubscriptions('active').length})</TabsTrigger>
                  <TabsTrigger value="due_soon">Due Soon ({filteredSubscriptions('due_soon').length})</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue ({filteredSubscriptions('overdue').length})</TabsTrigger>
                  <TabsTrigger value="paused">Paused ({filteredSubscriptions('paused').length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {subscriptions.map((subscription) => (
                    <SubscriptionCard 
                      key={subscription._id} 
                      subscription={subscription}
                      onUpdate={loadDashboardData}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="active" className="space-y-4 mt-4">
                  {filteredSubscriptions('active').map((subscription) => (
                    <SubscriptionCard 
                      key={subscription._id} 
                      subscription={subscription}
                      onUpdate={loadDashboardData}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="due_soon" className="space-y-4 mt-4">
                  {filteredSubscriptions('due_soon').map((subscription) => (
                    <SubscriptionCard 
                      key={subscription._id} 
                      subscription={subscription}
                      onUpdate={loadDashboardData}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="overdue" className="space-y-4 mt-4">
                  {filteredSubscriptions('overdue').map((subscription) => (
                    <SubscriptionCard 
                      key={subscription._id} 
                      subscription={subscription}
                      onUpdate={loadDashboardData}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="paused" className="space-y-4 mt-4">
                  {filteredSubscriptions('paused').map((subscription) => (
                    <SubscriptionCard 
                      key={subscription._id} 
                      subscription={subscription}
                      onUpdate={loadDashboardData}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Payments */}
          <UpcomingPayments subscriptions={subscriptions} />
          
          {/* Spending Chart */}
          {stats && <SpendingChart stats={stats} />}
          
          {/* Scan Usage */}
          {userProfile && (
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Daily Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span>{userProfile.dailyScansUsed}/{userProfile.maxDailyScans}</span>
                  </div>
                  <Progress 
                    value={(userProfile.dailyScansUsed / userProfile.maxDailyScans) * 100} 
                    className="h-2"
                  />
                  {!userProfile.isPremium && userProfile.dailyScansUsed >= userProfile.maxDailyScans && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      Upgrade for More Scans
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddSubscriptionModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSuccess={loadDashboardData}
      />
      
      <ScanModal 
        open={showScanModal} 
        onOpenChange={setShowScanModal}
        onSuccess={loadDashboardData}
      />
      
      <UpgradeModal 
        open={showUpgradeModal} 
        onOpenChange={setShowUpgradeModal}
      />
    </div>
  );
}