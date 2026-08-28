import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import siteConfig from '../config/siteConfig'
import { formatPrice } from '../utils/orderUtils'

export default function MobileOrderBar() {
  const { cartCount, total, openCart, isCartOpen } = useCart()

  if (cartCount === 0 || isCartOpen) return null

  return (
    <button
      type="button"
      onClick={openCart}
      className="animate-slide-up fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-espresso px-5 py-3.5 text-cream shadow-card transition-transform duration-150 active:scale-[0.97] sm:hidden"
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold text-espresso">
          <ShoppingBag size={16} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cream px-1 text-[10px] font-bold text-espresso">
            {cartCount}
          </span>
        </span>
        View Cart
      </span>
      <span className="font-display font-bold">{formatPrice(total, siteConfig.currency)}</span>
    </button>
  )
}
