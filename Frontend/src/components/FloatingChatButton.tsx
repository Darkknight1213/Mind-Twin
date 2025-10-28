import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ChatbotModal from './ChatbotModal';
import { useLocation } from 'react-router-dom';

export default function FloatingChatButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  // Hide on landing and login pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/onboarding') {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40"
      >
        <div className="relative">
          {/* Pulsing glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl"
          />
          
          <Button
            size="icon"
            onClick={() => setChatOpen(true)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow hover:scale-110 transition-smooth"
          >
            <MessageCircle size={24} className="text-white" />
            
            {/* AI Badge */}
            <span className="absolute -top-1 -right-1 bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              AI
            </span>
          </Button>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border px-3 py-2 rounded-lg shadow-soft whitespace-nowrap pointer-events-none"
          >
            <p className="text-sm font-medium">💬 Chat with your Twin</p>
          </motion.div>
        </div>
      </motion.div>

      <ChatbotModal open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
