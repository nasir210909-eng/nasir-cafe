import { useState } from 'react'
import { Coffee, Lock } from 'lucide-react'
import siteConfig from '../config/siteConfig'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function AdminLogin({ onLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Login failed.')
      }
      const { token } = await response.json()
      localStorage.setItem('nasircafe_admin_token', token)
      onLoggedIn()
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso text-gold">
            <Coffee size={22} />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold text-espresso">
            {siteConfig.name} Admin
          </h1>
          <p className="mt-1 text-sm text-espresso/60">Sign in to view orders</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="admin-username" className="text-sm font-semibold text-espresso/80">
              Username
            </label>
            <input
              id="admin-username"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-semibold text-espresso/80">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-1 w-full disabled:opacity-60"
          >
            <Lock size={16} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="mt-6 block text-center text-sm text-espresso/50 hover:text-espresso">
          ← Back to site
        </a>
      </div>
    </div>
  )
}
