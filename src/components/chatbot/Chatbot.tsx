
"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = { sender: 'bot', text: `This is a simulated response to: "${input}"` };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-2rem)] max-w-sm h-[60vh] max-h-[500px] z-[100] bg-card border shadow-2xl rounded-xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-xl">
            <div className='flex items-center gap-2'>
              <Bot className="w-6 h-6" />
              <h3 className="font-bold text-lg">ENSTA Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-primary-foreground hover:bg-primary/80">
              <X className="w-5 h-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-end gap-2",
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                      msg.sender === 'user'
                        ? "bg-secondary text-secondary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                <Send className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
