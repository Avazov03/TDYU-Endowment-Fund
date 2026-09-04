'use client'

import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to?: string
  href?: string
  children?: ReactNode
}

export function Link({ to, href, children, ...rest }: LinkProps) {
  const target = (to || href || '/') as ComponentProps<typeof NextLink>['href']
  return (
    <NextLink href={target} {...rest}>
      {children}
    </NextLink>
  )
}

export function useLocation() {
  const pathname = usePathname()
  return { pathname, search: '', hash: '' }
}

export function useNavigate() {
  const router = useRouter()
  return (to: string) => router.push(to)
}

export function useSearchParams() {
  const params = useNextSearchParams()
  return [params] as const
}

export function Outlet() {
  return null
}
