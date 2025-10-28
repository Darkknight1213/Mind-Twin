import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { markCheckInComplete } from '@/lib/dummyData';
import { checkInQuestions, getTotalSteps, type CheckInQuestion } from '@/config/checkInQuestions';
import { Progress } from '@/components/ui/progress';

interface DailyCheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CheckInAnswers {
  [key: string]: any;
}

export default function DailyCheckInModal({ open, onOpenChange }: DailyCheckInModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [answers, setAnswers] = useState<CheckInAnswers>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = getTotalSteps();
  const currentQuestion = checkInQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - submit
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    markCheckInComplete(answers.mood);
    setShowConfetti(true);
    setShowReward(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleClose = () => {
    setCurrentStep(0);
    setShowReward(false);
    setAnswers({});
    setShowConfetti(false);
    onOpenChange(false);
  };

  const canProceed = () => {
    // For text type, allow proceeding even if empty (optional)
    if (currentQuestion?.type === 'text') return true;
    // For other types, require an answer
    return answers[currentQuestion?.id] !== undefined;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}

        <AnimatePresence mode="wait">
          {!showReward ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion?.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-8 rounded-3xl bg-gradient-to-br ${currentQuestion?.gradient} border border-border/50`}
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-6xl mb-4"
                  >
                    {currentQuestion?.emoji}
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">{currentQuestion?.question}</h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-4">
                  {currentQuestion?.type === 'text' ? (
                    <Input
                      placeholder={currentQuestion.placeholder}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                      className="text-center text-lg h-14"
                    />
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {currentQuestion?.options?.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant={answers[currentQuestion.id] === option.value ? 'default' : 'outline'}
                            onClick={() => handleAnswer(currentQuestion.id, option.value)}
                            className={`w-full h-auto py-6 flex flex-col gap-2 ${
                              answers[currentQuestion.id] === option.value
                                ? 'shadow-glow ring-2 ring-primary'
                                : ''
                            }`}
                          >
                            <motion.span
                              className="text-4xl"
                              animate={
                                answers[currentQuestion.id] === option.value
                                  ? { scale: [1, 1.2, 1] }
                                  : {}
                              }
                              transition={{ duration: 0.3 }}
                            >
                              {option.emoji}
                            </motion.span>
                            <span className="text-xs font-semibold">{option.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                )}
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="w-full gradient-hope text-white font-bold shadow-glow"
                    size="lg"
                  >
                    {currentStep === totalSteps - 1 ? 'Finish ✨' : 'Next'}
                    {currentStep < totalSteps - 1 && <ArrowRight size={18} className="ml-2" />}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-warning via-success to-primary rounded-full blur-2xl opacity-50"
                />
                <Sparkles size={80} className="text-warning mx-auto mb-6 relative z-10" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Period Slay! ✨
              </h3>
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="inline-block bg-gradient-to-r from-warning to-success rounded-2xl p-4 shadow-glow">
                  <span className="text-white font-bold text-4xl">+30 XP</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  (you're iconic fr fr)
                </p>
              </motion.div>
              <p className="text-base text-muted-foreground mb-8">
                Bestie, that's what I'm talking about! 💪<br />
                Keep this energy going 🔥
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleClose} size="lg" className="w-full shadow-glow gradient-hope text-white font-bold">
                  Let's Go! 🚀
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
