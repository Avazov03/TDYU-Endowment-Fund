'use client'

import { useEffect, useState } from 'react'
import { api, getToken } from '../api'
import { EmptyState, LoadingBlock, formatDate } from '../ui'

type Sub = { id: string; email: string; lang: string; createdAt: string }

export default function SubscribersPage() {
  const [rows, setRows] = useState<Sub[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      setRows(await api<Sub[]>('/api/admin/subscribers'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function exportCsv() {
    try {
      const token = getToken()
      const res = await fetch('/api/admin/subscribers.csv', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'subscribers.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Export failed')
    }
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Axborotnoma</h1>
          <p>Email obunachilar ro‘yxati</p>
        </div>
        <button type="button" className="btn ghost" onClick={exportCsv}>
          CSV eksport
        </button>
      </div>
      {error ? <div className="error">{error}</div> : null}
      <div className="panel">
        {loading ? (
          <LoadingBlock />
        ) : !rows.length ? (
          <EmptyState title="Hali obuna yo‘q" hint="Axborotnoma formasidan kelgan emaillar shu yerda." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Til</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="cell-title">{r.email}</td>
                  <td>
                    <span className="badge tone-neutral">{r.lang.toUpperCase()}</span>
                  </td>
                  <td className="cell-meta">{formatDate(r.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn danger"
                      onClick={async () => {
                        if (!confirm('O‘chirish?')) return
                        await api(`/api/admin/subscribers/${r.id}`, { method: 'DELETE' })
                        load()
                      }}
                    >
                      O‘chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
