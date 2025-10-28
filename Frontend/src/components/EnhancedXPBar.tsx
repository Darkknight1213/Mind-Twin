import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface EnhancedXPBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
}

export default function EnhancedXPBar({ currentXP, totalXP, level }: EnhancedXPBarProps) {
  const percentage = (currentXP / totalXP) * 100;
  
  const getMotivationalMessage = () => {
    if (percentage <= 25) return "Keep building! 🌱";
    if (percentage <= 50) return "You're getting there! 💪";
    if (percentage <= 75) return "So close to leveling up! ⚡";
    if (percentage <= 99) return `Almost there! ${totalXP - currentXP} XP away from greatness! 🔥`;
    return "LEVEL UP TIME! 🎉";
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-3">
        {/* Current Level Badge */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full gradient-hope flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-lg">{level}</span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ['0 0 20px hsl(211 68% 57% / 0.3)', '0 0 40px hsl(211 68% 57% / 0.6)', '0 0 20px hsl(211 68% 57% / 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              {getMotivationalMessage()}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {currentXP} / {totalXP} XP
            </span>
          </div>
          
          <div className="relative h-4 bg-secondary rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full gradient-hope relative"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
            
            {/* Percentage text inside bar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-md">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Next Level Badge */}
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center opacity-50 relative">
          <span className="text-muted-foreground font-bold text-lg">{level + 1}</span>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🔒</div>
        </div>
      </div>

      {/* Level up notification */}
      {percentage >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Badge className="gradient-warmth text-white text-sm px-4 py-1">
            Ready to level up! 🎊
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
