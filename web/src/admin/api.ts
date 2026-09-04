const TOKEN_KEY = 'tdyu_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (!token) localStorage.removeItem(TOKEN_KEY)
  else localStorage.setItem(TOKEN_KEY, token)
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers || {})
  const isForm = typeof FormData !== 'undefined' && options.body instanceof FormData
  if (!headers.has('Content-Type') && options.body && !isForm) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(path, { ...options, headers })
  if (res.status === 401) {
    setToken(null)
    if (!path.includes('/auth/login')) {
      window.location.href = '/admin/login'
    }
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed')
  return data as T
}

export async function uploadFile<T = unknown>(path: string, file: File, extra: Record<string, string> = {}) {
  const fd = new FormData()
  fd.append('file', file)
  for (const [k, v] of Object.entries(extra)) fd.append(k, v)
  return api<T>(path, { method: 'POST', body: fd })
}
