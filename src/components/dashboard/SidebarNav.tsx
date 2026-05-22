'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Landmark, UserCircle, Store } from 'lucide-react';

interface SidebarNavProps {
  user?: {
    user_metadata?: {
      full_name?: string;
      intent?: string;
    };
    email?: string;
  };
}

export function SidebarNav({ user }: SidebarNavProps) {
  const pathname = usePathname();
  const name = user?.user_metadata?.full_name || 'Empowered Woman';
  const role = user?.user_metadata?.intent === 'teach' ? 'Mentor' : 'Learner';

  const navItems = [
    { name: 'Home Feed', href: '/', icon: Home },
    { name: 'Mentorship Directory', href: '/mentorship', icon: Users },
    { name: 'Government Schemes', href: '/schemes', icon: Landmark },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
    { name: 'My Profile', href: '/profile', icon: UserCircle },
  ];

  return (
    <div className="sticky top-28 flex flex-col justify-between h-[calc(100vh-8rem)] pb-8">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[var(--color-royal-heath-900)] border border-[var(--color-royal-heath-200)] shadow-sm scale-102 translate-x-0.5'
                  : 'text-[var(--color-royal-heath-950)] hover:bg-[var(--color-royal-heath-100)]/60 hover:text-[var(--color-royal-heath-900)]'
              }`}
            >
              <item.icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'text-[var(--color-royal-heath-600)] scale-105' : 'text-[var(--color-royal-heath-800)]/80'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Profile Slot */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-royal-heath-100)] to-[var(--color-royal-heath-200)] flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold shrink-0 shadow-inner">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-[var(--color-royal-heath-950)] truncate">{name}</p>
          <p className="text-xs text-[var(--color-royal-heath-800)]/70 truncate font-semibold">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
