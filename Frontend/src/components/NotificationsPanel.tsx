import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, Flame, Sparkles, Crown, MessageCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'streak' | 'level' | 'badge' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'streak',
      title: '🔥 Your streak is at risk!',
      message: "Don't break your 14-day streak! Check in now",
      time: '2h ago',
      read: false
    },
    {
      id: '2',
      type: 'level',
      title: '✨ New lesson unlocked!',
      message: 'Touch Grass: The 5-4-3-2-1 Method is now available',
      time: '5h ago',
      read: false
    },
    {
      id: '3',
      type: 'badge',
      title: '👑 You leveled up!',
      message: 'Congrats! You reached Level 7',
      time: '1d ago',
      read: true
    },
    {
      id: '4',
      type: 'message',
      title: '💬 Your twin checked on you',
      message: 'How are you feeling today?',
      time: '2d ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'streak': return Flame;
      case 'level': return Sparkles;
      case 'badge': return Crown;
      case 'message': return MessageCircle;
      default: return Bell;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative transition-smooth hover:scale-110"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{unreadCount}</span>
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 max-h-[600px] z-50"
            >
              <Card className="shadow-glow">
                {/* Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[500px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell size={48} className="mx-auto mb-4 opacity-20" />
                      <p>No notifications yet</p>
                      <p className="text-sm">We'll let you know when something happens!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => {
                        const Icon = getIcon(notification.type);
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`p-4 hover:bg-muted/50 transition-smooth cursor-pointer relative group ${
                              !notification.read ? 'bg-primary/5' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex gap-3">
                              <div className={`mt-1 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`}>
                                <Icon size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium mb-1 ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {notification.message}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {notification.time}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-smooth h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X size={14} />
                              </Button>
                            </div>
                            {!notification.read && (
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
