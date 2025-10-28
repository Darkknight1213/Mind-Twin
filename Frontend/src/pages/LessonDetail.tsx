import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { allLessons } from '@/lib/dummyData';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Target, MessageCircle, Award } from 'lucide-react';
import Confetti from 'react-confetti';

export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = allLessons.find(l => l.id === id);
  
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState({ practice: '', reflection: '', rating: [5] });
  const [showConfetti, setShowConfetti] = useState(false);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const stages = [
    {
      icon: BookOpen,
      title: 'Setup',
      content: (
        <div className="space-y-6 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-3xl font-bold">{lesson.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lesson.description}
          </p>
          <div className="flex gap-4 justify-center text-sm">
            <div className="px-4 py-2 bg-primary/10 rounded-full">
              ⏱️ {lesson.duration}
            </div>
            <div className="px-4 py-2 bg-warning/10 rounded-full">
              ⭐ +{lesson.xpReward} XP
            </div>
          </div>
          <p className="text-muted-foreground">
            Find a quiet space where you can focus for the next few minutes.
          </p>
        </div>
      )
    },
    {
      icon: BookOpen,
      title: 'Learn',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-hope flex items-center justify-center text-white">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Let's Learn</h2>
              <p className="text-muted-foreground">Understanding the concepts</p>
            </div>
          </div>

          <Card className="p-6 bg-primary/5">
            <p className="text-lg leading-relaxed">
              Anxiety is a natural response to stress, but when it becomes overwhelming, 
              it can interfere with daily life. The good news? You can learn to manage it.
            </p>
          </Card>

          <Card className="p-6 bg-success/5">
            <h3 className="font-semibold mb-3">💡 Key Insight</h3>
            <p>
              Your thoughts, feelings, and physical sensations are all connected. 
              By understanding this connection, you can start to break the anxiety cycle.
            </p>
          </Card>

          <Card className="p-6 bg-accent/5">
            <h3 className="font-semibold mb-3">🎯 Remember</h3>
            <ul className="space-y-2">
              <li>• Anxiety is temporary</li>
              <li>• You have tools to manage it</li>
              <li>• Progress, not perfection</li>
            </ul>
          </Card>
        </div>
      )
    },
    {
      icon: Target,
      title: 'Practice',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-growth flex items-center justify-center text-white">
              <Target size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Time to Practice</h2>
              <p className="text-muted-foreground">Apply what you've learned</p>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Try This Exercise:</h3>
            <p className="mb-4">
              Think of a recent situation that made you anxious. Write about:
            </p>
            <ol className="space-y-2 mb-4 text-sm text-muted-foreground">
              <li>1. What was happening?</li>
              <li>2. What thoughts went through your mind?</li>
              <li>3. How did your body feel?</li>
            </ol>
            <Textarea
              placeholder="Type your response here..."
              value={answers.practice}
              onChange={(e) => setAnswers({ ...answers, practice: e.target.value })}
              rows={6}
            />
          </Card>

          <Card className="p-6 bg-warning/5">
            <p className="text-sm">
              💭 <strong>Remember:</strong> There are no wrong answers. This is your safe space to explore.
            </p>
          </Card>
        </div>
      )
    },
    {
      icon: MessageCircle,
      title: 'Reflect',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-compassion flex items-center justify-center text-white">
              <MessageCircle size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Reflect on Your Learning</h2>
              <p className="text-muted-foreground">How was that experience?</p>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">What did you discover?</h3>
            <Textarea
              placeholder="Share your reflections..."
              value={answers.reflection}
              onChange={(e) => setAnswers({ ...answers, reflection: e.target.value })}
              rows={4}
            />
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">How helpful was this lesson?</h3>
            <div className="space-y-4">
              <Slider
                value={answers.rating}
                onValueChange={(val) => setAnswers({ ...answers, rating: val })}
                min={1}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not helpful</span>
                <span className="font-bold text-primary text-lg">{answers.rating[0]}/10</span>
                <span>Very helpful</span>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      icon: Award,
      title: 'Reward',
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Sparkles className="w-24 h-24 mx-auto text-warning mb-6" />
          </motion.div>

          <h2 className="text-4xl font-bold">Literally thriving! 🎉</h2>
          
          <Card className="p-8 gradient-hero text-white">
            <motion.div 
              className="text-6xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              +{lesson.xpReward}
            </motion.div>
            <div className="text-2xl font-bold mb-2">🔥 +{lesson.xpReward} XP! You're crushing it!</div>
            <div className="text-lg opacity-90">Main character energy, period 💪</div>
          </Card>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <Card className="p-4">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-sm font-semibold">Knowledge +1</div>
            </Card>
            <Card className="p-4">
              <div className="text-3xl mb-2">💪</div>
              <div className="text-sm font-semibold">Resilience +1</div>
            </Card>
            <Card className="p-4">
              <div className="text-3xl mb-2">🌱</div>
              <div className="text-sm font-semibold">Growth +1</div>
            </Card>
          </div>

          <p className="text-muted-foreground">
            No cap, you're becoming that person ✨
          </p>
        </div>
      )
    }
  ];

  const currentStage = stages[stage];
  const progress = ((stage + 1) / stages.length) * 100;

  const handleNext = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
      if (stage === stages.length - 2) {
        // Show confetti on reaching reward stage
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
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
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/lessons')}
            className="mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Lessons
          </Button>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{currentStage.title}</span>
              <span>Step {stage + 1} of {stages.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-6 shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
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
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Button>

          <Button onClick={handleNext} size="lg">
            {stage === stages.length - 1 ? 'Finish' : 'Continue'}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
