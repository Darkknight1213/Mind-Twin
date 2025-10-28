import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { allLessons } from '@/lib/dummyData';
import { Check } from 'lucide-react';

export default function JourneyPathPreview() {
  const navigate = useNavigate();
  const previewLessons = allLessons.slice(0, 5);

  return (
    <div className="h-full">
      <h3 className="font-bold text-lg mb-4">Your Learning Path</h3>
      
      <div className="relative h-[450px] overflow-hidden glass-card rounded-2xl p-4">
        {/* Curved SVG Path */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 50 30 Q 30 80, 50 130 T 50 230 Q 70 280, 50 330 T 50 390"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
        </svg>

        <div className="relative h-full overflow-y-auto pr-2 scrollbar-hide">
          <div className="space-y-12 py-4">
            {previewLessons.map((lesson, index) => {
              const isLocked = lesson.status === 'locked';
              const isCompleted = lesson.status === 'completed';
              const isCurrent = lesson.status === 'in-progress';
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 relative"
                  style={{ 
                    marginLeft: index % 2 === 0 ? '0' : 'auto',
                    marginRight: index % 2 === 0 ? 'auto' : '0',
                    maxWidth: '85%'
                  }}
                >
                  {/* Circular Node */}
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.15 } : {}}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                    className={`
                      relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                      transition-all duration-300 border-4
                      ${isLocked ? 'bg-muted/20 border-muted/40 opacity-50' : ''}
                      ${!isLocked && !isCurrent && !isCompleted ? 'gradient-hope border-primary/30 shadow-glow' : ''}
                      ${isCurrent ? 'gradient-warmth border-warning/50 shadow-[0_0_25px_hsl(35_100%_50%/0.5)]' : ''}
                      ${isCompleted ? 'bg-success/20 border-success' : ''}
                    `}
                    onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                  >
                    {/* Icon or Status */}
                    {isLocked && (
                      <div className="text-2xl">🔒</div>
                    )}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="w-10 h-10 rounded-full bg-success flex items-center justify-center"
                      >
                        <Check className="text-white" size={24} strokeWidth={3} />
                      </motion.div>
                    )}
                    {!isLocked && !isCurrent && !isCompleted && (
                      <div className="text-2xl">⭐</div>
                    )}
                    {isCurrent && (
                      <>
                        <div className="text-2xl">⚡</div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-warning/50"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Lesson Info Card */}
                  <div className={`
                    flex-1 min-w-0 glass-card p-3 rounded-xl
                    ${isLocked ? 'opacity-60' : 'hover-lift'}
                  `}>
                    <h4 className="font-semibold text-sm truncate mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        ⏱️ {lesson.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        ✨ {lesson.xpReward} XP
                      </span>
                      {isCurrent && (
                        <span className="text-warning font-medium">▶ Current</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
