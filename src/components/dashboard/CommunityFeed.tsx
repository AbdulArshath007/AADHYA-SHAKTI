'use client';

import React, { useState } from 'react';
import { ShareBox } from './ShareBox';
import { FeedPost, type Post } from './FeedPost';
import { Sparkles, MessageCircle, TrendingUp } from 'lucide-react';

interface CommunityFeedProps {
  initialPosts: Post[];
  user?: {
    user_metadata?: {
      full_name?: string;
      intent?: string;
    };
    email?: string;
  };
}

export function CommunityFeed({ initialPosts, user }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Tech Leadership', 'Entrepreneurship', 'Workshops', 'Funding'];

  const handlePost = (content: string, tag?: string) => {
    const fullName = user?.user_metadata?.full_name || 'Empowered Woman';
    const initials = fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EW';

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: `u-${Date.now()}`,
        name: fullName,
        role: user?.user_metadata?.intent === 'teach' ? 'Mentor' : 'Learner',
        avatarInitials: initials,
      },
      content,
      timestamp: 'Just now',
      tag: tag === 'General' ? undefined : tag,
      likes: 0,
      comments: 0,
      commentsList: [],
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const liked = !post.likedByUser;
          return {
            ...post,
            likes: liked ? post.likes + 1 : post.likes - 1,
            likedByUser: liked,
          };
        }
        return post;
      })
    );
  };

  const handleComment = (postId: string, commentContent: string) => {
    const fullName = user?.user_metadata?.full_name || 'Empowered Woman';
    const initials = fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EW';

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const currentComments = post.commentsList || [];
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: fullName,
            avatarInitials: initials,
            content: commentContent,
            timestamp: 'Just now',
          };
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...currentComments, newComment],
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'All') return true;
    return post.tag === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Share box for posting */}
      <ShareBox user={user} onPost={handlePost} />

      {/* Dynamic Category Selector & Tab Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[var(--color-royal-heath-200)] p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-royal-heath-600)]" />
            <h3 className="font-serif text-base font-bold text-[var(--color-royal-heath-950)]">Community Hub</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-500)] text-white shadow-md shadow-[var(--color-royal-heath-200)] scale-105'
                    : 'bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-800)] hover:bg-[var(--color-royal-heath-100)] border border-[var(--color-royal-heath-200)]/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--color-royal-heath-200)] p-8 text-center text-[var(--color-royal-heath-800)]/70">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30 text-[var(--color-royal-heath-600)]" />
            <p className="text-sm font-medium">No posts in this category yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={(content) => handleComment(post.id, content)}
            />
          ))
        )}
      </div>
    </div>
  );
}
