import { Star, Plus, Minus } from 'lucide-react'
import FoodImage from './FoodImage'
import { useCart } from '../context/CartContext'
import { buildLineKey } from '../utils/orderUtils'
import siteConfig from '../config/siteConfig'

export default function MenuCard({ item, onOpenDetails }) {
  const { items, addToCart, updateQuantity } = useCart()
  const lineKey = buildLineKey(item.id, [], '')
  const cartLine = items.find((i) => i.lineKey === lineKey)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(item, 1)
  }

  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-150 hover:-translate-y-1.5 hover:shadow-card active:scale-[0.98] active:shadow-soft"
    >
      <div className="relative overflow-hidden">
        <FoodImage
          src={item.image}
          alt={item.name}
          className="h-48 sm:h-52"
          imgClassName="transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-espresso/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream backdrop-blur">
          {item.category}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-espresso">
          <Star size={13} className="fill-gold text-gold" />
          {item.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold text-espresso">{item.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-espresso/65 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-coffee-dark">
            {siteConfig.currency} {item.price}
          </span>

          {cartLine ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 rounded-full bg-cream px-1 py-1"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(lineKey, cartLine.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-espresso shadow-soft transition hover:bg-gold hover:text-espresso active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center text-sm font-semibold">{cartLine.quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(lineKey, cartLine.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-espresso text-cream shadow-soft transition hover:bg-gold hover:text-espresso active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleAdd} className="btn-dark !py-2 !px-4 text-sm">
              <Plus size={15} /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
