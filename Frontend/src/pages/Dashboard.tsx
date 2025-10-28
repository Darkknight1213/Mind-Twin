import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Avatar3D from '@/components/Avatar3D';
import StreakCounter from '@/components/StreakCounter';
import EnhancedXPBar from '@/components/EnhancedXPBar';
import DailyCheckInModal from '@/components/DailyCheckInModal';
import JourneyPathPreview from '@/components/JourneyPathPreview';
import MoodEmoji from '@/components/MoodEmoji';
import { currentUser, hasDoneCheckInToday } from '@/lib/dummyData';
import { CheckCircle, BookOpen, PenLine, Trophy, Flame, Star, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showCheckIn, setShowCheckIn] = useState(!hasDoneCheckInToday());
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const { toast } = useToast();

  // Listen for check-in completion
  useEffect(() => {
    const checkIfCompleted = () => {
      if (hasDoneCheckInToday() && !showCheckIn) {
        triggerCelebration();
      }
    };
    
    // Check when modal closes
    if (!showCheckIn) {
      checkIfCompleted();
    }
  }, [showCheckIn]);

  const triggerCelebration = () => {
    setShowConfetti(true);
    setCelebrate(true);
    toast({
      title: "🔥 +30 XP! You're crushing it!",
      description: "Bestie, don't stop now 💪",
    });
    
    setTimeout(() => {
      setShowConfetti(false);
      setCelebrate(false);
    }, 3000);
  };

  const missions = [
    { id: 1, title: 'Vibe check yourself rn 💅', icon: CheckCircle, done: hasDoneCheckInToday(), action: () => setShowCheckIn(true) },
    { id: 2, title: 'Finish a Lesson', icon: BookOpen, done: false, action: () => navigate('/lessons') },
    { id: 3, title: 'Write in Journal', icon: PenLine, done: false, action: () => navigate('/journal') },
  ];

  const completedMissions = missions.filter(m => m.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Welcome Banner with Integrated Quests */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
                    Welcome back, {currentUser.name}! 
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      👋
                    </motion.span>
                  </h1>
                  <MoodEmoji size="md" />
                </div>
                <p className="text-muted-foreground text-lg mb-4">
                  Your mood today is reflected in your digital twin
                </p>
                
                {/* Enhanced XP Bar */}
                <EnhancedXPBar 
                  currentXP={currentUser.xp} 
                  totalXP={currentUser.xpToNextLevel} 
                  level={currentUser.level}
                />
              </div>

              {/* Today's Main Quest - Compact Icons */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3">
                  <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                    <Flame className="text-warning" size={20} />
                    <span className="font-bold">{currentUser.growthStreak}</span>
                  </div>
                  <Button variant="ghost" onClick={() => navigate('/profile')} className="rounded-full">
                    <Award size={20} />
                  </Button>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-2xl">🎮</span>
                    <span>Today's Quest: {completedMissions}/{missions.length}</span>
                  </div>
                  <div className="flex gap-3">
                    {missions.map((mission) => (
                      <motion.div
                        key={mission.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="lg"
                          variant={mission.done ? "outline" : "default"}
                          className={`
                            rounded-full w-14 h-14 p-0 relative
                            ${mission.done ? 'opacity-75 bg-success/20 border-success' : 'gradient-hope shadow-glow'}
                          `}
                          onClick={mission.action}
                        >
                          <mission.icon 
                            size={24} 
                            className={mission.done ? 'text-success' : ''}
                          />
                          {mission.done && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                              <CheckCircle size={14} className="text-white" />
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid Layout - Digital Twin Left, Journey Right */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left - Digital Twin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 glass-card h-full">
              <h2 className="text-2xl font-semibold mb-6 text-center">Your Digital Twin</h2>
              <div className="aspect-square relative mb-6">
                <div className="absolute inset-0 gradient-hero opacity-20 blur-3xl rounded-full" />
                <Avatar3D celebrate={celebrate} />
              </div>
              <p className="text-center text-muted-foreground text-sm">
                Reflects your mental state and grows with you
              </p>
            </Card>
          </motion.div>

          {/* Right - Journey Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 glass-card h-full">
              <JourneyPathPreview />
              <Button 
                variant="outline" 
                className="w-full mt-4 hover-lift gradient-hope text-white"
                onClick={() => navigate('/lessons')}
              >
                View Full Path →
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Stats & Activity Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Daily Streak - Bigger */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-2xl hover-lift col-span-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 gradient-warmth opacity-20 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full gradient-warmth flex items-center justify-center shadow-glow"
                  >
                    <Flame size={32} className="text-white" />
                  </motion.div>
                  <div>
                    <div className="text-4xl font-bold">{currentUser.growthStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
                  </div>
                </div>
              </motion.div>

              {/* Total XP */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card p-4 rounded-2xl hover-lift"
              >
                <Star className="text-warning mb-2" size={24} />
                <div className="text-2xl font-bold">{currentUser.xp}</div>
                <div className="text-xs text-muted-foreground">💎 Total XP</div>
              </motion.div>

              {/* Lessons This Week */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card p-4 rounded-2xl hover-lift"
              >
                <CheckCircle className="text-success mb-2" size={24} />
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">✅ Lessons</div>
              </motion.div>

              {/* Journal Entries This Week */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card p-4 rounded-2xl hover-lift col-span-2"
              >
                <PenLine className="text-accent mb-2" size={24} />
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">📖 Journal Entries This Week</div>
              </motion.div>
            </motion.div>

          </div>

          {/* Recent Activity - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="text-primary" size={20} />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: 'Completed "Body Scan Meditation"', time: '2h ago', color: 'text-success' },
                  { icon: PenLine, text: 'New journal entry: "Feeling proud"', time: '1d ago', color: 'text-accent' },
                  { icon: CheckCircle, text: 'Completed daily check-in', time: '1d ago', color: 'text-primary' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-smooth">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                      <activity.icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <DailyCheckInModal open={showCheckIn} onOpenChange={setShowCheckIn} />
    </div>
  );
}
