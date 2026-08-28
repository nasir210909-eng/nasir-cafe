import { useEffect, useMemo, useState } from 'react'
import { X, Star, Plus, Minus, Check } from 'lucide-react'
import FoodImage from './FoodImage'
import { useCart } from '../context/CartContext'
import siteConfig from '../config/siteConfig'

const CUSTOMIZATIONS = [
  { id: 'Extra Cheese', price: 3 },
  { id: 'Extra Sauce', price: 2 },
  { id: 'Add Chicken', price: 6 },
  { id: 'Remove Onion', price: 0 },
]

export default function ProductModal({ item, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selected, setSelected] = useState([])
  const [instructions, setInstructions] = useState('')

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const toggleCustomization = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const extrasTotal = useMemo(
    () => selected.reduce((sum, id) => sum + (CUSTOMIZATIONS.find((c) => c.id === id)?.price || 0), 0),
    [selected]
  )
  const unitPrice = item.price + extrasTotal
  const lineTotal = unitPrice * quantity

  const handleAdd = () => {
    addToCart({ ...item, price: unitPrice }, quantity, selected, instructions)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-card sm:animate-scale-in sm:rounded-3xl"
      >
        <div className="relative">
          <FoodImage src={item.image} alt={item.name} className="h-56 sm:h-72" />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-espresso shadow-soft transition hover:bg-white active:scale-90"
          >
            <X size={18} />
          </button>
          <span className="absolute left-4 top-4 rounded-full bg-espresso/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
            {item.category}
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-espresso">{item.name}</h2>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-sm font-semibold text-espresso">
              <Star size={14} className="fill-gold text-gold" /> {item.rating}
            </span>
          </div>
          <p className="mt-2 text-espresso/70">{item.description}</p>
          <p className="mt-3 font-display text-xl font-bold text-coffee-dark">
            {siteConfig.currency} {item.price}
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/70">
              Ingredients
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-espresso/80"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/70">
              Customize (optional)
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {CUSTOMIZATIONS.map((opt) => {
                const active = selected.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleCustomization(opt.id)}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                      active
                        ? 'border-gold bg-gold/10 text-espresso'
                        : 'border-cream-dark text-espresso/70 hover:border-gold/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          active ? 'border-gold bg-gold' : 'border-espresso/30'
                        }`}
                      >
                        {active && <Check size={11} className="text-espresso" />}
                      </span>
                      {opt.id}
                    </span>
                    {opt.price > 0 && (
                      <span className="text-xs text-espresso/50">+{opt.price}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="special-instructions" className="text-sm font-semibold uppercase tracking-wide text-espresso/70">
              Special Instructions
            </label>
            <textarea
              id="special-instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
              placeholder="E.g. less spicy, no ice, allergy notes..."
              className="mt-2 w-full resize-none rounded-xl border border-cream-dark px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 rounded-full bg-cream px-2 py-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-espresso shadow-soft transition hover:bg-gold active:scale-90"
              >
                <Minus size={15} />
              </button>
              <span className="w-5 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-cream shadow-soft transition hover:bg-gold hover:text-espresso active:scale-90"
              >
                <Plus size={15} />
              </button>
            </div>

            <button type="button" onClick={handleAdd} className="btn-primary flex-1 sm:flex-none sm:px-8">
              Add to Cart — {siteConfig.currency} {lineTotal.toFixed(2).replace(/\.00$/, '')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
