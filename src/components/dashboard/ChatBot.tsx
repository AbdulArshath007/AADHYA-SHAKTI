'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message';

const getMessageText = (m: any): string => {
  if (m.content) return m.content;
  if (m.parts && Array.isArray(m.parts)) {
    return m.parts
      .filter((part: any) => part.type === 'text')
      .map((part: any) => part.text)
      .join('');
  }
  return '';
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[var(--color-royal-heath-600)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-royal-heath-700)] transition-transform hover:scale-105 z-50 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-white border border-[var(--color-royal-heath-200)] shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-700)] text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold leading-tight">AADHYA SHAKTI AI</h3>
            <p className="text-[10px] text-[var(--color-royal-heath-100)] opacity-90">Your Empowerment Assistant</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[var(--color-royal-heath-50)]/50 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-royal-heath-800)]/70 space-y-3 px-6">
            <MessageCircle className="w-12 h-12 opacity-20" />
            <p className="text-sm font-medium">Hello! I can help you find mentorship, explain government schemes, or navigate the platform. How can I assist you today?</p>
          </div>
        )}
        
        {messages.map((m: any) => (
          <Message key={m.id} from={m.role === 'user' ? 'user' : 'assistant'}>
            <MessageAvatar 
              src={m.role === 'user' ? '' : '/logo-transparent.png'} 
              name={m.role === 'user' ? 'ME' : 'AI'} 
              className={m.role === 'assistant' ? 'bg-[var(--color-royal-heath-100)] p-1' : ''}
            />
            <MessageContent 
              variant="contained" 
              className={m.role === 'user' 
                ? 'bg-[var(--color-royal-heath-600)] text-white' 
                : 'bg-white border border-[var(--color-royal-heath-200)] text-[var(--color-royal-heath-950)] shadow-sm'
              }
            >
              {getMessageText(m)}
            </MessageContent>
          </Message>
        ))}

        {isLoading && (
          <Message from="assistant">
            <MessageAvatar src="/logo-transparent.png" name="AI" className="bg-[var(--color-royal-heath-100)] p-1" />
            <MessageContent className="bg-white border border-[var(--color-royal-heath-200)] shadow-sm">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-royal-heath-400)] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-royal-heath-400)] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-royal-heath-400)] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            </MessageContent>
          </Message>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={onSubmit} className="p-3 bg-white border-t border-[var(--color-royal-heath-200)]">
        <div className="relative flex items-center">
          <input
            className="w-full pl-4 pr-12 py-3 rounded-full border border-[var(--color-royal-heath-200)] focus:outline-none focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] text-sm text-[var(--color-royal-heath-950)] placeholder-[var(--color-royal-heath-800)]/50"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-[var(--color-royal-heath-600)] text-white rounded-full hover:bg-[var(--color-royal-heath-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
}
