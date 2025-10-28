import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MoodEmoji from '@/components/MoodEmoji';
import { getTodayMood } from '@/lib/dummyData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickReplies = [
  "I'm anxious 😰",
  "I need motivation 💪",
  "Reflect on today 🤔",
  "I'm feeling great! ✨"
];

const twinResponses: Record<string, string> = {
  'anxious': "Ugh anxiety is the actual worst. What's making you feel this way? Sometimes just naming it helps 💙",
  'bad day': "I'm sorry today was rough. Want to talk about it or should we do something to help you feel better? I'm here either way",
  'tired': "That's so valid. Rest is productive too, no cap. How's your sleep been?",
  'proud': "YESSS! As you should be! Tell me what you did 👑",
  'help': "I got you. What do you need right now? We can do a breathing exercise, journal, or just talk it out",
  'thanks': "Always! That's what I'm here for. You deserve support 💕",
  'sad': "I see you and I'm here with you. It's okay to not be okay. Want to share what's going on? 🫂",
  'stressed': "Stress is tough but you're tougher. Let's work through this together. What's weighing on you?",
  'happy': "Love this energy! What's got you feeling good today? Let's celebrate it ✨",
  'motivation': "You're stronger than you think! Every small step counts. What's one thing you can do right now? 💪",
  'reflect': "Let's take a moment. What went well today? What challenged you? Both are part of growth 🌱",
  'great': "That's what I love to see! Keep riding that wave. What made today special? ✨",
  'default': "I'm listening. Tell me more about what's on your mind 💭"
};

export default function ChatbotModal({ open, onOpenChange }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey bestie! 👋 I'm your digital twin, here to support you through whatever you're going through. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getTwinResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(twinResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    return twinResponses.default;
  };

  const handleSend = (message?: string) => {
    const textToSend = message || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getTwinResponse(textToSend),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const mood = getTodayMood();
  const isLowMood = ['sad', 'angry', 'meh'].includes(mood);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-2xl h-[700px] p-0 gap-0 transition-colors duration-500 ${
        isLowMood 
          ? 'bg-gradient-to-br from-primary/10 via-accent/5 to-warning/10'
          : 'bg-gradient-to-br from-card via-primary/5 to-accent/10'
      }`}>
        {/* Enhanced Header with Large Mood Emoji */}
        <div className="flex items-center justify-between p-6 border-b glass backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <MoodEmoji size="md" animate={true} />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-card animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                Chat with Your Twin
                <Sparkles size={18} className="text-primary" />
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Always here for you</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="rounded-full hover:bg-destructive/10"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'gradient-hope text-white ml-auto'
                        : 'glass border border-border/50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className="glass border border-border/50 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">😶‍🌫️</span>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-2.5 h-2.5 bg-primary rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Input with Quick Replies */}
        <div className="p-6 border-t glass backdrop-blur-lg space-y-3">
          {/* Quick Reply Buttons */}
          {messages.length <= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {quickReplies.map((reply, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(reply)}
                    disabled={isTyping}
                    className="rounded-full text-xs hover-lift"
                  >
                    {reply}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Input Row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Talk to me about anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                className="pr-16 rounded-full h-12 glass border-border/50"
                maxLength={500}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {input.length}/500
              </span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="shrink-0 rounded-full shadow-glow gradient-warmth h-12 w-12"
                size="icon"
              >
                <Send size={20} />
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
