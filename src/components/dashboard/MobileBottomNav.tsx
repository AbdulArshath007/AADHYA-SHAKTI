'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Landmark, UserCircle, Store } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Mentors', href: '/mentorship', icon: Users },
    { name: 'Schemes', href: '/schemes', icon: Landmark },
    { name: 'Bazaar', href: '/marketplace', icon: Store },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/85 backdrop-blur-md border border-[var(--color-royal-heath-200)]/80 rounded-2xl shadow-xl z-40 lg:hidden px-4 py-2 flex justify-between items-center animate-[fade-in-up_0.4s_ease-out]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-300 group shrink-0 relative overflow-hidden"
          >
            <div className={`p-1 rounded-lg transition-transform duration-300 ${isActive ? 'scale-110 text-[var(--color-royal-heath-600)]' : 'text-[var(--color-royal-heath-700)]/80 group-hover:scale-105'}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-[var(--color-royal-heath-900)]' : 'text-[var(--color-royal-heath-750)]/70'}`}>
              {item.name}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-royal-heath-500)]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
