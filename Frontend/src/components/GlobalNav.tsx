import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import NotificationsPanel from '@/components/NotificationsPanel';
import { Home, BookOpen, Heart, PenLine, User, Settings, LogOut, Flame, Zap } from 'lucide-react';
import { currentUser } from '@/lib/dummyData';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Lessons', path: '/lessons', icon: BookOpen },
  { label: 'Therapy', path: '/library', icon: Heart },
  { label: 'Journal', path: '/journal', icon: PenLine },
  { label: 'Profile', path: '/profile', icon: User },
];

export default function GlobalNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  // Hide on landing and login pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/onboarding') {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-soft"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-3xl"
              >
                🌱
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                MindTwin
              </span>
            </Link>

            {/* Center Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link key={link.path} to={link.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "relative transition-smooth",
                        active && "text-primary font-semibold"
                      )}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* XP Badge */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="default" className="px-3 py-1.5 gap-1.5 bg-primary text-primary-foreground shadow-soft">
                  <Zap size={14} className="fill-current" />
                  <span className="font-bold">{currentUser.xp} XP</span>
                </Badge>
              </motion.div>

              {/* Streak */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="secondary" className="px-3 py-1.5 gap-1.5 shadow-soft">
                  <Flame size={14} className="text-warning" />
                  <span className="font-bold">{currentUser.growthStreak}</span>
                </Badge>
              </motion.div>

              {/* Notifications Panel */}
              <NotificationsPanel />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-smooth">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-success text-white font-semibold">
                        {currentUser.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card z-[100]">
                  <div className="px-2 py-2">
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    <p className="text-xs text-primary mt-1">Level {currentUser.level}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-soft pb-safe"
      >
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-smooth w-full",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  <span className={cn(
                    "text-[10px] font-medium",
                    active && "font-bold"
                  )}>
                    {link.label === 'Dashboard' ? 'Home' : 
                     link.label === 'Therapy' ? 'Therapy' : 
                     link.label === 'Profile' ? 'You' : link.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 hidden md:block" />
      <div className="h-20 md:hidden" />
    </>
  );
}
