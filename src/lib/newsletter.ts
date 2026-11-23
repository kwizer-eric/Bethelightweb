import { supabase, supabaseConfigError } from './supabase'

export type NewsletterSubscriber = {
  id: string
  email: string
  createdAt: string
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

/** Public subscribe, stores email in Supabase for the admin list. */
export async function subscribeNewsletter(email: string): Promise<string | null> {
  if (!supabase) return supabaseConfigError
  const normalized = normalizeEmail(email)
  if (!normalized || !normalized.includes('@')) {
    return 'Please enter a valid email address.'
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: normalized,
  })

  if (!error) return null

  // Already on the list, treat as success for the visitor
  if (error.code === '23505') return null

  return error.message
}

export async function listNewsletterSubscribers(): Promise<{
  data: NewsletterSubscriber[]
  error: string | null
}> {
  if (!supabase) return { data: [], error: supabaseConfigError }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })

  if (error) return { data: [], error: error.message }

  return {
    data: (data ?? []).map((row) => ({
      id: row.id as string,
      email: row.email as string,
      createdAt: row.created_at as string,
    })),
    error: null,
  }
}

export async function removeNewsletterSubscriber(id: string): Promise<string | null> {
  if (!supabase) return supabaseConfigError
  const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
  return error?.message ?? null
}
