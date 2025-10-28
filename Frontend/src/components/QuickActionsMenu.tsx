import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PenLine, Wind, MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { 
      icon: PenLine, 
      label: 'Quick Journal', 
      color: 'gradient-compassion',
      action: () => navigate('/journal')
    },
    { 
      icon: Wind, 
      label: '2-Min Breathing', 
      color: 'gradient-hope',
      action: () => {
        // TODO: Open breathing exercise modal
        console.log('Breathing exercise');
      }
    },
    { 
      icon: MessageCircle, 
      label: 'Chat with Twin', 
      color: 'gradient-growth',
      action: () => {
        // This will trigger the chatbot
        document.dispatchEvent(new CustomEvent('openChatbot'));
      }
    },
  ];

  return (
    <div className="fixed bottom-24 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`${action.color} text-white shadow-glow h-14 px-4 gap-2 transition-smooth hover:scale-105`}
                >
                  <action.icon size={20} />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full gradient-warmth text-white shadow-glow hover:shadow-[0_0_40px_hsl(35_100%_50%/0.5)] transition-smooth"
        >
          <Sparkles size={24} />
        </Button>
      </motion.div>
    </div>
  );
}
