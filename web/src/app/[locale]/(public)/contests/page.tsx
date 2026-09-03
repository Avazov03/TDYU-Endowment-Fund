'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'

/** Eski URL — dastur 03 batafsil sahifasiga. */
export default function ContestsRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/programs/03')
  }, [router])

  return null
}
