'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/server'
import { Provider } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/?signedIn=true')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const intent = formData.get('intent') as string

  if (!email || !password || !intent) {
    redirect('/signup?error=' + encodeURIComponent('All fields are required.'))
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        intent,
      }
    }
  })

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check your email to verify your account or login if auto-confirmed.')
}

export async function signInWithOAuth(provider: Provider) {
  const supabase = await createClient()

  // Retrieve origin dynamically from incoming request headers
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  
  // Use env var first, then try headers, and fall back to localhost
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 
                 (host ? `${protocol}://${host}` : 'http://localhost:3000')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
