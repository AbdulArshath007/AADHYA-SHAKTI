import React from 'react';
import { ArrowRight, Landmark } from 'lucide-react';
import Image from 'next/image';

export interface Scheme {
  id: string;
  name: string;
  level: 'Central' | 'State';
  location?: string;
  category: string;
  deadline?: string;
}

interface SchemeWidgetProps {
  schemes: Scheme[];
}

export function SchemeWidget({ schemes }: SchemeWidgetProps) {
  return (
    <div className="sticky top-28 space-y-6">
      {/* Banner / Header */}
      <div className="relative w-full h-24 rounded-md overflow-hidden shadow-sm border border-[var(--color-royal-heath-200)]">
        <Image src="/banner.png" alt="Scheme Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-royal-heath-900)]/90 to-[var(--color-royal-heath-800)]/60 flex items-center p-5">
          <div className="flex items-center gap-3 text-white">
            <Landmark className="w-5 h-5 opacity-90" />
            <h2 className="font-serif text-lg font-bold">Scheme Portal</h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md border border-[var(--color-royal-heath-200)] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--color-royal-heath-200)] flex items-center justify-between">
          <h3 className="font-bold text-[var(--color-royal-heath-900)] text-sm">Expiring Soon</h3>
          <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Urgent
          </span>
        </div>
        
        <div className="divide-y divide-[var(--color-royal-heath-200)]/60">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="p-4 hover:bg-[var(--color-royal-heath-50)] transition-colors group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">
                  {scheme.level}{scheme.location ? `: ${scheme.location}` : ''}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-royal-heath-300)]"></span>
                <span className="text-[10px] text-[var(--color-royal-heath-800)]/70 uppercase tracking-wider">
                  {scheme.category}
                </span>
              </div>
              <h4 className="font-medium text-[var(--color-royal-heath-950)] text-sm leading-snug mb-2 group-hover:text-[var(--color-royal-heath-600)] transition-colors">
                {scheme.name}
              </h4>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[var(--color-royal-heath-800)] font-medium">
                  {scheme.deadline ? `Closes ${scheme.deadline}` : 'Open'}
                </span>
                <a 
                  href="#" 
                  className="text-xs font-semibold text-[var(--color-royal-heath-600)] flex items-center gap-1 group-hover:text-[var(--color-royal-heath-700)] transition-colors"
                >
                  View & Apply <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[var(--color-royal-heath-200)] bg-[var(--color-royal-heath-50)] text-center">
          <a href="#" className="text-xs font-medium text-[var(--color-royal-heath-600)] hover:underline">
            View All Schemes
          </a>
        </div>
      </div>
    </div>
  );
}
