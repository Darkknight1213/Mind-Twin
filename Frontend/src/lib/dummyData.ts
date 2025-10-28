// Dummy data for the MindTwin app - all hardcoded for showcase

export interface UserData {
  name: string;
  email: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  growthStreak: number;
  compassionStreak: number;
  highestStreak: number;
  badges: Badge[];
  mood: 'happy' | 'okay' | 'meh' | 'sad' | 'angry' | 'neutral' | 'anxious' | 'calm';
  todayMood?: 'happy' | 'okay' | 'meh' | 'sad' | 'angry'; // From today's check-in
  mentalStats: {
    anxiety: number; // 0-100
    energy: number;
    sleep: number;
    mindfulness: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Lesson {
  id: string;
  title: string;
  module: string;
  type: 'cbt' | 'mindfulness' | 'breathing' | 'journal' | 'exercise';
  description: string;
  duration: string;
  xpReward: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  order: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'text' | 'voice' | 'photo';
  content: string;
  mood: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface TherapyModule {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedTime: 'short' | 'medium' | 'deep';
  icon: string;
  lessonsCount: number;
  progress: number;
  recommended: boolean;
}

// Current user data - Fresh start
export const currentUser: UserData = {
  name: "You",
  email: "",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  growthStreak: 0,
  compassionStreak: 0,
  highestStreak: 0,
  badges: [
    { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🌱', earned: false },
    { id: '2', name: 'Week Warrior', description: 'Achieve a 7 day streak', icon: '🔥', earned: false },
    { id: '3', name: 'Mindful Master', description: 'Complete 10 mindfulness exercises', icon: '🧘', earned: false },
    { id: '4', name: 'Journal Keeper', description: 'Make 20 journal entries', icon: '📔', earned: false },
    { id: '5', name: 'Peak Performer', description: 'Reach level 10', icon: '⭐', earned: false },
  ],
  mood: 'neutral',
  mentalStats: {
    anxiety: 50,
    energy: 50,
    sleep: 50,
    mindfulness: 50,
  }
};

// Lessons data - All fresh and available
export const allLessons: Lesson[] = [
  { id: '1', title: 'Vibe Check: Small Wins Hit Different', module: 'Depression/Low Mood', type: 'cbt', description: 'Meet Alex and learn how small wins boost your mood', duration: '10 min', xpReward: 50, status: 'available', order: 1 },
  { id: '2', title: 'Catch & Yeet: Anxious Thought Edition', module: 'Anxiety Basics', type: 'cbt', description: 'Managing anxious/intrusive thoughts with interactive tapping mini-game', duration: '15 min', xpReward: 60, status: 'available', order: 2 },
  { id: '3', title: 'Energy Bar Check: Recharge Mode', module: 'Self-Care', type: 'journal', description: 'Self-care, energy management, preventing burnout with decision-tree scenarios', duration: '12 min', xpReward: 80, status: 'available', order: 3 },
  { id: '4', title: 'Body Scan Meditation', module: 'Mindfulness', type: 'mindfulness', description: 'Connect with your body', duration: '12 min', xpReward: 60, status: 'available', order: 4 },
  { id: '5', title: 'Touch Grass: The 5-4-3-2-1 Method 🌿', module: 'Mindfulness', type: 'journal', description: 'Cultivate appreciation', duration: '8 min', xpReward: 40, status: 'available', order: 5 },
  { id: '6', title: 'Progressive Relaxation', module: 'Mindfulness', type: 'exercise', description: 'Release physical tension', duration: '10 min', xpReward: 50, status: 'available', order: 6 },
  { id: '7', title: 'Understanding Triggers', module: 'Trauma Support', type: 'cbt', description: 'Identify your emotional triggers', duration: '20 min', xpReward: 100, status: 'available', order: 7 },
  { id: '8', title: 'Safe Space Visualization', module: 'Trauma Support', type: 'mindfulness', description: 'Create your mental sanctuary', duration: '15 min', xpReward: 75, status: 'available', order: 8 },
];

// Journal entries - Start fresh
export const journalEntries: JournalEntry[] = [];

// Therapy modules - Fresh start with no progress
export const therapyModules: TherapyModule[] = [
  {
    id: '1',
    name: 'Anxiety Management',
    category: 'CBT',
    description: 'Learn to understand and manage anxiety effectively',
    estimatedTime: 'medium',
    icon: '🧠',
    lessonsCount: 12,
    progress: 0,
    recommended: true
  },
  {
    id: '2',
    name: 'Mindfulness Practice',
    category: 'Mindfulness',
    description: 'Develop present-moment awareness and peace',
    estimatedTime: 'short',
    icon: '🧘',
    lessonsCount: 8,
    progress: 0,
    recommended: true
  },
  {
    id: '3',
    name: 'Trauma Healing',
    category: 'Trauma',
    description: 'Gentle support for processing difficult experiences',
    estimatedTime: 'deep',
    icon: '💚',
    lessonsCount: 15,
    progress: 0,
    recommended: false
  },
  {
    id: '4',
    name: 'Identity & Purpose',
    category: 'Self-Discovery',
    description: 'Explore who you are and what matters to you',
    estimatedTime: 'medium',
    icon: '✨',
    lessonsCount: 10,
    progress: 0,
    recommended: true
  },
  {
    id: '5',
    name: 'Better Sleep',
    category: 'Sleep',
    description: 'Improve sleep quality through evidence-based techniques',
    estimatedTime: 'short',
    icon: '😴',
    lessonsCount: 6,
    progress: 0,
    recommended: false
  },
  {
    id: '6',
    name: 'Social Confidence',
    category: 'Social Skills',
    description: 'Build confidence in social situations',
    estimatedTime: 'medium',
    icon: '👥',
    lessonsCount: 9,
    progress: 0,
    recommended: false
  },
];

// Daily check-in helpers
export const hasDoneCheckInToday = () => {
  const lastCheckIn = localStorage.getItem('lastCheckIn');
  const today = new Date().toDateString();
  return lastCheckIn === today;
};

export const markCheckInComplete = (mood?: string) => {
  const today = new Date().toDateString();
  localStorage.setItem('lastCheckIn', today);
  if (mood) {
    localStorage.setItem('todayMood', mood);
    currentUser.todayMood = mood as any;
  }
};

export const getTodayMood = (): string => {
  const lastCheckIn = localStorage.getItem('lastCheckIn');
  const today = new Date().toDateString();
  if (lastCheckIn === today) {
    return localStorage.getItem('todayMood') || 'okay';
  }
  return 'okay';
};
