import React from 'react';
import { createClient } from '@/lib/server';
import { BalloonsEffect } from '@/components/balloons-effect';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { CommunityFeed } from '@/components/dashboard/CommunityFeed';
import { type Post } from '@/components/dashboard/FeedPost';
import { SchemeWidget, type Scheme } from '@/components/dashboard/SchemeWidget';

// --- MOCK DATA ---
const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'u1',
      name: 'Anita Sharma',
      role: 'Mentor',
      avatarInitials: 'AS'
    },
    content: "I am looking to mentor two junior software engineers who are preparing for technical interviews. With over 8 years in the industry, I can help you navigate system design and algorithmic challenges. Reach out if interested!",
    timestamp: '2 hours ago',
    tag: 'Tech Leadership',
    likes: 24,
    comments: 2,
    commentsList: [
      {
        id: 'c1-1',
        authorName: 'Sneha Rao',
        avatarInitials: 'SR',
        content: 'I would absolutely love this opportunity! I am struggling with system design interviews.',
        timestamp: '1 hour ago'
      },
      {
        id: 'c1-2',
        authorName: 'Anita Sharma',
        avatarInitials: 'AS',
        content: 'Sounds great Sneha, please check your DM! Let\'s schedule a call this weekend.',
        timestamp: '30 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      id: 'u2',
      name: 'Meera Kapoor',
      role: 'Learner',
      avatarInitials: 'MK'
    },
    content: "What are the best practices for applying for the Mahila Samridhi Yojana? I have my business plan ready but I am stuck on the financial projections section. Any guidance would be deeply appreciated. 🙏",
    timestamp: '5 hours ago',
    tag: 'Entrepreneurship',
    likes: 12,
    comments: 1,
    commentsList: [
      {
        id: 'c2-1',
        authorName: 'Kiran Jha',
        avatarInitials: 'KJ',
        content: 'Start with 3-year cash flow projections. Keep your revenue assumptions conservative. I can send you a template!',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      id: 'u3',
      name: 'Priya Patel',
      role: 'Mentor',
      avatarInitials: 'PP'
    },
    content: "Just finished hosting a workshop on digital literacy for rural women entrepreneurs. The energy and eagerness to learn was incredibly inspiring! Remember, every small step towards digitizing your business opens up a global market.",
    timestamp: '1 day ago',
    likes: 56,
    comments: 0,
    commentsList: []
  }
];

const MOCK_SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'Mudra Yojana for Women',
    level: 'Central',
    category: 'Financial Aid',
    deadline: 'May 30'
  },
  {
    id: 's2',
    name: 'Women Tech Empowerment Initiative',
    level: 'State',
    location: 'Karnataka',
    category: 'Skill Training',
    deadline: 'June 15'
  },
  {
    id: 's3',
    name: 'Mahila Samridhi Yojana',
    level: 'Central',
    category: 'Micro-Finance',
    deadline: 'July 01'
  }
];

export default async function Dashboard(props: { searchParams: Promise<{ signedIn?: string }> }) {
  const searchParams = await props.searchParams;
  const isNewlySignedIn = searchParams?.signedIn === 'true';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <BalloonsEffect trigger={isNewlySignedIn} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative w-full">
        
        {/* LEFT COLUMN: Navigation (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <SidebarNav user={user || undefined} />
        </aside>

        {/* CENTER COLUMN: Feed (6 cols) */}
        <section className="col-span-1 lg:col-span-6">
          <CommunityFeed initialPosts={MOCK_POSTS} user={user || undefined} />
        </section>

        {/* RIGHT COLUMN: Scheme Widget (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <SchemeWidget schemes={MOCK_SCHEMES} />
        </aside>
        
      </div>
    </>
  );
}
