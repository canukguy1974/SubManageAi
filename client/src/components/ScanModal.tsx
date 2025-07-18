import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Scan, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { scanGmailForSubscriptions, addSubscription } from '@/api/subscriptions';
import { useToast } from '@/hooks/useToast';

interface ScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface FoundSubscription {
  name: string;
  cost: number;
  confidence: number;
  selected?: boolean;
}

export function ScanModal({ open, onOpenChange, onSuccess }: ScanModalProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [foundSubscriptions, setFoundSubscriptions] = useState<FoundSubscription[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  const startScan = async () => {
    try {
      setScanning(true);
      setProgress(0);
      setScanComplete(false);
      setFoundSubscriptions([]);

      console.log('Starting Gmail scan...');

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await scanGmailForSubscriptions();
      clearInterval(progressInterval);
      setProgress(100);

      const subscriptions = (response as any).foundSubscriptions.map((sub: any) => ({
        ...sub,
        selected: true
      }));

      setFoundSubscriptions(subscriptions);
      setScanComplete(true);

      console.log('Scan completed, found subscriptions:', subscriptions);

      toast({
        title: "Scan Complete",
        description: `Found ${subscriptions.length} potential subscriptions`,
      });
    } catch (error) {
      console.error('Error scanning Gmail:', error);
      toast({
        title: "Error",
        description: "Failed to scan Gmail",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const toggleSubscription = (index: number) => {
    setFoundSubscriptions(prev =>
      prev.map((sub, i) =>
        i === index ? { ...sub, selected: !sub.selected } : sub
      )
    );
  };

  const addSelectedSubscriptions = async () => {
    try {
      setAdding(true);
      const selectedSubs = foundSubscriptions.filter(sub => sub.selected);

      console.log('Adding selected subscriptions:', selectedSubs);

      for (const sub of selectedSubs) {
        await addSubscription({
          name: sub.name,
          cost: sub.cost,
          billingFrequency: 'monthly',
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          category: 'Other',
          description: `Added via Gmail scan (${Math.round(sub.confidence * 100)}% confidence)`
        });
      }

      toast({
        title: "Success",
        description: `Added ${selectedSubs.length} subscriptions`,
      });

      onOpenChange(false);
      onSuccess();
      resetModal();
    } catch (error) {
      console.error('Error adding subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to add some subscriptions",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const resetModal = () => {
    setScanning(false);
    setProgress(0);
    setFoundSubscriptions([]);
    setScanComplete(false);
    setAdding(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetModal, 300);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-100 text-green-800';
    if (confidence >= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Scan Gmail for Subscriptions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!scanComplete && !scanning && (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Scan</h3>
              <p className="text-muted-foreground mb-4">
                We'll analyze your Gmail to find subscription-related emails and extract payment information.
              </p>
              <Button onClick={startScan} className="gap-2">
                <Scan className="h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          )}

          {scanning && (
            <div className="space-y-4 py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Scanning Your Gmail</h3>
                <p className="text-muted-foreground mb-4">
                  Analyzing emails for subscription patterns...
                </p>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                {progress}% complete
              </p>
            </div>
          )}

          {scanComplete && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Scan Complete!</span>
              </div>

              {foundSubscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Subscriptions Found</h3>
                  <p className="text-muted-foreground">
                    We didn't find any subscription-related emails in your recent messages.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground">
                    Found {foundSubscriptions.length} potential subscriptions. Review and select which ones to add:
                  </p>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {foundSubscriptions.map((subscription, index) => (
                      <Card key={index} className="p-3">
                        <CardContent className="p-0">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={subscription.selected}
                              onCheckedChange={() => toggleSubscription(index)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{subscription.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">${subscription.cost.toFixed(2)}</span>
                                  <Badge className={`text-xs ${getConfidenceColor(subscription.confidence)}`}>
                                    {Math.round(subscription.confidence * 100)}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      onClick={addSelectedSubscriptions}
                      disabled={adding || !foundSubscriptions.some(sub => sub.selected)}
                    >
                      {adding ? 'Adding...' : `Add Selected (${foundSubscriptions.filter(sub => sub.selected).length})`}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}