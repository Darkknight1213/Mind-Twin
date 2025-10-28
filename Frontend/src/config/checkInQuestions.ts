// Flexible daily check-in questions config - easily add/remove questions here!

export type QuestionType = 'mood' | 'energy' | 'stress' | 'focus' | 'text';

export interface CheckInQuestion {
  id: string;
  step: number;
  type: QuestionType;
  question: string;
  emoji: string;
  options?: CheckInOption[];
  placeholder?: string; // For text inputs
  gradient?: string; // Background gradient for the step
}

export interface CheckInOption {
  label: string;
  emoji: string;
  value: string | number;
}

// 🎮 Configure your check-in flow here - add, remove, or reorder questions!
export const checkInQuestions: CheckInQuestion[] = [
  {
    id: 'mood',
    step: 1,
    type: 'mood',
    question: "How do you feel this morning?",
    emoji: "💭",
    gradient: "from-primary/20 via-accent/10 to-background",
    options: [
      { label: 'Amazing', emoji: '😁', value: 'happy' },
      { label: 'Good', emoji: '🙂', value: 'okay' },
      { label: 'Meh', emoji: '😕', value: 'meh' },
      { label: 'Down', emoji: '😢', value: 'sad' },
      { label: 'Stressed', emoji: '😠', value: 'angry' },
    ]
  },
  {
    id: 'energy',
    step: 2,
    type: 'energy',
    question: "How much energy do you wake up with?",
    emoji: "🔋",
    gradient: "from-success/20 via-primary/10 to-background",
    options: [
      { label: 'Empty', emoji: '🪫', value: 1 },
      { label: 'Low', emoji: '🔋', value: 2 },
      { label: 'Medium', emoji: '🔋', value: 3 },
      { label: 'High', emoji: '⚡', value: 4 },
      { label: 'Full', emoji: '⚡', value: 5 },
    ]
  },
  {
    id: 'stress',
    step: 3,
    type: 'stress',
    question: "What's stressing you out the most today?",
    emoji: "😰",
    gradient: "from-warning/20 via-accent/10 to-background",
    options: [
      { label: 'School', emoji: '📚', value: 'school' },
      { label: 'Work', emoji: '💼', value: 'work' },
      { label: 'Family', emoji: '🏠', value: 'family' },
      { label: 'Friends', emoji: '👥', value: 'friends' },
      { label: 'Nothing', emoji: '😊', value: 'none' },
    ]
  },
  {
    id: 'focus',
    step: 4,
    type: 'focus',
    question: "What's your main focus for today?",
    emoji: "🎯",
    gradient: "from-accent/20 via-primary/10 to-background",
    options: [
      { label: 'Rest', emoji: '🛏️', value: 'rest' },
      { label: 'Connect', emoji: '💬', value: 'connect' },
      { label: 'Move', emoji: '🧘', value: 'move' },
      { label: 'Create', emoji: '🎨', value: 'create' },
      { label: 'Learn', emoji: '📚', value: 'learn' },
    ]
  },
  {
    id: 'notes',
    step: 5,
    type: 'text',
    question: "Anything else on your mind?",
    emoji: "✍️",
    placeholder: "Type here... (optional)",
    gradient: "from-primary/10 via-accent/5 to-background",
  }
];

// Helper to get total steps
export const getTotalSteps = () => checkInQuestions.length;

// Helper to get mood emoji for avatar display
export const getMoodEmoji = (mood: string): string => {
  const moodMap: Record<string, string> = {
    'happy': '😁',
    'okay': '🙂',
    'meh': '😕',
    'sad': '😢',
    'angry': '😠',
    'calm': '🙂',
    'neutral': '😐',
    'anxious': '😰',
  };
  return moodMap[mood] || '🙂';
};
