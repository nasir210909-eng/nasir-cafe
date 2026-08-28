import { useEffect, useState } from 'react'
import { LogOut, RefreshCw } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { formatPrice } from '../utils/orderUtils'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function AdminDashboard({ onLoggedOut }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    const token = localStorage.getItem('nasircafe_admin_token')
    try {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 401) {
        localStorage.removeItem('nasircafe_admin_token')
        onLoggedOut()
        return
      }
      if (!response.ok) throw new Error('Could not load orders.')
      setOrders(await response.json())
    } catch (err) {
      setError(err.message || 'Could not load orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('nasircafe_admin_token')
    onLoggedOut()
  }

  return (
    <div className="min-h-screen bg-cream-dark/30">
      <header className="flex items-center justify-between border-b border-cream-dark bg-white px-5 py-4 sm:px-8">
        <div>
          <h1 className="font-display text-xl font-bold text-espresso">{siteConfig.name} Orders</h1>
          <p className="text-sm text-espresso/50">
            {orders.length} order{orders.length === 1 ? '' : 's'} received
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchOrders}
            aria-label="Refresh orders"
            className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-cream-dark active:scale-90"
          >
            <RefreshCw size={17} />
          </button>
          <button type="button" onClick={handleLogout} className="btn-dark !py-2 !px-4 text-sm">
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </header>

      <main className="container-px mx-auto max-w-5xl py-8">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {loading ? (
          <p className="text-center text-espresso/50">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-espresso/50">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-espresso">{order.order_number}</p>
                    <p className="text-sm text-espresso/60">
                      {order.customer_name} · {order.mobile}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-coffee-dark">
                      {formatPrice(order.total, siteConfig.currency)}
                    </p>
                    <p className="text-xs text-espresso/45">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-cream px-2.5 py-1 font-medium capitalize text-espresso/70">
                    {order.delivery_type}
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-1 font-medium uppercase text-espresso/70">
                    {order.payment_method === 'cod' ? 'Cash' : 'Card'}
                  </span>
                  {order.address && (
                    <span className="rounded-full bg-cream px-2.5 py-1 font-medium text-espresso/70">
                      {order.address}
                    </span>
                  )}
                </div>

                <ul className="mt-3 flex flex-col gap-1 border-t border-cream-dark pt-3 text-sm text-espresso/75">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>{formatPrice(item.price * item.quantity, siteConfig.currency)}</span>
                    </li>
                  ))}
                </ul>

                {order.notes && (
                  <p className="mt-3 text-sm italic text-espresso/50">&quot;{order.notes}&quot;</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
