'use client'

import { useEffect, useState } from 'react'
import { api } from '@/admin/api'

export type AdminRecentItem = {
  id: string
  title: string
  meta: string
  category?: string
  value: string
  status: 'ok' | 'fail' | string
  user_ip?: string | null
  country?: string | null
  country_code?: string | null
}

export type AdminStats = {
  total_questions: number
  successful_responses?: number
  failed_responses?: number
  average_response_time?: number
  success_rate: number
  average_rating?: number
  total_ratings?: number
  users_count: number
  specialists_count?: number
  consultations_total?: number
  consultations_open?: number
  chart: { labels: string[]; questions: number[] }
  month: { labels: string[]; questions: number[]; success?: number[] }
  trends: { users: number; questions: number }
  recent: AdminRecentItem[]
}

export type GeoCountry = {
  code: string
  name: string
  count: number
  percent: number
  lat?: number | null
  lon?: number | null
}

export type AdminGeo = {
  status?: string
  countries: GeoCountry[]
  total_ips: number
}

type ApiStats = {
  contactsNew: number
  donationsPending: number
  donationsConfirmed?: number
  grantsNew: number
  openWork?: number
  events?: number
  news?: number
  products?: number
  alumni?: number
  trends?: {
    contacts: { pct: number }
    donations: { pct: number }
  }
  month?: { labels: string[]; contacts: number[]; donations: number[] }
  recentContacts?: { id: string; name: string; status: string; createdAt: string }[]
}

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [geo, setGeo] = useState<AdminGeo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api<ApiStats>('/api/admin/stats')
      .then((s) => {
        if (cancelled) return
        const open = s.openWork ?? s.contactsNew + s.donationsPending + s.grantsNew
        const denom = open + (s.donationsConfirmed || 0)
        const labels = s.month?.labels || []
        const questions = s.month?.contacts || []
        setStats({
          users_count: s.contactsNew,
          total_questions: s.donationsPending,
          success_rate: denom ? Math.round((open / denom) * 1000) / 10 : 0,
          trends: {
            users: s.trends?.contacts.pct ?? 0,
            questions: s.trends?.donations.pct ?? 0,
          },
          month: { labels, questions },
          chart: { labels, questions },
          recent: (s.recentContacts || []).map((c) => ({
            id: c.id,
            title: c.name,
            value: c.status,
            meta: new Date(c.createdAt).toLocaleString('uz-UZ'),
            status: c.status === 'closed' ? 'ok' : 'new',
          })),
        })
        const cats: GeoCountry[] = [
          { code: 'EV', name: 'Tadbirlar', count: s.events || 0, percent: 0 },
          { code: 'NW', name: 'Maqolalar', count: s.news || 0, percent: 0 },
          { code: 'SH', name: 'Mahsulotlar', count: s.products || 0, percent: 0 },
          { code: 'AL', name: 'Bitiruvchilar', count: s.alumni || 0, percent: 0 },
        ]
        const max = Math.max(1, ...cats.map((c) => c.count))
        setGeo({
          total_ips: cats.reduce((n, c) => n + c.count, 0),
          countries: cats.map((c) => ({ ...c, percent: Math.round((c.count / max) * 100) })),
        })
        setError(null)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { stats, geo, loading, error }
}
