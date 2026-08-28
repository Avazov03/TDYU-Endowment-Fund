import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminApp from './admin/AdminApp'

function PublicRedirect() {
  if (typeof window !== 'undefined') {
    window.location.replace('/cyan/index.html')
  }
  return (
    <p style={{ fontFamily: 'system-ui', padding: 24 }}>
      Sayt yuklanmoqda… <a href="/cyan/index.html">/cyan/index.html</a>
    </p>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/" element={<PublicRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
