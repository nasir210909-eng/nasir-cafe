import { useEffect } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import FoodImage from './FoodImage'
import { useCart } from '../context/CartContext'
import siteConfig from '../config/siteConfig'
import { formatPrice } from '../utils/orderUtils'

export default function Cart({ onCheckout }) {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
  } = useCart()

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[95] flex justify-end">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={closeCart} />

      <aside
        className="animate-slide-up relative flex h-full w-full max-w-md flex-col bg-cream shadow-card sm:animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-cream-dark px-5 py-4">
          <h2 className="font-display text-xl font-bold text-espresso">Your Cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-cream-dark active:scale-90"
          >
            <X size={19} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark">
              <ShoppingBag size={28} className="text-espresso/40" />
            </div>
            <p className="font-display text-lg font-semibold text-espresso">Your cart is empty</p>
            <p className="text-sm text-espresso/60">Looks like you haven't added anything yet.</p>
            <button type="button" onClick={closeCart} className="btn-dark mt-2 !py-2.5 !px-5 text-sm">
              Explore Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.lineKey} className="flex gap-3 rounded-2xl bg-white p-3 shadow-soft">
                    <FoodImage
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display font-semibold text-espresso leading-tight">
                            {item.name}
                          </p>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeFromCart(item.lineKey)}
                            className="shrink-0 text-espresso/40 transition active:scale-90 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.customizations?.length > 0 && (
                          <p className="mt-0.5 text-xs text-espresso/50">
                            {item.customizations.join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-cream px-1 py-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.lineKey, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-espresso shadow-soft transition hover:bg-gold active:scale-90"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.lineKey, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream shadow-soft transition hover:bg-gold hover:text-espresso active:scale-90"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold text-coffee-dark">
                          {formatPrice(item.price * item.quantity, siteConfig.currency)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-cream-dark px-5 py-4">
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, siteConfig.currency)}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee, siteConfig.currency)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-cream-dark pt-2 font-display text-base font-bold text-espresso">
                  <span>Total</span>
                  <span>{formatPrice(total, siteConfig.currency)}</span>
                </div>
              </div>
              <button type="button" onClick={onCheckout} className="btn-primary mt-4 w-full">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
