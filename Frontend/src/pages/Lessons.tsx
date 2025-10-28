import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { allLessons } from '@/lib/dummyData';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Star, Zap, Check } from 'lucide-react';

export default function Lessons() {
  const navigate = useNavigate();

  const completedCount = allLessons.filter(l => l.status === 'completed').length;
  const inProgressCount = allLessons.filter(l => l.status === 'in-progress').length;
  const lockedCount = allLessons.filter(l => l.status === 'locked').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass-card p-6 rounded-3xl">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="text-primary" />
              Your Learning Journey
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete lessons to unlock new content and earn XP
            </p>
            
            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-warning">{inProgressCount}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-muted-foreground">{lockedCount}</div>
                <div className="text-xs text-muted-foreground">Locked</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Curved Learning Path - Duolingo Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative pb-12"
        >
          {/* Curved SVG Path */}
          <svg className="absolute left-1/2 -translate-x-1/2 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lessonPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d={`M ${50} 60 
                  Q ${30} 140, ${50} 220
                  T ${50} 380
                  Q ${70} 460, ${50} 540
                  T ${50} 700
                  Q ${30} 780, ${50} 860
                  T ${50} 1020
                  Q ${70} 1100, ${50} 1180
                  T ${50} 1340
                  Q ${30} 1420, ${50} 1500
                  T ${50} 1660
                  Q ${70} 1740, ${50} 1820
                  T ${50} 1980`}
              fill="none"
              stroke="url(#lessonPathGradient)"
              strokeWidth="4"
              strokeDasharray="10 5"
            />
          </svg>

          <div className="relative space-y-16 pt-8">
            {allLessons.map((lesson, index) => {
              const isLocked = lesson.status === 'locked';
              const isCompleted = lesson.status === 'completed';
              const isCurrent = lesson.status === 'in-progress';
              const isMilestone = (index + 1) % 5 === 0;
              const offset = index % 2 === 0 ? '-20px' : '20px';

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col items-center"
                  style={{ marginLeft: offset }}
                >
                  {/* Circular Node */}
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.15 } : {}}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer mb-4
                      transition-all duration-300 border-4
                      ${isLocked ? 'bg-muted/30 border-muted/40 opacity-50' : ''}
                      ${!isLocked && !isCurrent && !isCompleted ? 'gradient-hope border-primary/30 shadow-glow' : ''}
                      ${isCurrent ? 'gradient-warmth border-warning/50 shadow-[0_0_30px_hsl(35_100%_50%/0.6)]' : ''}
                      ${isCompleted ? 'bg-success/20 border-success' : ''}
                      ${isMilestone ? 'w-24 h-24 shadow-[0_0_40px_hsl(var(--warning)/0.5)]' : ''}
                    `}
                    onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                  >
                    {/* Icon */}
                    {isLocked && <div className="text-3xl">🔒</div>}
                    {isCompleted && !isMilestone && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="w-12 h-12 rounded-full bg-success flex items-center justify-center"
                      >
                        <Check className="text-white" size={28} strokeWidth={3} />
                      </motion.div>
                    )}
                    {isCompleted && isMilestone && <div className="text-4xl">🏆</div>}
                    {!isLocked && !isCurrent && !isCompleted && (
                      <div className="text-3xl">{isMilestone ? '💎' : '⭐'}</div>
                    )}
                    {isCurrent && (
                      <>
                        <div className="text-3xl">⚡</div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-warning/60"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                    
                    {isMilestone && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-warning/40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </motion.div>

                  {/* Lesson Info Card */}
                  <motion.div
                    whileHover={!isLocked ? { y: -5 } : {}}
                    className={`
                      glass-card p-5 rounded-2xl max-w-xs w-full cursor-pointer
                      ${isLocked ? 'opacity-60' : 'hover-lift'}
                      ${isCurrent ? 'ring-2 ring-warning/50' : ''}
                      ${isCompleted ? 'ring-2 ring-success/50' : ''}
                    `}
                    onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                  >
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      {lesson.title}
                      {isMilestone && <span className="text-lg">👑</span>}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {lesson.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {lesson.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-warning" />
                        {lesson.xpReward} XP
                      </span>
                    </div>

                    {!isLocked && (
                      <Button
                        className={`
                          w-full text-sm
                          ${isCurrent ? 'gradient-warmth' : ''}
                          ${isCompleted ? 'gradient-growth' : ''}
                          ${!isCurrent && !isCompleted ? 'gradient-hope' : ''}
                        `}
                        size="sm"
                      >
                        {isCompleted ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={16} />
                            Review
                          </span>
                        ) : isCurrent ? (
                          <span className="flex items-center gap-1">
                            <Zap size={16} />
                            Continue
                          </span>
                        ) : (
                          'Start Lesson'
                        )}
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
