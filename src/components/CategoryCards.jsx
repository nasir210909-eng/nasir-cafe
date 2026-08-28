import { categories, categoryImages } from '../data/menu'
import FoodImage from './FoodImage'

export default function CategoryCards({ onSelectCategory }) {
  const items = categories.filter((c) => c.id !== 'all')

  const handleClick = (categoryId) => {
    onSelectCategory(categoryId)
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative z-10 -mt-14 sm:-mt-16">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-card sm:grid-cols-4 sm:gap-4 sm:p-6 lg:grid-cols-8">
          {items.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleClick(cat.id)}
              style={{ animationDelay: `${idx * 0.05}s` }}
              className="animate-fade-in group flex flex-col items-center gap-2 rounded-xl p-2.5 text-center transition-all duration-150 hover:-translate-y-1 hover:bg-cream active:scale-90 active:bg-cream"
            >
              <FoodImage
                src={categoryImages[cat.id]}
                alt={cat.label}
                className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-cream-dark transition-all duration-300 group-hover:ring-gold sm:h-16 sm:w-16"
              />
              <span className="text-xs font-semibold text-espresso sm:text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
