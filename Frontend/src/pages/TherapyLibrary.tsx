import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { therapyModules } from '@/lib/dummyData';
import { ArrowLeft, Clock, BookOpen, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TherapyLibrary() {
  const navigate = useNavigate();

  const timeLabels = {
    short: '< 30 min',
    medium: '30-60 min',
    deep: '60+ min'
  };

  const getTimeColor = (time: string) => {
    switch (time) {
      case 'short': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'deep': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const recommended = therapyModules.filter(m => m.recommended);
  const allModules = therapyModules;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-primary" size={32} />
            <h1 className="text-4xl font-bold">Therapy Library</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Explore evidence-based therapy modules designed for your journey
          </p>
        </motion.div>

        {/* Recommended Section */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-warning" size={24} />
              <h2 className="text-2xl font-semibold">Recommended for You</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 h-full shadow-card hover:shadow-glow transition-smooth cursor-pointer relative overflow-hidden">
                    {/* Recommended badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-warning text-white">
                        <Star size={12} className="mr-1" />
                        Recommended
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="text-5xl mb-4">{module.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {module.category}
                    </Badge>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {module.description}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock size={14} />
                          {timeLabels[module.estimatedTime]}
                        </span>
                        <Badge variant="outline" className={getTimeColor(module.estimatedTime)}>
                          {module.estimatedTime}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {module.lessonsCount} lessons
                        </span>
                        {module.progress > 0 && (
                          <span className="text-primary font-semibold">
                            {module.progress}% complete
                          </span>
                        )}
                      </div>

                      {module.progress > 0 && (
                        <Progress value={module.progress} className="h-2" />
                      )}
                    </div>

                    {/* Action button */}
                    <Button 
                      className="w-full mt-4"
                      variant={module.progress > 0 ? 'default' : 'outline'}
                      onClick={() => navigate('/lessons')}
                    >
                      {module.progress > 0 ? 'Continue' : 'Start Module'}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">All Therapy Modules</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{module.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {module.category}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {module.description}
                  </p>

                  {/* Meta info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock size={14} />
                        {timeLabels[module.estimatedTime]}
                      </span>
                      <span className="text-muted-foreground">
                        {module.lessonsCount} lessons
                      </span>
                    </div>

                    {module.progress > 0 && (
                      <>
                        <div className="text-sm text-primary font-semibold">
                          {module.progress}% complete
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </>
                    )}
                  </div>

                  {/* Action button */}
                  <Button 
                    className="w-full mt-4"
                    variant={module.progress > 0 ? 'default' : 'outline'}
                    onClick={() => navigate('/lessons')}
                  >
                    {module.progress > 0 ? 'Continue' : 'Start Module'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
