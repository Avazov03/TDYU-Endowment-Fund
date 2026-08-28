import { redirect } from 'next/navigation'

const YT_SWAP: Record<string, string> = {
  LpdRAyIGg8I: 'v-Z3jc0-LhU',
  LXvZA4bmUU4: 'KIgz0XGDJZw',
}

export default async function WatchRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ v?: string | string[] }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const raw = Array.isArray(sp.v) ? sp.v[0] : sp.v
  const id = raw ? YT_SWAP[raw] || raw : ''
  if (!id || !/^[A-Za-z0-9_-]{6,20}$/.test(id)) {
    redirect(`/${locale}`)
  }
  redirect(`https://www.youtube.com/watch?v=${id}`)
}
