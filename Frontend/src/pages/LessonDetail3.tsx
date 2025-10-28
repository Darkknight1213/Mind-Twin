import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles, Battery } from 'lucide-react';
import Confetti from 'react-confetti';
import { currentUser } from '@/lib/dummyData';

export default function LessonDetail3() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [selectedTank, setSelectedTank] = useState<string | null>(null);
  const [selectedRecharge, setSelectedRecharge] = useState<string | null>(null);
  const [selectedBoundary, setSelectedBoundary] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const rechargeOptions = [
    { emoji: '🛏️', label: 'Nap & do nothing', xp: 15, energy: 'Mental +40%' },
    { emoji: '🎮', label: 'Play a chill game', xp: 15, energy: 'Mental +30%' },
    { emoji: '🚶', label: 'Go for a walk', xp: 20, energy: 'Mental +35%, Physical +20%' },
    { emoji: '💬', label: 'Call a friend', xp: 20, energy: 'Emotional +40%' }
  ];

  const stages = [
    {
      title: 'Hook',
      gradient: 'from-primary/20 via-accent/10 to-background',
      content: (
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-8xl mb-6"
          >
            😫
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Alex has been grinding nonstop.</h2>
            <p className="text-lg leading-relaxed">
              Stayed up late finishing assignments, skipped meals, ignored friends' texts. 
              Now everything feels overwhelming.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold text-primary"
            >
              Ever been there?
            </motion.p>
          </div>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            [Image: Character slumped over desk, phone notifications, empty energy drink cans]
          </div>
        </div>
      )
    },
    {
      title: 'Learn',
      gradient: 'from-success/20 via-primary/10 to-background',
      content: (
        <div className="space-y-6">
          <div className="text-6xl text-center mb-6">🔋⚡</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">Energy as a Resource</h2>
            <p className="text-lg leading-relaxed">
              You're not lazy—you're just running on empty. Your energy has 4 tanks: 
              Physical (body), Mental (brain), Emotional (feelings), Social (people). 
              When any tank hits red, you need to recharge ASAP.
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Battery meter with sections labeled: Physical, Mental, Emotional, Social]
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <h3 className="font-bold text-lg mb-4 text-center">Which tank feels most empty for you right now?</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '💪', label: 'Physical', color: 'warning' },
                { emoji: '🧠', label: 'Mental', color: 'primary' },
                { emoji: '💖', label: 'Emotional', color: 'accent' },
                { emoji: '👥', label: 'Social', color: 'success' }
              ].map((tank) => (
                <motion.button
                  key={tank.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedTank(tank.label);
                    setEarnedXP(prev => prev + 10);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTank === tank.label
                      ? 'border-success bg-success/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-2">{tank.emoji}</div>
                  <div className="font-semibold">{tank.label}</div>
                </motion.button>
              ))}
            </div>

            {selectedTank && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">✨ Got it.</p>
                <p className="text-sm mt-2">
                  Let's learn how to refuel that tank without burning out the others. <span className="font-bold">+10 XP</span>
                </p>
              </motion.div>
            )}
          </Card>
        </div>
      )
    },
    {
      title: 'Practice',
      gradient: 'from-warning/20 via-accent/10 to-background',
      content: (
        <div className="space-y-6">
          <div className="text-6xl text-center mb-6">⚡🔋</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">Choose Your Recharge</h2>
            <p className="text-lg leading-relaxed text-center">
              You've got 1 hour of free time. Your mental energy is at 20%. What's the move?
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Four doors/paths, each with icons for different activities]
          </div>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-primary/10">
            <div className="grid grid-cols-2 gap-3">
              {rechargeOptions.map((option) => (
                <motion.button
                  key={option.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedRecharge(option.label);
                    setEarnedXP(prev => prev + option.xp);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRecharge === option.label
                      ? 'border-success bg-success/20'
                      : 'border-border hover:border-warning/50'
                  }`}
                >
                  <div className="text-4xl mb-2">{option.emoji}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </motion.button>
              ))}
            </div>

            {selectedRecharge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                {selectedRecharge === 'Nap & do nothing' && (
                  <>
                    <p className="font-semibold text-success">🛏️ Smart call.</p>
                    <p className="text-sm mt-2">
                      Rest is productive. Your brain literally repairs itself when you sleep. 
                      Mental energy +40%. <span className="font-bold">+15 XP</span>
                    </p>
                  </>
                )}
                {selectedRecharge === 'Play a chill game' && (
                  <>
                    <p className="font-semibold text-success">🎮 Good balance.</p>
                    <p className="text-sm mt-2">
                      Distraction isn't avoidance if it's helping you reset. 
                      Mental energy +30%. <span className="font-bold">+15 XP</span>
                    </p>
                  </>
                )}
                {selectedRecharge === 'Go for a walk' && (
                  <>
                    <p className="font-semibold text-success">🚶 Nature + movement!</p>
                    <p className="text-sm mt-2">
                      Science-backed mood boost. Mental energy +35%, Physical energy +20%. <span className="font-bold">+20 XP</span>
                    </p>
                  </>
                )}
                {selectedRecharge === 'Call a friend' && (
                  <>
                    <p className="font-semibold text-success">💬 Connection is medicine.</p>
                    <p className="text-sm mt-2">
                      Talking it out lightens the load. Emotional energy +40%. <span className="font-bold">+20 XP</span>
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </Card>
        </div>
      )
    },
    {
      title: 'Boss Challenge',
      gradient: 'from-accent/20 via-primary/10 to-background',
      content: (
        <div className="space-y-6">
          <div className="text-6xl text-center mb-6">⚔️📱</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg leading-relaxed text-center">
              It's 11 PM. Your group chat is blowing up about a project due tomorrow, 
              but you're exhausted and need sleep.
            </p>
            <p className="text-xl font-bold text-center text-primary">
              What do you do?
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Phone buzzing with notifications, character looks stressed]
          </div>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBoundary('A')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedBoundary === 'A'
                    ? 'border-muted bg-muted/20'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <p className="font-medium">A) Stay up and help even though I'm drained</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedBoundary('B');
                  setEarnedXP(prev => prev + 35);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedBoundary === 'B'
                    ? 'border-success bg-success/20'
                    : 'border-border hover:border-success/50'
                }`}
              >
                <p className="font-medium">B) Say "I need to rest, but I'll help in the morning" and mute the chat</p>
              </motion.button>
            </div>

            {selectedBoundary === 'A' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-primary/20 rounded-xl"
              >
                <p className="font-semibold">💙 I get it—you don't want to let people down.</p>
                <p className="text-sm mt-2">
                  But pushing yourself past empty makes tomorrow worse for everyone. 
                  Boundaries aren't selfish, they're survival. Let's try option B—it's healthier long-term.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSelectedBoundary(null)}
                >
                  Try Again
                </Button>
              </motion.div>
            )}

            {selectedBoundary === 'B' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">💪 THAT'S setting a boundary like a boss!</p>
                <p className="text-sm mt-2">
                  You can't pour from an empty cup. Your team will understand, and you'll actually be useful tomorrow. 
                  This is self-respect in action. <span className="font-bold">+35 XP</span>
                </p>
              </motion.div>
            )}
          </Card>
        </div>
      )
    },
    {
      title: 'Reward',
      gradient: 'from-success/20 via-warning/10 to-accent/10',
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-8xl mb-6"
          >
            ⚡
          </motion.div>

          <h2 className="text-4xl font-bold">You leveled up your self-care game!</h2>
          <p className="text-lg text-muted-foreground">
            Remember: Rest isn't lazy. Recharging is how you show up strong.
          </p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Card className="p-8 gradient-hero text-white shadow-glow">
              <div className="text-7xl font-bold mb-2">+80</div>
              <div className="text-2xl font-bold mb-1">XP Earned</div>
              <div className="text-lg opacity-90">Total gained: +{earnedXP + 80} XP</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            <Card className="p-4 glass-card">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-sm font-semibold">Day {currentUser.growthStreak + 1}</div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </Card>
            <Card className="p-4 glass-card gradient-warmth text-white">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-semibold">Badge Unlocked</div>
              <div className="text-xs opacity-90">Energy Master</div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-semibold">Level {currentUser.level}</div>
              <div className="text-xs text-muted-foreground">{currentUser.xp + 80} XP</div>
            </Card>
          </motion.div>

          <div className="p-6 bg-primary/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">📊 New feature unlocked:</p>
            <p className="text-muted-foreground">
              "Energy Tracker" in dashboard (shows daily energy levels across 4 categories)
            </p>
          </div>

          <div className="p-6 bg-accent/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">🎯 Habit Challenge:</p>
            <p className="text-muted-foreground">
              This week, try ONE recharge activity daily. Log it and earn bonus XP!
            </p>
          </div>

          <div className="p-6 bg-warning/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">🎮 Next lesson:</p>
            <p className="text-muted-foreground">
              What to do when people drain your energy...
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStage = stages[stage];
  const progress = ((stage + 1) / stages.length) * 100;

  const canProceed = () => {
    if (stage === 1) return selectedTank !== null;
    if (stage === 2) return selectedRecharge !== null;
    if (stage === 3) return selectedBoundary === 'B';
    return true;
  };

  const handleNext = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
      if (stage === stages.length - 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } else {
      navigate('/lessons');
    }
  };

  const handleBack = () => {
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStage.gradient} transition-colors duration-700`}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/lessons')}
            className="mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Lessons
          </Button>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="font-semibold">{currentStage.title}</span>
              <span className="text-muted-foreground">Step {stage + 1} of {stages.length}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <Card className="p-8 mb-6 shadow-card glass-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {currentStage.content}
            </motion.div>
          </AnimatePresence>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={stage === 0}
            size="lg"
            className="hover-lift"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              size="lg"
              className="gradient-hope shadow-glow"
            >
              {stage === stages.length - 1 ? (
                <>
                  Continue Journey <Sparkles size={18} className="ml-2" />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
