import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(localStorage.getItem('nasircafe_admin_token')))

  return loggedIn ? (
    <AdminDashboard onLoggedOut={() => setLoggedIn(false)} />
  ) : (
    <AdminLogin onLoggedIn={() => setLoggedIn(true)} />
  )
}
