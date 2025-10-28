import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate
    navigate('/onboarding');
  };

  const handleGuestMode = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero overflow-hidden relative">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Enhanced Illustration/Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block text-white space-y-8"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-6"
          >
            🌱
          </motion.div>
          
          <div>
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Join 10K+ people<br />growing daily 🌱
            </h2>
            <p className="text-xl opacity-90">
              Your personal mental health companion,<br />but make it iconic
            </p>
          </div>

          {/* Testimonials rotating */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <p className="text-lg font-medium">"Changed my life 🔥"</p>
            <p className="text-sm opacity-75 mt-1">- Alex, Level 12</p>
          </motion.div>

          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Build streaks & level up 🔥</span>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Talk to your digital twin 💬</span>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Evidence-based healing ✨</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Enhanced Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-8 shadow-glow backdrop-blur-sm bg-card/95">
            {/* Mobile logo */}
            <div className="md:hidden text-center mb-6">
              <div className="text-5xl mb-3 animate-float">🌱</div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back Bestie' : 'Join 10K+ Growing Daily'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? 'Ready to continue your journey? 🌱' : 'Your mental health glow-up starts here ✨'}
              </p>
            </div>

            {/* Gamification Preview (only on signup) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2 mb-6"
              >
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔥</div>
                  <p className="text-xs font-medium">Build<br />Streaks</p>
                </div>
                <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <p className="text-xs font-medium">Level<br />Up</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💬</div>
                  <p className="text-xs font-medium">AI<br />Twin</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full border-2 hover:border-primary hover:bg-primary/5" size="lg">
                <Chrome size={18} className="mr-2" />
                Continue with Google
              </Button>
            </motion.div>

            <Button 
              variant="ghost" 
              className="w-full mt-3" 
              onClick={handleGuestMode}
            >
              Try Demo Mode
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
