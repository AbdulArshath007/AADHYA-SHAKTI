'use client';

import React, { useState } from 'react';
import { Image, Paperclip, Send, Tag, ChevronDown } from 'lucide-react';

interface ShareBoxProps {
  user?: {
    user_metadata?: {
      full_name?: string;
    };
  };
  onPost?: (content: string, tag?: string) => void;
}

export function ShareBox({ user, onPost }: ShareBoxProps) {
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('General');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const name = user?.user_metadata?.full_name || 'Empowered Woman';
  const initial = name.charAt(0).toUpperCase();

  const tags = ['General', 'Tech Leadership', 'Entrepreneurship', 'Workshops', 'Funding'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (onPost) {
      onPost(content, selectedTag === 'General' ? undefined : selectedTag);
    }
    setContent('');
    setSelectedTag('General');
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-royal-heath-200)] p-5 shadow-sm mb-6 transition-all hover:shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-royal-heath-200)] to-[var(--color-royal-heath-100)] flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold shrink-0 shadow-inner">
            {initial}
          </div>
          <div className="flex-1">
            <textarea
              placeholder={`What's on your mind, ${name.split(' ')[0]}? Share your goals, advice, or ask for guidance...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none resize-none focus:ring-0 p-1 text-sm text-[var(--color-royal-heath-950)] placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-[var(--color-royal-heath-200)]/50 gap-3">
          <div className="flex items-center gap-2">
            {/* Custom Tag Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-royal-heath-50)] border border-[var(--color-royal-heath-200)] text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] hover:bg-[var(--color-royal-heath-100)] rounded-full text-xs font-semibold tracking-wide transition-all"
              >
                <Tag className="w-3.5 h-3.5 text-[var(--color-royal-heath-500)]" />
                <span>{selectedTag}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {isTagDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsTagDropdownOpen(false)}
                  ></div>
                  <div className="absolute left-0 mt-1 w-48 bg-white border border-[var(--color-royal-heath-200)] rounded-xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="px-3 py-1 text-[10px] font-bold text-[var(--color-royal-heath-800)]/50 uppercase tracking-wider">Select Tag</p>
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSelectedTag(tag);
                          setIsTagDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedTag === tag
                            ? 'bg-[var(--color-royal-heath-100)] text-[var(--color-royal-heath-900)]'
                            : 'text-[var(--color-royal-heath-950)] hover:bg-[var(--color-royal-heath-50)]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button type="button" className="p-2 text-[var(--color-royal-heath-800)]/70 hover:bg-[var(--color-royal-heath-50)] hover:text-[var(--color-royal-heath-600)] rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium">
              <Image className="w-4 h-4" />
            </button>
            <button type="button" className="p-2 text-[var(--color-royal-heath-800)]/70 hover:bg-[var(--color-royal-heath-50)] hover:text-[var(--color-royal-heath-600)] rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium">
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="bg-gradient-to-r from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-500)] text-white px-5 py-2 rounded-xl text-xs font-bold hover:shadow-lg shadow-[var(--color-royal-heath-200)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
