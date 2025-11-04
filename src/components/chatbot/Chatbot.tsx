
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chat } from '@/ai/flows/chat';
import { MessageData } from '@genkit-ai/google-genai';
import { z } from 'zod';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInputSchema = z.object({
  history: z.array(z.custom<MessageData>()),
  message: z.string(),
});
type ChatInput = z.infer<typeof ChatInputSchema>;

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: MessageData = { role: 'user', content: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat({
        history: messages,
        message: input,
      });

      const botMessage: MessageData = { role: 'model', content: [{ text: response.message }] };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: MessageData = { role: 'model', content: [{ text: "Sorry, I'm having trouble connecting. Please try again later." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[600px] z-50"
        >
          <div className="flex flex-col h-full bg-card border rounded-2xl shadow-2xl">
            <header className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6" />
                <h3 className="text-lg font-bold">ENSTA Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-primary/80">
                <X className="w-5 h-5" />
              </Button>
            </header>
            
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-4 space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === 'model' && (
                      <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                        msg.role === 'user'
                          ? "bg-secondary text-secondary-foreground rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none"
                      )}
                    >
                      {msg.content.at(0)?.text}
                    </div>
                    {msg.role === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                      <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2.5 rounded-bl-none">
                         <Loader className="w-5 h-5 animate-spin" />
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>

            <footer className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
