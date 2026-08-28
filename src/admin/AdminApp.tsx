import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getToken } from './api'
import AdminShell from './AdminShell'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ContactsPage from './pages/ContactsPage'
import DonationsPage from './pages/DonationsPage'
import GrantsPage from './pages/GrantsPage'
import SubscribersPage from './pages/SubscribersPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import SettingsPage from './pages/SettingsPage'
import ContentPage from './pages/ContentPage'
import DocumentsPage from './pages/DocumentsPage'
import AccountPage from './pages/AccountPage'
import './admin.css'

function RequireAuth({ children }: { children: ReactNode }) {
  if (!getToken()) return <Navigate to="/admin/login" replace />
  return children
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AdminShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="grants" element={<GrantsPage />} />
        <Route path="subscribers" element={<SubscribersPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
