import React from 'react';
import { createClient } from '@/lib/server';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { MentorshipClient } from '@/components/dashboard/MentorshipClient';

// Pre-seeded high-fidelity mentors for initial directory listing
const INITIAL_MENTORS = [
  {
    id: "mentor-anita",
    name: "Anita Sharma",
    role: "Director of Engineering",
    company: "TechEmpower Solutions",
    rating: 4.9,
    reviewsCount: 18,
    expertise: ["Software Architecture", "Tech Leadership", "System Design", "Cloud Infrastructure"],
    bio: "Over 12 years of experience building distributed systems. Passionate about bringing more women into deep-tech engineering and leadership roles. I can guide you through system design challenges, technical roadmap planning, and career progression.",
    avatarInitials: "AS",
    bgGradient: "from-[var(--color-royal-heath-500)] to-[var(--color-royal-heath-700)]",
    availableSlots: 2,
  },
  {
    id: "mentor-kiran",
    name: "Kiran Jha",
    role: "Founder & CEO",
    company: "Sattva Capital",
    rating: 5.0,
    reviewsCount: 24,
    expertise: ["Seed Funding", "Venture Capital", "Business Strategy", "B2B SaaS Growth"],
    bio: "Ex-investment banker turned venture capitalist. Backed over 15 female-founded startups in the past 4 years. Happy to help female entrepreneurs audit their pitch decks, optimize financial projections, and navigate institutional fundraising series.",
    avatarInitials: "KJ",
    bgGradient: "from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-850)]",
    availableSlots: 1,
  },
  {
    id: "mentor-priya",
    name: "Priya Patel",
    role: "VP of Product Development",
    company: "CreativeFlow Studio",
    rating: 4.8,
    reviewsCount: 12,
    expertise: ["UI/UX Design", "Product Management", "Brand Strategy", "User Research"],
    bio: "Passionate product builder with a focus on human-centered design. I help startups convert early-stage MVPs into highly scalable, beautifully polished products. Can help you structure user testing, design wireframes, and establish product-market fit.",
    avatarInitials: "PP",
    bgGradient: "from-[var(--color-royal-heath-400)] to-[var(--color-royal-heath-650)]",
    availableSlots: 3,
  },
  {
    id: "mentor-vasudha",
    name: "Vasudha Murthy",
    role: "Chief Marketing Officer",
    company: "SocialRise Media",
    rating: 4.9,
    reviewsCount: 9,
    expertise: ["Branding", "SEO & Growth", "Digital Marketing", "Public Relations"],
    bio: "Digital growth marketer with over 9 years of startup experience. Specialize in low-cost organic user acquisition, content strategy, and viral social media campaigns. Let's optimize your brand messaging and distribution channels.",
    avatarInitials: "VM",
    bgGradient: "from-[var(--color-royal-heath-700)] to-[var(--color-royal-heath-900)]",
    availableSlots: 2,
  }
];

export default async function MentorshipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative w-full">
      {/* LEFT COLUMN: Sidebar Navigation */}
      <aside className="hidden lg:block lg:col-span-3">
        <SidebarNav user={user || undefined} />
      </aside>

      {/* CENTER COLUMN: Mentorship Hub (Takes remaining 9 columns since no right sidebar widget is needed) */}
      <main className="col-span-1 lg:col-span-9">
        <MentorshipClient initialMentors={INITIAL_MENTORS} />
      </main>
    </div>
  );
}
