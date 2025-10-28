import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { currentUser } from '@/lib/dummyData';

export default function LessonDetailNew() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedThought, setSelectedThought] = useState<string | null>(null);
  const [selectedWin, setSelectedWin] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

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
            😶‍🌫️
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Meet Alex.</h2>
            <p className="text-lg leading-relaxed">
              Some days Alex feels major 'meh.' No motivation, scrolling for hours, feeling kinda empty.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold text-primary"
            >
              Sound familiar? No cap, we've ALL been there.
            </motion.p>
          </div>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            [Image: Character sitting alone looking at phone, dim room]
          </div>
        </div>
      )
    },
    {
      title: 'Learn',
      gradient: 'from-success/20 via-primary/10 to-background',
      content: (
        <div className="space-y-6">
          <div className="text-6xl text-center mb-6">🧠💭</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg leading-relaxed">
              Lowkey, when you're feeling low, your brain starts lying to you. 
              Thoughts like "I'm not good enough" or "Nothing matters" feel real, but they're sus.
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Brain with thought bubbles showing negative thoughts]
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <h3 className="font-bold text-lg mb-4 text-center">Which thought helps you bounce back?</h3>
            <div className="grid gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedThought('wrong')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedThought === 'wrong'
                    ? 'border-muted bg-muted/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">😔</div>
                <p className="font-medium">"I'm trash at everything"</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedThought('right');
                  setEarnedXP(prev => prev + 10);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedThought === 'right'
                    ? 'border-success bg-success/20'
                    : 'border-border hover:border-success/50'
                }`}
              >
                <div className="text-2xl mb-2">🌱</div>
                <p className="font-medium">"I'm learning and that's okay"</p>
              </motion.button>
            </div>

            {selectedThought === 'right' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">✨ Exactly! That's called a 'growth mindset.'</p>
                <p className="text-sm mt-2">Your brain just got a little stronger. <span className="font-bold">+10 XP</span></p>
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
          <div className="text-6xl text-center mb-6">✅💪</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">Real talk:</h2>
            <p className="text-lg leading-relaxed text-center">
              On hard days, SMALL wins = BIG mood boost.
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Checklist with glowing items]
          </div>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-primary/10">
            <h3 className="font-bold text-lg mb-4 text-center">What's ONE micro-win from today?</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '🍕', text: 'Had something good to eat' },
                { emoji: '😂', text: 'Sent a funny meme' },
                { emoji: '🚿', text: 'Took a shower' },
                { emoji: '📱', text: 'Texted someone back' },
                { emoji: '✅', text: 'Literally did anything' }
              ].map((win, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedWin(win.text);
                    setEarnedXP(prev => prev + 15);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedWin === win.text
                      ? 'border-success bg-success/20'
                      : 'border-border hover:border-warning/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{win.emoji}</div>
                  <p className="text-sm font-medium">{win.text}</p>
                </motion.button>
              ))}
            </div>

            {selectedWin && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">🎉 That's a W!</p>
                <p className="text-sm mt-2">
                  Seriously, celebrating small stuff rewires your brain for positivity. 
                  Keep stacking those wins. <span className="font-bold">+15 XP</span>
                </p>
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
          <div className="text-6xl text-center mb-6">⚔️🎯</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg leading-relaxed text-center">
              Your brain drops this line:
            </p>
            <p className="text-xl font-bold text-center italic text-muted-foreground">
              "You always mess up, why even try?"
            </p>
            <p className="text-lg leading-relaxed text-center">
              How you responding?
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Character at crossroads with two paths]
          </div>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedResponse('A')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedResponse === 'A'
                    ? 'border-muted bg-muted/20'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <p className="font-medium">A) "Guess I'll give up then"</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedResponse('B');
                  setEarnedXP(prev => prev + 25);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedResponse === 'B'
                    ? 'border-success bg-success/20'
                    : 'border-border hover:border-success/50'
                }`}
              >
                <p className="font-medium">B) "Nah, I've bounced back before. Let's try again"</p>
              </motion.button>
            </div>

            {selectedResponse === 'A' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-primary/20 rounded-xl"
              >
                <p className="font-semibold">💙 I hear you, giving up feels easier sometimes.</p>
                <p className="text-sm mt-2">
                  But here's the thing—your past self didn't quit, which is why you're still here. 
                  That takes strength. Want to try reframing this thought?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSelectedResponse(null)}
                >
                  Try Again
                </Button>
              </motion.div>
            )}

            {selectedResponse === 'B' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">🔥 SLAY!</p>
                <p className="text-sm mt-2">
                  That's how you clap back at your inner critic. This is called cognitive reframing, 
                  and you just leveled up your mental game. <span className="font-bold">+25 XP</span>, 
                  you're built different 🔥
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
            🏆
          </motion.div>

          <h2 className="text-4xl font-bold">You crushed it!</h2>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Card className="p-8 gradient-hero text-white shadow-glow">
              <div className="text-7xl font-bold mb-2">+50</div>
              <div className="text-2xl font-bold mb-1">XP Earned</div>
              <div className="text-lg opacity-90">Total gained: +{earnedXP + 50} XP</div>
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
              <div className="text-3xl mb-2">🏅</div>
              <div className="text-sm font-semibold">Badge Unlocked</div>
              <div className="text-xs opacity-90">Small Win Warrior</div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-semibold">Level {currentUser.level}</div>
              <div className="text-xs text-muted-foreground">{currentUser.xp + 50} XP</div>
            </Card>
          </motion.div>

          <div className="p-6 bg-primary/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">🎮 Next up:</p>
            <p className="text-muted-foreground">
              "Catch & Yeet" anxious thoughts. Your twin needs your help...
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStage = stages[stage];
  const progress = ((stage + 1) / stages.length) * 100;

  const canProceed = () => {
    if (stage === 1) return selectedThought === 'right';
    if (stage === 2) return selectedWin !== null;
    if (stage === 3) return selectedResponse === 'B';
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
      navigate('/dashboard');
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
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="font-semibold">{currentStage.title}</span>
              <span className="text-muted-foreground">Step {stage + 1} of {stages.length}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Content */}
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

        {/* Navigation */}
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
