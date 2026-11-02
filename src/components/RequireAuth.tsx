import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase, supabaseConfigError } from '../lib/supabase'

export function RequireAuth() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-4">
        <p className="max-w-md text-sm text-red-600">{supabaseConfigError}</p>
      </main>
    )
  }

  if (session === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] text-sm text-ink/55">
        Loading…
      </main>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}
