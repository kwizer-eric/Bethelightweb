import { useEffect, useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseConfigError } from '../lib/supabase'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSignedIn(Boolean(data.session))
      setChecking(false)
    })
    return () => {
      active = false
    }
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setPending(true)
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setPending(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    setSignedIn(true)
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] text-sm text-ink/55">
        Loading…
      </main>
    )
  }

  if (signedIn) return <Navigate to="/dashboard" replace />

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-ink/10 bg-warm-white p-8"
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-ink/45 uppercase">
          Kubwabo Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-ink/55">
          Use the admin account created in Supabase.
        </p>

        {!supabase ? (
          <p className="mt-6 text-sm text-red-600">{supabaseConfigError}</p>
        ) : (
          <div className="mt-6 space-y-3">
            <label className="block text-sm">
              <span className="text-ink/70">Email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="text-ink/70">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        )}

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={!supabase || pending}
          className="mt-6 w-full bg-primary px-4 py-2 text-sm font-medium text-warm-white disabled:opacity-60"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
