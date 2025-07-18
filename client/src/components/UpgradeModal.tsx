import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Shield, Star } from 'lucide-react';
import { upgradeToPremium } from '@/api/user';
import { useToast } from '@/hooks/useToast';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async (planType: string) => {
    try {
      setLoading(true);
      console.log('Upgrading to premium:', planType);

      const response = await upgradeToPremium(planType);
      const checkoutUrl = (response as any).checkoutUrl;

      // In a real app, redirect to Stripe checkout
      window.open(checkoutUrl, '_blank');

      toast({
        title: "Redirecting to Checkout",
        description: "You'll be redirected to complete your payment",
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      toast({
        title: "Error",
        description: "Failed to start upgrade process",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Zap className="h-4 w-4" />, text: "5 Gmail scans per day" },
    { icon: <Shield className="h-4 w-4" />, text: "SMS alerts 2 days before payments" },
    { icon: <Star className="h-4 w-4" />, text: "Advanced analytics and insights" },
    { icon: <Check className="h-4 w-4" />, text: "Price change monitoring" },
    { icon: <Check className="h-4 w-4" />, text: "Bulk subscription management" },
    { icon: <Check className="h-4 w-4" />, text: "Ad-free experience" },
    { icon: <Check className="h-4 w-4" />, text: "Priority customer support" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              Unlock powerful features to better manage your subscriptions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <Card className="relative border-2 border-border">
              <CardHeader>
                <CardTitle className="text-center">Monthly</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$4.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full mb-4"
                  onClick={() => handleUpgrade('monthly')}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Choose Monthly'}
                </Button>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="text-green-500">{feature.icon}</div>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card className="relative border-2 border-primary">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                Save 20%
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">Yearly</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$47.99</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  $3.99/month billed annually
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full mb-4"
                  onClick={() => handleUpgrade('yearly')}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Choose Yearly'}
                </Button>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="text-green-500">{feature.icon}</div>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Cancel anytime. No hidden fees. 30-day money-back guarantee.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}