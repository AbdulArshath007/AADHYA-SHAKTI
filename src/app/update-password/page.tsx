import { updatePassword } from '@/app/auth/actions'

export default async function UpdatePasswordPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-[70vh] lg:min-h-[80vh] items-center justify-center p-2 sm:p-4 my-4 sm:my-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-[var(--color-royal-heath-200)] p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-royal-heath-900)]">Set New Password</h1>
          <p className="text-[var(--color-royal-heath-800)] text-sm mt-1 sm:mt-2">
            Please enter your new password below to reset your credentials.
          </p>
        </div>

        {searchParams?.error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm border border-red-200 text-center">
            {searchParams.error}
          </div>
        )}

        <form action={updatePassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-royal-heath-950)] mb-1" htmlFor="password">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-[var(--color-royal-heath-200)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-royal-heath-500)]"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-royal-heath-600)] text-white py-2.5 rounded-md font-medium hover:bg-[var(--color-royal-heath-700)] transition-colors shadow-sm mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
