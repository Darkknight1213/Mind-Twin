import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    age: '',
    gender: '',
    mood: '',
    goals: [] as string[],
    experience: '',
    firstGoal: '',
  });

  const totalSteps = 9;
  const progress = ((step + 1) / totalSteps) * 100;

  const canProgress = () => {
    switch(step) {
      case 0: return true;
      case 1: return answers.name.trim() !== '';
      case 2: return answers.age !== '';
      case 3: return answers.gender !== '';
      case 4: return answers.mood !== '';
      case 5: return answers.goals.length > 0;
      case 6: return answers.experience !== '';
      case 7: return answers.firstGoal !== '';
      case 8: return true;
      default: return true;
    }
  };

  const nextStep = () => {
    if (!canProgress()) return;
    
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Save data and navigate to dashboard
      localStorage.setItem('onboardingData', JSON.stringify({
        ...answers,
        completedAt: new Date().toISOString()
      }));
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleGoal = (goal: string) => {
    setAnswers({
      ...answers,
      goals: answers.goals.includes(goal)
        ? answers.goals.filter(g => g !== goal)
        : [...answers.goals, goal]
    });
  };

  const getBackgroundGradient = () => {
    const gradients = [
      'from-purple-900/20 via-primary/10 to-background',
      'from-primary/20 via-orange-500/10 to-background',
      'from-orange-500/20 via-accent/10 to-background',
      'from-accent/20 via-teal-500/10 to-background',
      'from-teal-500/20 via-success/10 to-background',
      'from-success/20 via-primary/10 to-background',
      'from-primary/20 via-purple-500/10 to-background',
      'from-purple-900/20 via-primary/10 to-background',
      'from-primary/20 via-accent/10 to-background',
    ];
    return gradients[step];
  };

  const steps = [
    {
      title: "Welcome & Introduction",
      content: (
        <div className="text-center space-y-8 py-12">
          <motion.div 
            className="text-8xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            🦊
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              Welcome to Your Journey 🌟
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm your fox twin. We're about to embark on a path to better mental wellness—together. 
              Let's get to know each other first.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              onClick={nextStep}
              className="gradient-hope text-lg px-8 py-6 rounded-full shadow-glow hover-lift"
            >
              Let's Start
              <Sparkles className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      )
    },
    {
      title: "What Should I Call You?",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              🦊✨
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">What should I call you?</h2>
            <p className="text-muted-foreground mb-8">
              This is just between us. We'll keep it personal.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Your name or nickname"
              value={answers.name}
              onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
              className="text-center text-xl py-6 rounded-2xl"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && canProgress() && nextStep()}
            />
          </div>
        </div>
      )
    },
    {
      title: "Your Age",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊🎂
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">How old are you?</h2>
            <p className="text-muted-foreground mb-8">
              This helps us personalize your journey
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { id: '13-17', label: '13-17', emoji: '🌱' },
              { id: '18-24', label: '18-24', emoji: '🌿' },
              { id: '25-34', label: '25-34', emoji: '🌳' },
              { id: '35-44', label: '35-44', emoji: '🌲' },
              { id: '45-54', label: '45-54', emoji: '🍃' },
              { id: '55+', label: '55+', emoji: '🌾' },
            ].map((age) => (
              <motion.div
                key={age.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover-lift ${
                    answers.age === age.id ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setAnswers({ ...answers, age: age.id })}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{age.emoji}</div>
                    <span className="font-medium">{age.label}</span>
                  </div>
                  {answers.age === age.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="text-primary" size={20} />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Your Gender",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊✨
            </motion.div>
            <h2 className="text-3xl font-bold">How do you identify?</h2>
            <p className="text-muted-foreground mt-2">We respect all identities</p>
          </div>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {[
              { id: 'male', emoji: '👨', label: 'Male' },
              { id: 'female', emoji: '👩', label: 'Female' },
              { id: 'non-binary', emoji: '✨', label: 'Non-binary' },
              { id: 'prefer-not-to-say', emoji: '🦊', label: 'Prefer not to say' },
              { id: 'other', emoji: '🌈', label: 'Other' },
            ].map((gender) => (
              <motion.div
                key={gender.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-5 cursor-pointer transition-all hover-lift ${
                    answers.gender === gender.id ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setAnswers({ ...answers, gender: gender.id })}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{gender.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{gender.label}</h3>
                    </div>
                    {answers.gender === gender.id && (
                      <Check className="text-primary" size={24} />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Current Mood Check",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊🌤️
            </motion.div>
            <h2 className="text-3xl font-bold">How have you been feeling lately?</h2>
          </div>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {[
              { id: 'good', emoji: '😊', label: 'Pretty Good', desc: 'Things are mostly okay' },
              { id: 'updown', emoji: '😐', label: 'Up and Down', desc: 'Some good days, some tough ones' },
              { id: 'struggling', emoji: '😔', label: 'Struggling', desc: 'Been having a hard time' },
              { id: 'rough', emoji: '😢', label: 'Really Rough', desc: 'Need support urgently' },
            ].map((mood) => (
              <motion.div
                key={mood.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all hover-lift ${
                    answers.mood === mood.id ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setAnswers({ ...answers, mood: mood.id })}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{mood.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{mood.label}</h3>
                      <p className="text-sm text-muted-foreground">{mood.desc}</p>
                    </div>
                    {answers.mood === mood.id && (
                      <Check className="text-primary" size={24} />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "What Brings You Here?",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🦊🗺️
            </motion.div>
            <h2 className="text-3xl font-bold">What are you hoping to work on?</h2>
            <p className="text-muted-foreground mt-2">Select all that apply</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              { id: 'anxiety', icon: '☁️', label: 'Anxiety & Stress' },
              { id: 'depression', icon: '😔', label: 'Depression & Low Mood' },
              { id: 'sleep', icon: '😴', label: 'Sleep Issues' },
              { id: 'thoughts', icon: '💭', label: 'Negative Thoughts' },
              { id: 'anger', icon: '😤', label: 'Anger & Frustration' },
              { id: 'relationships', icon: '🤝', label: 'Relationships & Connection' },
              { id: 'focus', icon: '🎯', label: 'Focus & Motivation' },
              { id: 'growth', icon: '🌱', label: 'General Self-Growth' },
            ].map((goal) => (
              <motion.div
                key={goal.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover-lift ${
                    answers.goals.includes(goal.id) ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={answers.goals.includes(goal.id)}
                      onCheckedChange={() => toggleGoal(goal.id)}
                    />
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-medium">{goal.label}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Your Experience Level",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🦊🏔️
            </motion.div>
            <h2 className="text-3xl font-bold">Have you tried mental wellness practices before?</h2>
          </div>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {[
              { id: 'new', emoji: '🌱', label: 'New to This', desc: 'First time exploring mental health tools' },
              { id: 'some', emoji: '🌿', label: 'Some Experience', desc: 'Tried therapy, apps, or mindfulness before' },
              { id: 'experienced', emoji: '🌲', label: 'Experienced', desc: 'Actively practicing mental wellness techniques' },
            ].map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all hover-lift ${
                    answers.experience === exp.id ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setAnswers({ ...answers, experience: exp.id })}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{exp.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{exp.label}</h3>
                      <p className="text-sm text-muted-foreground">{exp.desc}</p>
                    </div>
                    {answers.experience === exp.id && (
                      <Check className="text-primary" size={24} />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Set Your First Goal",
      content: (
        <div className="space-y-8 py-8">
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊🌱
            </motion.div>
            <h2 className="text-3xl font-bold">What's one small goal for the next week?</h2>
          </div>
          <div className="grid gap-3 max-w-2xl mx-auto">
            {[
              'Check in daily for 7 days',
              'Complete 3 therapy lessons',
              'Journal 5 times',
              'Chat with your twin when feeling down',
              'Try one new coping skill',
            ].map((goal) => (
              <motion.div
                key={goal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover-lift ${
                    answers.firstGoal === goal ? 'border-primary bg-primary/10 shadow-glow' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setAnswers({ ...answers, firstGoal: goal })}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers.firstGoal === goal ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {answers.firstGoal === goal && <Check size={14} className="text-white" />}
                    </div>
                    <span className="font-medium">{goal}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
            <div className="pt-4">
              <Input
                type="text"
                placeholder="Or write your own goal..."
                value={answers.firstGoal.includes('Check in') || answers.firstGoal.includes('Complete') || 
                       answers.firstGoal.includes('Journal') || answers.firstGoal.includes('Chat') || 
                       answers.firstGoal.includes('Try') ? '' : answers.firstGoal}
                onChange={(e) => setAnswers({ ...answers, firstGoal: e.target.value })}
                className="text-lg py-5 rounded-2xl"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Meet Your Twin",
      content: (
        <div className="text-center space-y-8 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <motion.div 
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2 }}
            >
              🦊✨
            </motion.div>
          </motion.div>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              Your Fox Twin is Ready! 🦊✨
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on what you shared, I've prepared a personalized path just for you. Let's grow together.
            </p>
          </div>
          <Card className="p-8 max-w-xl mx-auto glass-card text-left">
            <h3 className="text-2xl font-bold mb-6">Hi {answers.name}! 👋</h3>
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold text-primary">Focus areas:</span>{' '}
                {answers.goals.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}
              </p>
              <p>
                <span className="font-semibold text-accent">Starting level:</span>{' '}
                {answers.experience === 'new' ? 'Beginner' : answers.experience === 'some' ? 'Intermediate' : 'Expert'}
              </p>
              <p>
                <span className="font-semibold text-success">First goal:</span>{' '}
                {answers.firstGoal}
              </p>
            </div>
          </Card>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              onClick={nextStep}
              className="gradient-hope text-xl px-12 py-8 rounded-full shadow-glow hover-lift"
            >
              Start My Journey
              <Sparkles className="ml-2" size={24} />
            </Button>
          </motion.div>
        </div>
      )
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} flex items-center justify-center p-4 transition-all duration-1000`}>
      <div className="w-full max-w-4xl">
        {/* Progress bar */}
        {step > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {totalSteps - 1}</span>
              <span>{Math.round(((step) / (totalSteps - 1)) * 100)}%</span>
            </div>
            <Progress value={((step) / (totalSteps - 1)) * 100} className="h-2" />
          </motion.div>
        )}

        {/* Content */}
        <Card className="p-6 md:p-12 glass-card rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {steps[step].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step > 0 && step < totalSteps - 1 && (
            <div className="flex justify-between mt-12 pt-8 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                size="lg"
                className="rounded-full"
              >
                <ChevronLeft size={20} className="mr-1" />
                Back
              </Button>

              <Button 
                onClick={nextStep}
                disabled={!canProgress()}
                size="lg"
                className="gradient-hope rounded-full shadow-glow"
              >
                Continue
                <ChevronRight size={20} className="ml-1" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
