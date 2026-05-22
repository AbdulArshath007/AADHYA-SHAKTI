'use client';

import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Send } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  role: 'Mentor' | 'Learner';
  avatarInitials: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  commentsList?: Array<{
    id: string;
    authorName: string;
    avatarInitials: string;
    content: string;
    timestamp: string;
  }>;
  tag?: string;
  likedByUser?: boolean;
}

interface FeedPostProps {
  post: Post;
  onLike?: () => void;
  onComment?: (content: string) => void;
}

export function FeedPost({ post, onLike, onComment }: FeedPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (onComment) {
      onComment(newComment);
    }
    setNewComment('');
  };

  return (
    <article className="bg-white rounded-2xl border border-[var(--color-royal-heath-200)] p-5 shadow-sm mb-4 transition-all hover:border-[var(--color-royal-heath-300)] hover:shadow-md">
      {/* Header info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-royal-heath-100)] to-[var(--color-royal-heath-200)] flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold shrink-0 shadow-inner">
            {post.author.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-[var(--color-royal-heath-950)]">
                {post.author.name}
              </h3>
              <span className="bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-800)] text-[9px] font-bold px-2 py-0.5 rounded border border-[var(--color-royal-heath-200)] uppercase tracking-wider">
                {post.author.role}
              </span>
            </div>
            <div className="text-[11px] text-[var(--color-royal-heath-800)]/60 mt-0.5 flex items-center gap-2">
              <span>{post.timestamp}</span>
              {post.tag && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-royal-heath-200)]"></span>
                  <span className="font-semibold text-[var(--color-royal-heath-600)]">{post.tag}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="text-[var(--color-royal-heath-800)]/60 hover:text-[var(--color-royal-heath-950)] p-1.5 rounded-full hover:bg-[var(--color-royal-heath-50)] transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Main post text */}
      <div className="mb-4">
        <p className="text-[var(--color-royal-heath-950)] text-sm leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Action buttons (Like, Comment, Share) */}
      <div className="flex items-center gap-6 pt-3 border-t border-[var(--color-royal-heath-200)]/50">
        <button 
          onClick={onLike}
          className={`group flex items-center gap-2 transition-colors text-xs font-semibold ${
            post.likedByUser 
              ? 'text-[var(--color-royal-heath-600)]' 
              : 'text-[var(--color-royal-heath-800)]/70 hover:text-[var(--color-royal-heath-600)]'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 transition-transform group-active:scale-125 ${
            post.likedByUser ? 'fill-[var(--color-royal-heath-600)] stroke-[var(--color-royal-heath-600)]' : 'group-hover:fill-[var(--color-royal-heath-600)]/10'
          }`} />
          <span>{post.likes}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className={`group flex items-center gap-2 transition-colors text-xs font-semibold ${
            showComments 
              ? 'text-[var(--color-royal-heath-600)]' 
              : 'text-[var(--color-royal-heath-800)]/70 hover:text-[var(--color-royal-heath-600)]'
          }`}
        >
          <MessageSquare className="w-4.5 h-4.5 group-hover:fill-[var(--color-royal-heath-600)]/10" />
          <span>{post.comments}</span>
        </button>

        <button className="group flex items-center gap-2 text-[var(--color-royal-heath-800)]/70 hover:text-[var(--color-royal-heath-600)] transition-colors text-xs font-semibold ml-auto">
          <Share2 className="w-4.5 h-4.5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Expanded comments drawer */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-[var(--color-royal-heath-100)] space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Write comment input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--color-royal-heath-100)] flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold text-xs shrink-0">
              ME
            </div>
            <div className="relative flex-1 flex items-center">
              <input
                placeholder="Write an encouraging comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-[var(--color-royal-heath-50)] text-xs text-[var(--color-royal-heath-950)] border border-[var(--color-royal-heath-200)] rounded-full pl-3 pr-10 py-2.5 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors"
              />
              <button 
                type="submit" 
                disabled={!newComment.trim()}
                className="absolute right-1.5 p-1.5 bg-[var(--color-royal-heath-600)] text-white rounded-full hover:bg-[var(--color-royal-heath-700)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="space-y-3 pl-2">
            {!post.commentsList || post.commentsList.length === 0 ? (
              <p className="text-xs text-[var(--color-royal-heath-800)]/50 italic py-1">No comments yet. Support this post with a response!</p>
            ) : (
              post.commentsList.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start text-xs group/comment">
                  <div className="h-7 w-7 rounded-full bg-[var(--color-royal-heath-100)]/70 flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold text-[10px] shrink-0">
                    {comment.avatarInitials}
                  </div>
                  <div className="flex-1 bg-[var(--color-royal-heath-50)]/50 rounded-2xl p-2.5 border border-[var(--color-royal-heath-200)]/40 hover:bg-[var(--color-royal-heath-50)] transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-[var(--color-royal-heath-950)]">{comment.authorName}</span>
                      <span className="text-[10px] text-[var(--color-royal-heath-800)]/50">{comment.timestamp}</span>
                    </div>
                    <p className="text-[var(--color-royal-heath-950)] leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </article>
  );
}
