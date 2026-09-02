'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { api, setToken } from '../api'

export default function LoginPage() {
  const nav = useRouter()
  const [email, setEmail] = useState('admin@tdyu-endowment.uz')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setToken(data.token)
      nav.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <section className="login-visual">
        <div>
          <span className="pill">TDYU Endowment Fund</span>
          <h2>Fondni bir joydan boshqaring</h2>
          <p>Murojaatlar, xayriya arizalari, grantlar, e’lonlar va sozlamalar — yagona professional panel.</p>
        </div>
        <div style={{ opacity: 0.8, fontSize: 13 }}>
          Secure admin · JWT · SQLite
        </div>
      </section>
      <div className="login-form-wrap">
        <form className="login-card" onSubmit={onSubmit}>
          <img src="/brand/tdyu-logo.svg" alt="TDYU" style={{ height: 42, marginBottom: 14 }} />
          <h1>Admin kirish</h1>
          <p className="sub">Hisobingizga kiring va boshqaruvni davom ettiring</p>
          {error ? <div className="error">{error}</div> : null}
          <div className="form-grid" style={{ padding: 0 }}>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="username" />
            </label>
            <label>
              Parol
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Kirilmoqda…' : 'Panelelga kirish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
