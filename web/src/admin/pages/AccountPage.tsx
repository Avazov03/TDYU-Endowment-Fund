'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../api'

export default function AccountPage() {
  const [currentPassword, setCurrent] = useState('')
  const [newPassword, setNew] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMsg('')
    if (newPassword !== confirm) {
      setError('Yangi parollar mos emas')
      return
    }
    setBusy(true)
    try {
      await api('/api/admin/account/password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      setMsg('Parol yangilandi')
      setCurrent('')
      setNew('')
      setConfirm('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Hisob / xavfsizlik</h1>
          <p>Admin parolini o‘zgartiring. Kamida 8 belgi tavsiya etiladi.</p>
        </div>
      </div>
      {error ? <div className="error">{error}</div> : null}
      {msg ? <div className="success">{msg}</div> : null}
      <div className="panel" style={{ maxWidth: 520 }}>
        <div className="panel-head">
          <h2>Parolni almashtirish</h2>
        </div>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Joriy parol
            <input type="password" value={currentPassword} onChange={(e) => setCurrent(e.target.value)} required />
          </label>
          <label>
            Yangi parol
            <input type="password" value={newPassword} onChange={(e) => setNew(e.target.value)} required minLength={8} />
          </label>
          <label>
            Yangi parol (takror)
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Saqlanmoqda…' : 'Parolni yangilash'}
          </button>
        </form>
      </div>
    </>
  )
}
