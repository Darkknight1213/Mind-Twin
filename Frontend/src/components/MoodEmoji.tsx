import { motion } from 'framer-motion';
import { getTodayMood } from '@/lib/dummyData';
import { getMoodEmoji } from '@/config/checkInQuestions';

interface MoodEmojiProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-3xl w-10 h-10',
  md: 'text-5xl w-16 h-16',
  lg: 'text-7xl w-24 h-24',
  xl: 'text-9xl w-32 h-32',
};

export default function MoodEmoji({ size = 'md', animate = true, className = '' }: MoodEmojiProps) {
  const mood = getTodayMood();
  const emoji = getMoodEmoji(mood);

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm ${sizeClasses[size]} ${className}`}
      animate={animate ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={animate ? { scale: 1.1, rotate: [0, -10, 10, 0] } : {}}
    >
      {emoji}
    </motion.div>
  );
}
