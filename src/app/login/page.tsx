import { login, signInWithOAuth } from '@/app/auth/actions'
import Link from 'next/link'
import Image from 'next/image'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-[85vh] flex rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-royal-heath-200)] bg-white max-w-6xl mx-auto my-8">
      
      {/* Left Side: Aesthetic Collage */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-royal-heath-50)] relative items-center justify-center p-12 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-royal-heath-200)] blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute bottom-12 -right-12 w-80 h-80 rounded-full bg-[var(--color-royal-heath-300)] blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
          
          <div className="relative w-full aspect-square max-w-md">
            {/* Asset 1: Main Feature Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-auto z-20 hover:scale-105 transition-transform duration-500">
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
                alt="Women Professional Network"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Asset 2: Group/Collage Image */}
            <div className="absolute top-8 right-0 w-48 h-auto z-10 animate-[float_6s_ease-in-out_infinite] opacity-90">
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
                alt="Empowerment"
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* Asset 3: Moon Icon */}
            <div className="absolute bottom-16 left-8 w-24 h-auto z-30 animate-[float_4s_ease-in-out_infinite_alternate]">
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
                alt="Moon Icon"
                className="w-full h-auto drop-shadow-md"
              />
            </div>
          </div>

          <div className="mt-12 text-center max-w-sm">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-royal-heath-900)] mb-3">Connect. Learn. Empower.</h2>
            <p className="text-[var(--color-royal-heath-800)] text-sm">
              Join thousands of independent women networking, teaching, and accessing transformative government schemes.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-[var(--color-royal-heath-900)]">Welcome Back</h1>
            <p className="text-[var(--color-royal-heath-800)] mt-2">Sign in to your account</p>
          </div>

          {searchParams?.error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm border border-red-200 text-center">
              {searchParams.error}
            </div>
          )}
          
          {searchParams?.message && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-md mb-6 text-sm border border-emerald-200 text-center">
              {searchParams.message}
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <form action={async () => {
              'use server'
              await signInWithOAuth('google')
            }}>
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </form>
          </div>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-[var(--color-royal-heath-200)]"></div>
            <span className="flex-shrink-0 mx-4 text-[var(--color-royal-heath-400)] text-sm">or continue with email</span>
            <div className="flex-grow border-t border-[var(--color-royal-heath-200)]"></div>
          </div>

          {/* Email Form */}
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-royal-heath-950)] mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-[var(--color-royal-heath-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-royal-heath-500)]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-royal-heath-950)] mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-[var(--color-royal-heath-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-royal-heath-500)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-royal-heath-600)] text-white py-2.5 rounded-md font-medium hover:bg-[var(--color-royal-heath-700)] transition-colors shadow-sm mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-royal-heath-800)] mt-8">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-[var(--color-royal-heath-600)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
