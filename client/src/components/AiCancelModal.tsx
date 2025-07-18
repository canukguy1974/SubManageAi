import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { aiCancelSubscription, type Subscription } from '@/api/subscriptions';
import { useToast } from '@/hooks/useToast';

interface AiCancelModalProps {
  subscription: Subscription;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AiCancelModal({ subscription, open, onOpenChange, onSuccess }: AiCancelModalProps) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const { toast } = useToast();

  const startAiCancellation = async () => {
    try {
      setProcessing(true);
      setProgress(0);
      setCurrentStep(0);
      setComplete(false);

      console.log('Starting AI cancellation for:', subscription.name);

      const response = await aiCancelSubscription(subscription._id);
      const { cancellationSteps, estimatedTime: time } = response as any;

      setSteps(cancellationSteps);
      setEstimatedTime(time);

      // Simulate progress through steps
      for (let i = 0; i < cancellationSteps.length; i++) {
        setCurrentStep(i);
        setProgress(((i + 1) / cancellationSteps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setComplete(true);

      toast({
        title: "AI Cancellation Complete",
        description: `Successfully initiated cancellation for ${subscription.name}`,
      });

      setTimeout(() => {
        onOpenChange(false);
        onSuccess();
        resetModal();
      }, 2000);

    } catch (error) {
      console.error('Error with AI cancellation:', error);
      toast({
        title: "Error",
        description: "Failed to process AI cancellation",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const resetModal = () => {
    setProcessing(false);
    setProgress(0);
    setCurrentStep(0);
    setSteps([]);
    setComplete(false);
    setEstimatedTime('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetModal, 300);
  };

  const handleManualCancel = () => {
    if (subscription.cancellationUrl) {
      window.open(subscription.cancellationUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-background glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI-Powered Cancellation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!processing && !complete && (
            <div className="space-y-4">
              <Card className="glass-effect">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{subscription.logo}</div>
                    <div>
                      <h3 className="font-semibold">{subscription.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${subscription.cost.toFixed(2)}/{subscription.billingFrequency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  How AI Cancellation Works
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Analyzes subscription terms and optimal cancellation timing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Automatically submits cancellation requests
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Monitors confirmation and handles follow-ups
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Provides detailed cancellation report
                  </li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={startAiCancellation} className="flex-1 glow-effect">
                  <Bot className="h-4 w-4 mr-2" />
                  Start AI Cancellation
                </Button>
                {subscription.cancellationUrl && (
                  <Button variant="outline" onClick={handleManualCancel} className="glow-effect">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manual
                  </Button>
                )}
              </div>
            </div>
          )}

          {processing && (
            <div className="space-y-4 py-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Bot className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-semibold">AI Processing Cancellation</span>
                </div>
                {estimatedTime && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Estimated time: {estimatedTime}
                  </p>
                )}
              </div>

              <Progress value={progress} className="w-full" />

              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${
                      index < currentStep
                        ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                        : index === currentStep
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : index === currentStep ? (
                      <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {complete && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-green-600">Cancellation Complete!</h3>
              <p className="text-muted-foreground mb-4">
                Your subscription to {subscription.name} has been successfully cancelled.
              </p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                You'll receive a confirmation email shortly
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}