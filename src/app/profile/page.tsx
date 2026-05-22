import React from 'react';
import { createClient } from '@/lib/server';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { ProfileClient } from '@/components/dashboard/ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Establish high-fidelity values prioritizing saved user metadata over mock fallbacks
  const userName = user?.user_metadata?.full_name || 'Empowered Woman';
  const userEmail = user?.email || 'pioneer@aadhyashakti.org';
  const isMentor = user?.user_metadata?.intent === 'teach';

  const initialProfile = {
    name: userName,
    email: userEmail,
    role: (isMentor ? 'Mentor' : 'Learner') as 'Mentor' | 'Learner',
    company: user?.user_metadata?.company || (isMentor ? 'TechEmpower Solutions' : 'Independent Builder'),
    title: user?.user_metadata?.title || (isMentor ? 'Director of Product Design' : 'Aspiring Software Entrepreneur'),
    phone: user?.user_metadata?.phone || "+91 98765 43210",
    location: user?.user_metadata?.location || "Mumbai, Maharashtra",
    bio: user?.user_metadata?.bio || (isMentor 
      ? "Veteran designer with over 9 years of product strategy experience. I love backing greenfield ideas and helping female founders establish flawless product-market-fit."
      : "Driven product builder seeking to launch a greenfield e-commerce startup. Eager to master web development, learn from experienced industry mentors, and discover government loans."),
    skills: user?.user_metadata?.skills || (isMentor 
      ? ["UI/UX Design", "Wireframing", "Growth Strategy", "Product Auditing"] 
      : ["Product Ideation", "Market Research", "Digital Literacy"]),
    startupName: user?.user_metadata?.startupName || "SheBuilds Textiles",
    startupStage: user?.user_metadata?.startupStage || "Prototype / MVP",
    startupIndustry: user?.user_metadata?.startupIndustry || "Sustainable Craft / Retail",
    startupBio: user?.user_metadata?.startupBio || "SheBuilds Textiles is an organic, direct-to-consumer apparel platform highlighting traditional handloom crafts created by rural women weavers."
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative w-full">
      {/* LEFT COLUMN: Sidebar Navigation */}
      <aside className="hidden lg:block lg:col-span-3">
        <SidebarNav user={user || undefined} />
      </aside>

      {/* CENTER COLUMN: My Profile Dashboard (Takes remaining 9 columns) */}
      <main className="col-span-1 lg:col-span-9">
        <ProfileClient initialProfile={initialProfile} />
      </main>
    </div>
  );
}
