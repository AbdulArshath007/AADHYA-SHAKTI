import React from 'react';
import { createClient } from '@/lib/server';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { MarketplaceClient } from '@/components/dashboard/MarketplaceClient';

export default async function MarketplacePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative w-full">
      
      {/* LEFT COLUMN: Sidebar Navigation (3 cols) */}
      <aside className="hidden lg:block lg:col-span-3">
        <SidebarNav user={user || undefined} />
      </aside>

      {/* CENTER & RIGHT COLUMNS combined: Marketplace Module (9 cols) */}
      <section className="col-span-1 lg:col-span-9 bg-white/40 backdrop-blur-md rounded-3xl border border-[var(--color-royal-heath-200)] p-6 shadow-sm min-h-[calc(100vh-8rem)]">
        <MarketplaceClient user={user || undefined} />
      </section>

    </div>
  );
}
