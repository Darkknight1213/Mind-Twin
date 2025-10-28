import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StreakCounter from '@/components/StreakCounter';
import { currentUser } from '@/lib/dummyData';
import { ArrowLeft, Trophy, Flame, Calendar, Settings, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Current Level', value: currentUser.level, icon: Trophy, color: 'text-primary' },
    { label: 'Total XP', value: currentUser.xp, icon: Flame, color: 'text-warning' },
    { label: 'Growth Streak', value: `${currentUser.growthStreak} days`, icon: Flame, color: 'text-warning' },
    { label: 'Badges Earned', value: currentUser.badges.filter(b => b.earned).length, icon: Trophy, color: 'text-success' },
  ];

  const mentalStats = [
    { label: 'Anxiety Management', value: 100 - currentUser.mentalStats.anxiety, color: 'gradient-hope' },
    { label: 'Energy Level', value: currentUser.mentalStats.energy, color: 'gradient-growth' },
    { label: 'Sleep Quality', value: currentUser.mentalStats.sleep, color: 'gradient-compassion' },
    { label: 'Mindfulness', value: currentUser.mentalStats.mindfulness, color: 'gradient-warmth' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{currentUser.name}'s Profile</h1>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
            <Button variant="outline">
              <Settings size={18} className="mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Avatar/Mood */}
            <Card className="p-6 text-center">
              <div className="text-7xl mb-4 animate-float">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Level {currentUser.level}</h3>
              <Badge className="mb-4">Currently: {currentUser.mood}</Badge>
              <Button variant="outline" className="w-full">
                View Digital Twin
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <stat.icon size={18} className={stat.color} />
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Streaks */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Streaks</h3>
              <div className="space-y-3">
                <StreakCounter type="growth" count={currentUser.growthStreak} />
                <StreakCounter type="compassion" count={currentUser.compassionStreak} />
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy size={16} />
                    <span>Highest: {currentUser.highestStreak} days</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Detailed Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Mental Health Stats */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Mental Health Progress</h2>
              <div className="space-y-6">
                {mentalStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stat.label}</span>
                      <span className="text-sm font-bold text-primary">{stat.value}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Enhanced Badge Gallery */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Your Achievements 🏆</h2>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {currentUser.badges.filter(b => b.earned).length} / {currentUser.badges.length}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentUser.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={badge.earned ? { scale: 1.05, y: -5 } : {}}
                  >
                    <Card 
                      className={`
                        p-6 text-center cursor-pointer transition-smooth relative overflow-hidden
                        ${badge.earned ? 'shadow-card hover:shadow-glow' : 'opacity-40 grayscale'}
                      `}
                    >
                      {/* Earned glow effect */}
                      {badge.earned && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="text-5xl mb-3"
                          animate={badge.earned ? { rotate: [0, -10, 10, -10, 0] } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {badge.icon}
                        </motion.div>
                        <div className="font-bold text-base mb-2">{badge.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {badge.description}
                        </div>
                        {badge.earned && badge.earnedDate && (
                          <div className="text-xs text-success font-medium mt-3 flex items-center justify-center gap-1">
                            <Calendar size={12} />
                            {badge.earnedDate}
                          </div>
                        )}
                        {!badge.earned && (
                          <div className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                            <span>🔒</span>
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Progress hint for next badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 bg-muted/50 rounded-lg text-center"
              >
                <p className="text-sm text-muted-foreground">
                  💡 Keep completing lessons to unlock more badges!
                </p>
              </motion.div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Account Actions</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <Download size={18} className="mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings size={18} className="mr-2" />
                  Privacy Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
