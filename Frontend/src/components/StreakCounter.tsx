import { Flame, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  type: 'growth' | 'compassion';
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakCounter({ type, count, size = 'md' }: StreakCounterProps) {
  const isGrowth = type === 'growth';
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 28,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={isGrowth ? { 
        scale: [1, 1.02, 1],
      } : {
        scale: [1, 1.05, 1],
      }}
      transition={isGrowth ? {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } : {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl shadow-soft ${
        isGrowth ? 'bg-warning/10' : 'bg-accent/10'
      }`}
      style={{
        boxShadow: isGrowth 
          ? '0 0 20px rgba(255, 149, 0, 0.3)' 
          : '0 0 20px rgba(233, 75, 141, 0.3)'
      }}
    >
      <motion.div
        animate={isGrowth ? {
          rotate: [-5, 5, -5],
        } : {
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: isGrowth ? 1.5 : 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {isGrowth ? (
          <Flame size={iconSize[size]} className="text-warning" />
        ) : (
          <Heart size={iconSize[size]} className="text-accent" />
        )}
      </motion.div>
      <div className="flex flex-col">
        <span className={`font-bold ${sizeClasses[size]} ${isGrowth ? 'text-warning' : 'text-accent'}`}>
          {count} {count > 1 && "days of being that person 🔥"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isGrowth ? 'Keep the flame alive, bestie!' : 'Self-love is your superpower ❤️'}
        </span>
      </div>
    </motion.div>
  );
}
