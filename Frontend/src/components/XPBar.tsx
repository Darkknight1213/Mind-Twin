import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
}

export default function XPBar({ currentXP, totalXP, level }: XPBarProps) {
  const percentage = (currentXP / totalXP) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-warning" />
          <span className="text-sm font-semibold">Level {level}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentXP} / {totalXP} XP
        </span>
      </div>
      
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full gradient-warmth"
        />
      </div>
    </div>
  );
}
