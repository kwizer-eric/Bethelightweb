import { createClient } from '@supabase/supabase-js'

// Public client values. The publishable key is meant to ship in the browser.
// The secret key must never be added here.
const publicUrl = 'https://pybipnjrunilojzsinba.supabase.co'
const publicKey = 'sb_publishable_i2gnB0Uk8eS25t9Bvb8WuQ_Dhks1Won'

const url =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  publicUrl
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  publicKey

export const supabase = createClient(url, key)

export const supabaseConfigError =
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the project URL and publishable key, then redeploy. These values are baked in at build time.'
