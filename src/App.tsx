import { useEffect } from 'react'

/**
 * Asosiy sayt — asl Cyan HTML/CSS/JS (`public/cyan/`).
 * React faqat kirish nuqtasi; dizayn qayta chizilmagan.
 */
export default function App() {
  useEffect(() => {
    window.location.replace('/cyan/index.html')
  }, [])

  return (
    <p style={{ fontFamily: 'system-ui', padding: 24 }}>
      Asl sayt yuklanmoqda…{' '}
      <a href="/cyan/index.html">/cyan/index.html</a>
    </p>
  )
}
