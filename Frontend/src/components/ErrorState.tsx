import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Oops, something went wrong",
  message = "We're having trouble loading this page. Try again?",
  onRetry 
}: ErrorStateProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <AlertCircle size={64} className="mx-auto text-destructive" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{message}</p>
          
          <div className="flex gap-3 justify-center">
            {onRetry && (
              <Button onClick={onRetry} className="gap-2">
                <RefreshCw size={18} />
                Try Again
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <Home size={18} />
              Go Home
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export function NetworkError() {
  return (
    <ErrorState
      title="Can't connect rn 📡"
      message="Check your wifi and try again?"
      onRetry={() => window.location.reload()}
    />
  );
}

export function NotFoundError() {
  return (
    <ErrorState
      title="Oops, you wandered off the path 🌿"
      message="This page doesn't exist. Let's get you back on track."
    />
  );
}
