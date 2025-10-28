import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { currentUser } from '@/lib/dummyData';

export default function LessonDetail2() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [tappedThoughts, setTappedThoughts] = useState<number[]>([]);
  const [selectedReframe, setSelectedReframe] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const thoughts = [
    { id: 0, text: "I'm gonna fail", isAnxious: true },
    { id: 1, text: "Nobody likes me", isAnxious: true },
    { id: 2, text: "I can try my best", isAnxious: false },
    { id: 3, text: "Everything is falling apart", isAnxious: true },
    { id: 4, text: "I've handled tough stuff before", isAnxious: false }
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
            😰
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">2 AM. Alex's brain:</h2>
            <p className="text-xl italic text-muted-foreground">
              'Remember that embarrassing thing from 3 years ago? Let's replay it 47 times.'
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold text-primary"
            >
              Your brain ever do this? That's anxiety being annoying.
            </motion.p>
          </div>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            [Image: Character lying in bed, multiple thought bubbles swirling overhead]
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
              Your brain's job is to protect you, but sometimes it gets paranoid and creates fake emergencies. 
              These are called 'intrusive thoughts'—they're NOT facts, just mental spam.
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Brain with "worry spiral" arrows going in circles]
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <h3 className="font-bold text-lg mb-4 text-center">Which thought is anxiety lying to you?</h3>
            <div className="grid gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedQuizAnswer('A')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedQuizAnswer === 'A'
                    ? 'border-muted bg-muted/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-medium">A) "I should prepare for my exam"</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedQuizAnswer('B');
                  setEarnedXP(prev => prev + 10);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedQuizAnswer === 'B'
                    ? 'border-success bg-success/20'
                    : 'border-border hover:border-success/50'
                }`}
              >
                <p className="font-medium">B) "Everyone secretly hates me"</p>
              </motion.button>
            </div>

            {selectedQuizAnswer === 'B' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">✨ Correct! That's anxiety talking.</p>
                <p className="text-sm mt-2">
                  Your brain's trying to scare you, but we're gonna teach it to chill. <span className="font-bold">+10 XP</span>
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
          <div className="text-6xl text-center mb-6">🎯🫧</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">Time to play 'Catch & Yeet'</h2>
            <p className="text-lg leading-relaxed text-center">
              Anxious thoughts will pop up. Tap the ones that are NOT helpful and we'll yeet them together.
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Thought bubbles floating up from bottom of screen]
          </div>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-primary/10">
            <h3 className="font-bold text-lg mb-4 text-center">Tap the anxious thoughts! 💭</h3>
            <div className="grid gap-3">
              {thoughts.map((thought) => {
                const isTapped = tappedThoughts.includes(thought.id);
                const isCorrect = thought.isAnxious && isTapped;
                const isWrong = !thought.isAnxious && isTapped;
                
                return (
                  <motion.button
                    key={thought.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!isTapped) {
                        setTappedThoughts(prev => [...prev, thought.id]);
                        if (thought.isAnxious) {
                          setEarnedXP(prev => prev + 5);
                        }
                      }
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      isCorrect
                        ? 'border-success bg-success/20 line-through opacity-50'
                        : isWrong
                        ? 'border-warning bg-warning/20'
                        : 'border-border hover:border-warning/50'
                    }`}
                    disabled={isTapped}
                  >
                    <p className="font-medium">{thought.text}</p>
                    {isCorrect && <span className="text-success text-sm ml-2">✓ Yeeted!</span>}
                    {isWrong && <span className="text-warning text-sm ml-2">This one's helpful!</span>}
                  </motion.button>
                );
              })}
            </div>

            {tappedThoughts.length === thoughts.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">🎉 Nicely done!</p>
                <p className="text-sm mt-2">
                  You just practiced 'thought awareness.' The more you catch these thoughts, 
                  the weaker they get. <span className="font-bold">+20 XP</span>
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
          <div className="text-6xl text-center mb-6">⚔️🧠</div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg leading-relaxed text-center">
              Your brain says:
            </p>
            <p className="text-xl font-bold text-center italic text-muted-foreground">
              "What if I mess up this presentation and everyone thinks I'm stupid?"
            </p>
            <p className="text-lg leading-relaxed text-center">
              Time to reframe. Which response is healthier?
            </p>
          </div>

          <div className="h-[150px] flex items-center justify-center text-muted-foreground text-sm mb-6">
            [Image: Character standing at fork in road, one path dark/stormy, one path lighter]
          </div>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedReframe('A')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReframe === 'A'
                    ? 'border-muted bg-muted/20'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <p className="font-medium">A) "I'll probably bomb it. Why even try?"</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedReframe('B');
                  setEarnedXP(prev => prev + 30);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReframe === 'B'
                    ? 'border-success bg-success/20'
                    : 'border-border hover:border-success/50'
                }`}
              >
                <p className="font-medium">B) "I'm nervous, but I've prepared. Even if I stumble, it's not the end of the world."</p>
              </motion.button>
            </div>

            {selectedReframe === 'A' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-primary/20 rounded-xl"
              >
                <p className="font-semibold">💙 I feel you, that fear is real.</p>
                <p className="text-sm mt-2">
                  But here's the thing—your anxiety is catastrophizing (making worst-case scenarios). 
                  Let's try option B together. It's gentler on you and keeps you in the game.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSelectedReframe(null)}
                >
                  Try Again
                </Button>
              </motion.div>
            )}

            {selectedReframe === 'B' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-success/20 rounded-xl"
              >
                <p className="font-semibold text-success">🔥 YES!</p>
                <p className="text-sm mt-2">
                  That's realistic AND supportive. You acknowledged the fear without letting it control you. 
                  That's pro-level emotional intelligence right there. <span className="font-bold">+30 XP</span> 🧠
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
            🎯
          </motion.div>

          <h2 className="text-4xl font-bold">Level complete!</h2>
          <p className="text-lg text-muted-foreground">
            You learned to catch anxious thoughts before they spiral.
          </p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Card className="p-8 gradient-hero text-white shadow-glow">
              <div className="text-7xl font-bold mb-2">+60</div>
              <div className="text-2xl font-bold mb-1">XP Earned</div>
              <div className="text-lg opacity-90">Total gained: +{earnedXP + 60} XP</div>
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
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-semibold">Badge Unlocked</div>
              <div className="text-xs opacity-90">Thought Catcher</div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-semibold">Level {currentUser.level}</div>
              <div className="text-xs text-muted-foreground">{currentUser.xp + 60} XP</div>
            </Card>
          </motion.div>

          <div className="p-6 bg-primary/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">🧘 New skill unlocked:</p>
            <p className="text-muted-foreground">
              "Quick Calm" breathing exercise (available in chatbot)
            </p>
          </div>

          <div className="p-6 bg-accent/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">🎮 Next up:</p>
            <p className="text-muted-foreground">
              Learn how to recharge when you're running on empty...
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStage = stages[stage];
  const progress = ((stage + 1) / stages.length) * 100;

  const canProceed = () => {
    if (stage === 1) return selectedQuizAnswer === 'B';
    if (stage === 2) return tappedThoughts.length === thoughts.length;
    if (stage === 3) return selectedReframe === 'B';
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
