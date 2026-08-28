import { useEffect, useState } from 'react'
import { X, Truck, Store, Banknote, CreditCard, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import siteConfig from '../config/siteConfig'
import { formatPrice, generateOrderNumber } from '../utils/orderUtils'

const initialForm = {
  name: '',
  mobile: '',
  address: '',
  email: '',
  notes: '',
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Checkout({ onClose, onPlaceOrder }) {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      customer: form,
      deliveryType,
      paymentMethod,
      items,
      subtotal,
      deliveryFee: deliveryType === 'pickup' ? 0 : deliveryFee,
      total: deliveryType === 'pickup' ? subtotal : total,
    }

    // Save the order to the backend so it's persisted for real. If the API
    // is unreachable, fall back to a locally-generated number so checkout
    // still completes for the customer.
    let orderNumber
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Order save failed')
      const saved = await response.json()
      orderNumber = saved.orderNumber
    } catch (err) {
      console.error('Could not reach order API, using a local order number instead.', err)
      orderNumber = generateOrderNumber()
    }

    clearCart()
    onPlaceOrder({ orderNumber, placedAt: new Date().toISOString(), ...payload })
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-[96] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-slide-up flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:animate-scale-in sm:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-cream-dark px-5 py-4">
          <button
            type="button"
            aria-label="Back to cart"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-cream-dark active:scale-90"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-display text-xl font-bold text-espresso">Checkout</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-cream-dark active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-3.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                deliveryType === 'delivery'
                  ? 'border-gold bg-gold/10 text-espresso'
                  : 'border-cream-dark text-espresso/60 hover:border-gold/60'
              }`}
            >
              <Truck size={18} /> Delivery
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType('pickup')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-3.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                deliveryType === 'pickup'
                  ? 'border-gold bg-gold/10 text-espresso'
                  : 'border-cream-dark text-espresso/60 hover:border-gold/60'
              }`}
            >
              <Store size={18} /> Pickup
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-espresso/80">
                Full Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                className="mt-1.5 w-full rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="text-sm font-semibold text-espresso/80">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                required
                value={form.mobile}
                onChange={handleChange('mobile')}
                placeholder="+971 5X XXX XXXX"
                className="mt-1.5 w-full rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {deliveryType === 'delivery' && (
              <div>
                <label htmlFor="address" className="text-sm font-semibold text-espresso/80">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  required
                  rows={2}
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="Building, street, area"
                  className="mt-1.5 w-full resize-none rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-espresso/80">
                Email <span className="font-normal text-espresso/40">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label htmlFor="notes" className="text-sm font-semibold text-espresso/80">
                Order Notes <span className="font-normal text-espresso/40">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={2}
                value={form.notes}
                onChange={handleChange('notes')}
                placeholder="Any special requests?"
                className="mt-1.5 w-full resize-none rounded-xl border border-cream-dark px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-espresso/80">Payment Method</p>
              <div className="mt-1.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                    paymentMethod === 'cod'
                      ? 'border-gold bg-gold/10 text-espresso'
                      : 'border-cream-dark text-espresso/60 hover:border-gold/60'
                  }`}
                >
                  <Banknote size={17} /> Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                    paymentMethod === 'card'
                      ? 'border-gold bg-gold/10 text-espresso'
                      : 'border-cream-dark text-espresso/60 hover:border-gold/60'
                  }`}
                >
                  <CreditCard size={17} /> Card
                </button>
              </div>
              <p className="mt-2 text-xs text-espresso/45">
                Demo only — no real payment is processed on this website.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-cream p-4 text-sm">
            <div className="flex justify-between text-espresso/70">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal, siteConfig.currency)}</span>
            </div>
            <div className="mt-1 flex justify-between text-espresso/70">
              <span>Delivery Fee</span>
              <span>
                {deliveryType === 'pickup'
                  ? 'Free'
                  : deliveryFee === 0
                  ? 'Free'
                  : formatPrice(deliveryFee, siteConfig.currency)}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t border-cream-dark pt-2 font-display text-base font-bold text-espresso">
              <span>Total</span>
              <span>
                {formatPrice(deliveryType === 'pickup' ? subtotal : total, siteConfig.currency)}
              </span>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
            {submitting ? 'Placing Order…' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}
