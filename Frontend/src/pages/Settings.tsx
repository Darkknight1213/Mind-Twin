import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Bell, Lock, Palette, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '@/lib/dummyData';
import { useState } from 'react';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    streakAlerts: true,
    newLessons: true,
    achievements: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Account</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={currentUser.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={currentUser.email} className="mt-1" />
                </div>
                <Button className="mt-2">Save Changes</Button>
              </div>
            </Card>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-reminders" className="text-base">Daily Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded to check in daily</p>
                  </div>
                  <Switch 
                    id="daily-reminders"
                    checked={notifications.dailyReminders}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, dailyReminders: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streak-alerts" className="text-base">Streak Alerts</Label>
                    <p className="text-sm text-muted-foreground">Don't let your streak die</p>
                  </div>
                  <Switch 
                    id="streak-alerts"
                    checked={notifications.streakAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, streakAlerts: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-lessons" className="text-base">New Lessons</Label>
                    <p className="text-sm text-muted-foreground">When new content unlocks</p>
                  </div>
                  <Switch 
                    id="new-lessons"
                    checked={notifications.newLessons}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newLessons: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievements" className="text-base">Achievements</Label>
                    <p className="text-sm text-muted-foreground">Badge unlocks and level ups</p>
                  </div>
                  <Switch 
                    id="achievements"
                    checked={notifications.achievements}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, achievements: checked }))}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Privacy & Security</h2>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Appearance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Appearance</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Support</h2>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Send Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Terms of Service
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="outline" 
              className="w-full justify-center gap-2 text-destructive hover:text-destructive"
              onClick={() => navigate('/login')}
            >
              <LogOut size={18} />
              Log Out
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
