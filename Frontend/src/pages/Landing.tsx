import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, Users, TrendingUp, BookOpen, Heart, Shield, Star, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: 'Your Digital Twin',
      description: 'A personalized avatar that grows and changes with your mental health journey'
    },
    {
      icon: Target,
      title: 'Gamified Learning',
      description: 'Earn XP, maintain streaks, and unlock badges as you progress'
    },
    {
      icon: TrendingUp,
      title: 'Evidence-Based',
      description: 'CBT, mindfulness, and trauma-informed techniques backed by research'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar journeys in a safe, supportive space'
    },
  ];

  const howItWorks = [
    {
      icon: Heart,
      title: 'Heal',
      description: 'Process emotions safely with evidence-based therapy modules',
      gradient: 'from-accent to-accent-glow'
    },
    {
      icon: BookOpen,
      title: 'Grow',
      description: 'Build mental wellness skills through gamified lessons',
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Shield,
      title: 'Thrive',
      description: 'Maintain streaks, level up, and become your strongest self',
      gradient: 'from-success to-success-glow'
    },
  ];

  const testimonials = [
    { text: "Changed my life 🔥", author: "Sarah, 24", rating: 5 },
    { text: "Best mental health app period ✨", author: "Mike, 19", rating: 5 },
    { text: "Actually fun to do therapy", author: "Alex, 22", rating: 5 },
    { text: "My anxiety is so much better", author: "Jamie, 20", rating: 5 },
  ];

  const pricingFeatures = [
    "Unlimited lesson access",
    "Daily check-ins with your Twin",
    "Progress tracking & analytics",
    "Badge achievements",
    "Community support",
    "Ad-free experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold cursor-pointer flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <span>🌱</span>
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              MindTwin
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-smooth">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-smooth">How It Works</a>
            <a href="#pricing" className="hover:text-primary transition-smooth">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
            <Button onClick={() => navigate('/login')} className="gradient-hope">
              Sign Up Free
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-success rounded-full blur-3xl" />
        </div>

        <motion.div style={{ y: heroY }} className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Join 10,000+ on their wellness journey</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
                Transform Your
                <br />
                <span className="inline-block bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                  Mental Wellness
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Experience evidence-based therapy through gamification. Build streaks, earn achievements, and chat with your personalized AI companion—all in one beautiful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-6 border-2"
                >
                  Try Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '10K+', label: 'Active Users' },
                  { number: '95%', label: 'Satisfaction' },
                  { number: '4.9★', label: 'Rating' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
                      🌱
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Welcome Back!</div>
                      <div className="text-sm text-muted-foreground">Level 12 • 2,450 XP</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Daily Progress</span>
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: '🔥', label: '7 Day\nStreak', color: 'from-orange-500 to-red-500' },
                      { icon: '⭐', label: 'Rising\nStar', color: 'from-yellow-500 to-amber-500' },
                      { icon: '💪', label: 'Mind\nMaster', color: 'from-blue-500 to-purple-500' }
                    ].map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className={`bg-gradient-to-br ${achievement.color} p-4 rounded-2xl text-center`}
                      >
                        <div className="text-3xl mb-1">{achievement.icon}</div>
                        <div className="text-[10px] text-white font-medium leading-tight whitespace-pre-line">
                          {achievement.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Testimonial Card */}
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl max-w-[280px]"
                >
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="font-medium text-sm mb-1">{testimonials[currentTestimonial].text}</p>
                  <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].author}</p>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-success to-primary rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-3xl">✨</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for Your Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform your mental wellness, backed by science
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Path to Wellness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven three-step approach to lasting mental health transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-y-1/2 z-0" />
                )}
                
                <div className="relative bg-card border border-border p-8 rounded-3xl h-full hover:shadow-2xl transition-all">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>

                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <step.icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-muted-foreground">
              100% free forever. No credit card required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="relative">
              {/* Gradient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-success rounded-3xl blur-xl opacity-20" />
              
              <div className="relative bg-card border-2 border-primary/20 p-10 rounded-3xl">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-4">
                    <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      FREE FOREVER
                    </span>
                  </div>
                  <div className="text-6xl font-bold mb-2">$0</div>
                  <p className="text-muted-foreground">No hidden fees, ever</p>
                </div>

                <div className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center flex-shrink-0">
                        <Check className="text-white" size={16} />
                      </div>
                      <span className="text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate('/login')}
                  size="lg"
                  className="w-full py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="text-6xl mb-6">🌱</div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                Mental Wellness?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of people who are already on their journey to better mental health. Start today, completely free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-xl transition-all"
              >
                Start Free Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-10 py-7 border-2"
              >
                Try Demo First
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • Free forever • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🌱</span>
                <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                  MindTwin
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your journey to mental wellness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>FAQ</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border/50">
            © 2024 MindTwin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
