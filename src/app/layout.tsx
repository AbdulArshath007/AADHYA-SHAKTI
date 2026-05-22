import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import { createClient } from '@/lib/server';
import { logout } from '@/app/auth/actions';
import Link from 'next/link';
import Image from 'next/image';
import { ChatBot } from '@/components/dashboard/ChatBot';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AADHYA SHAKTI | Women's Professional & Mentorship Hub",
  description: "A professional networking hub and authoritative portal for government empowerment schemes for women.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-950)] font-sans">
        <header className="border-b border-[var(--color-royal-heath-200)] bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image 
                src="/logo-transparent.png" 
                alt="AADHYA SHAKTI Logo" 
                width={48} 
                height={48} 
                className="object-cover sm:w-16 sm:h-16" 
              />
              <span className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-[var(--color-royal-heath-900)]">
                AADHYA SHAKTI
              </span>
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              {!user ? (
                <>
                  <Link href="/login" className="text-xs sm:text-sm font-medium hover:text-[var(--color-royal-heath-600)] transition-colors">Sign In</Link>
                  <Link href="/signup" className="bg-[var(--color-royal-heath-600)] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-[var(--color-royal-heath-700)] transition-colors shadow-sm">
                    Join Now
                  </Link>
                </>
              ) : (
                <form action={logout}>
                  <button type="submit" className="text-xs sm:text-sm font-medium text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] transition-colors">
                    Sign Out
                  </button>
                </form>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
          {children}
        </main>
        {user && <ChatBot />}
        {user && <MobileBottomNav />}
      </body>
    </html>
  );
}
