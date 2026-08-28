import { CheckCircle2, Clock, MapPin, X, Navigation, Share2 } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { formatPrice } from '../utils/orderUtils'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.contact.address
)}`

export default function OrderConfirmation({ order, onClose }) {
  const isPickup = order.deliveryType === 'pickup'

  const handleShareLocation = () => {
    const shareText = `${siteConfig.name} — ${siteConfig.contact.address}\n${mapsUrl}`
    if (navigator.share) {
      navigator.share({ title: siteConfig.name, text: shareText, url: mapsUrl }).catch(() => {})
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed inset-0 z-[97] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-slide-up relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-card sm:animate-scale-in sm:rounded-3xl sm:p-8">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-espresso/50 transition hover:bg-cream-dark hover:text-espresso"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={34} className="text-green-600" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-espresso">
            Thank You for Your Order!
          </h2>
          <p className="mt-2 text-sm text-espresso/65">
            Your order has been received successfully.
          </p>

          <div className="mt-5 rounded-full bg-cream px-5 py-2">
            <span className="text-xs uppercase tracking-wide text-espresso/50">Order Number</span>
            <p className="font-display text-lg font-bold text-coffee-dark">{order.orderNumber}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-cream-dark p-4">
          <ul className="flex flex-col gap-2.5">
            {order.items.map((item) => (
              <li key={item.lineKey} className="flex justify-between text-sm">
                <span className="text-espresso/75">
                  {item.quantity} × {item.name}
                </span>
                <span className="font-medium text-espresso">
                  {formatPrice(item.price * item.quantity, siteConfig.currency)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-cream-dark pt-3 font-display text-base font-bold text-espresso">
            <span>Total Paid</span>
            <span>{formatPrice(order.total, siteConfig.currency)}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-cream p-4 text-sm text-espresso/75">
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="shrink-0 text-gold-dark" />
            <span>
              {order.deliveryType === 'delivery'
                ? order.customer.address || 'Delivery address on file'
                : `Pickup from ${siteConfig.name}, ${siteConfig.contact.city}`}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={16} className="shrink-0 text-gold-dark" />
            <span>
              {order.deliveryType === 'delivery' ? 'Estimated delivery: 30–40 minutes' : 'Ready for pickup in 15–20 minutes'}
            </span>
          </div>

          {isPickup && (
            <div className="mt-1 grid grid-cols-2 gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-espresso px-3 py-2.5 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-ink"
              >
                <Navigation size={15} /> Get Directions
              </a>
              <button
                type="button"
                onClick={handleShareLocation}
                className="flex items-center justify-center gap-2 rounded-full bg-gold px-3 py-2.5 text-sm font-semibold text-espresso transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <Share2 size={15} /> Share Location
              </button>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-espresso/45">
          This is a frontend demonstration — no real order has been sent to a kitchen or payment
          provider.
        </p>

        <button type="button" onClick={onClose} className="btn-primary mt-5 w-full">
          Back to NASIR CAFÉ
        </button>
      </div>
    </div>
  )
}
