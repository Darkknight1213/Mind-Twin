import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { journalEntries } from '@/lib/dummyData';
import { ArrowLeft, PenLine, Mic, Image as ImageIcon, Sparkles, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Journal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('text');
  const [entry, setEntry] = useState('');

  const aiPrompts = [
    "What's 1 thing you're proud of today?",
    "What helped you feel calm today?",
    "What would you tell your younger self?",
    "What are you grateful for right now?",
  ];

  const [currentPrompt] = useState(aiPrompts[Math.floor(Math.random() * aiPrompts.length)]);

  const handleSubmit = () => {
    if (entry.trim()) {
      toast.success('Journal entry saved! +20 XP earned');
      setEntry('');
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/10 text-success';
      case 'negative': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
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
            <PenLine className="text-accent" size={32} />
            <h1 className="text-4xl font-bold">Your Journal</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Express yourself freely - text, voice, or photos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - New Entry */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-primary" />
                <h2 className="text-xl font-semibold">New Entry</h2>
              </div>

              {/* AI Prompt */}
              <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-medium mb-1">Today's Prompt</p>
                    <p className="text-muted-foreground">{currentPrompt}</p>
                  </div>
                </div>
              </Card>

              {/* Entry Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <PenLine size={16} />
                    <span className="hidden sm:inline">Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2">
                    <Mic size={16} />
                    <span className="hidden sm:inline">Voice</span>
                  </TabsTrigger>
                  <TabsTrigger value="photo" className="flex items-center gap-2">
                    <ImageIcon size={16} />
                    <span className="hidden sm:inline">Photo</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text">
                  <Textarea
                    placeholder="Write your thoughts..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    rows={10}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {entry.length} characters
                    </span>
                    <Button onClick={handleSubmit} disabled={!entry.trim()}>
                      <Send size={16} className="mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="text-center py-12">
                  <Mic className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Voice recording feature</p>
                  <Button variant="outline">
                    <Mic size={16} className="mr-2" />
                    Start Recording
                  </Button>
                </TabsContent>

                <TabsContent value="photo" className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Add photos to your journal</p>
                  <Button variant="outline">
                    <ImageIcon size={16} className="mr-2" />
                    Upload Photo
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Right - Past Entries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 shadow-card sticky top-8">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                <span>Past Entries</span>
                <Badge variant="secondary">{journalEntries.length}</Badge>
              </h3>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {journalEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Card className="p-4 hover:shadow-md transition-smooth cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium">{entry.date}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.mood}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getSentimentColor(entry.sentiment)}`}
                          >
                            {entry.sentiment}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {entry.content}
                      </p>
                      {entry.type !== 'text' && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {entry.type === 'voice' ? '🎤 Voice' : '📷 Photo'}
                        </Badge>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Entries
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
