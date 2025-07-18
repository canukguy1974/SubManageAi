import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Settings as SettingsIcon,
  Bell,
  Mail,
  MessageSquare,
  Shield,
  CreditCard,
  Trash2,
  Crown,
  User,
  Save
} from 'lucide-react';
import { getUserProfile, updateUserPreferences, type UserProfile } from '@/api/user';
import { useToast } from '@/hooks/useToast';

export function Settings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reminderDays: 3,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      const profile = (response as any).user;
      setUserProfile(profile);
      setPreferences(profile.preferences);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      await updateUserPreferences(preferences);
      toast({
        title: "Success",
        description: "Preferences updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and notifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-effect glow-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userProfile?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userProfile?.name || ''}
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={userProfile?.isPremium ? "default" : "secondary"}>
                  {userProfile?.isPremium ? (
                    <>
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </>
                  ) : (
                    'Free Plan'
                  )}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="glass-effect glow-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email alerts for upcoming payments
                  </p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    SMS Notifications
                    {!userProfile?.isPremium && (
                      <Badge variant="outline" className="text-xs">Premium</Badge>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive SMS alerts 2 days before payments
                  </p>
                </div>
                <Switch
                  checked={preferences.smsNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                  }
                  disabled={!userProfile?.isPremium}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Reminder Days</Label>
                <p className="text-sm text-muted-foreground">
                  How many days before payment to send reminders
                </p>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={preferences.reminderDays}
                  onChange={(e) =>
                    setPreferences(prev => ({ ...prev, reminderDays: parseInt(e.target.value) || 3 }))
                  }
                  className="w-20"
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSavePreferences} disabled={saving} className="glow-effect">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="glass-effect border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card className="glass-effect glow-effect">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Plan</span>
                  <Badge variant={userProfile?.isPremium ? "default" : "secondary"}>
                    {userProfile?.isPremium ? 'Premium' : 'Free'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Scans</span>
                  <span>{userProfile?.dailyScansUsed}/{userProfile?.maxDailyScans}</span>
                </div>
                {!userProfile?.isPremium && (
                  <Button size="sm" className="w-full glow-effect">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-effect glow-effect">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start glow-effect">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing History
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start glow-effect">
                  <Mail className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}