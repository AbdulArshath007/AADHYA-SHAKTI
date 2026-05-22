import { forgotPassword } from '@/app/auth/actions'
import Link from 'next/link'

export default async function ForgotPasswordPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-[70vh] lg:min-h-[80vh] items-center justify-center p-2 sm:p-4 my-4 sm:my-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-[var(--color-royal-heath-200)] p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-royal-heath-900)]">Reset Password</h1>
          <p className="text-[var(--color-royal-heath-800)] text-sm mt-1 sm:mt-2">
            Enter your email address to receive a password recovery link.
          </p>
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

        <form action={forgotPassword} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-[var(--color-royal-heath-600)] text-white py-2.5 rounded-md font-medium hover:bg-[var(--color-royal-heath-700)] transition-colors shadow-sm mt-4"
          >
            Send Recovery Email
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-royal-heath-800)] mt-8">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold text-[var(--color-royal-heath-600)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
