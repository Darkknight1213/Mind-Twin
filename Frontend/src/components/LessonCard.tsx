import { motion } from 'framer-motion';
import { Lock, Check, Play, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/lib/dummyData';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

const typeColors = {
  cbt: 'bg-primary/10 text-primary',
  mindfulness: 'bg-success/10 text-success',
  breathing: 'bg-accent/10 text-accent',
  journal: 'bg-warning/10 text-warning',
  exercise: 'bg-secondary text-secondary-foreground',
};

const statusIcons = {
  locked: Lock,
  available: Play,
  'in-progress': Play,
  completed: Check,
};

export default function LessonCard({ lesson, onClick }: LessonCardProps) {
  const StatusIcon = statusIcons[lesson.status];
  const isLocked = lesson.status === 'locked';
  const isCompleted = lesson.status === 'completed';

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <Card
        className={cn(
          'p-4 cursor-pointer transition-smooth shadow-card',
          isLocked && 'opacity-50 cursor-not-allowed',
          isCompleted && 'border-success border-2'
        )}
        onClick={() => !isLocked && onClick?.()}
      >
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
              isCompleted ? 'bg-success text-white' : 
              isLocked ? 'bg-muted text-muted-foreground' : 
              'gradient-hope text-white'
            )}
          >
            <StatusIcon size={24} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base line-clamp-2">{lesson.title}</h3>
              <Badge variant="secondary" className={typeColors[lesson.type]}>
                {lesson.type}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {lesson.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {lesson.duration}
              </span>
              <span className="text-warning font-semibold">
                +{lesson.xpReward} XP
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
