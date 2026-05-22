import { signup } from '@/app/auth/actions'
import Link from 'next/link'

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-[70vh] lg:min-h-[80vh] items-center justify-center p-2 sm:p-4 my-4 sm:my-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-[var(--color-royal-heath-200)] p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-royal-heath-900)]">Join AADHYA SHAKTI</h1>
          <p className="text-[var(--color-royal-heath-800)] text-sm mt-1 sm:mt-2">Create your account to get started</p>
        </div>

        {searchParams?.error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
            {searchParams.error}
          </div>
        )}

        <form action={signup} className="space-y-5">
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
              minLength={6}
              className="w-full px-3 py-2 border border-[var(--color-royal-heath-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-royal-heath-500)]"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-[var(--color-royal-heath-950)] mb-3">
              What brings you here? (Primary Intent)
            </legend>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-[var(--color-royal-heath-200)] rounded-md cursor-pointer hover:bg-[var(--color-royal-heath-50)] transition-colors">
                <input type="radio" name="intent" value="teach_mentor" required className="text-[var(--color-royal-heath-600)] focus:ring-[var(--color-royal-heath-500)]" />
                <span className="text-sm font-medium text-[var(--color-royal-heath-950)]">I want to teach / mentor</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[var(--color-royal-heath-200)] rounded-md cursor-pointer hover:bg-[var(--color-royal-heath-50)] transition-colors">
                <input type="radio" name="intent" value="learn_network" required className="text-[var(--color-royal-heath-600)] focus:ring-[var(--color-royal-heath-500)]" />
                <span className="text-sm font-medium text-[var(--color-royal-heath-950)]">I want to learn / network</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[var(--color-royal-heath-200)] rounded-md cursor-pointer hover:bg-[var(--color-royal-heath-50)] transition-colors">
                <input type="radio" name="intent" value="schemes" required className="text-[var(--color-royal-heath-600)] focus:ring-[var(--color-royal-heath-500)]" />
                <span className="text-sm font-medium text-[var(--color-royal-heath-950)]">I am looking for government schemes</span>
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-[var(--color-royal-heath-600)] text-white py-2.5 rounded-md font-medium hover:bg-[var(--color-royal-heath-700)] transition-colors shadow-sm mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-royal-heath-800)] mt-8">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[var(--color-royal-heath-600)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
