import { useMemo } from 'react'
import { Search, SearchX } from 'lucide-react'
import menuItems, { categories } from '../data/menu'
import MenuCard from './MenuCard'

export default function Menu({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  onOpenDetails,
}) {
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  return (
    <section id="menu" className="bg-cream-dark/40 py-20 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-heading mt-3">Our Menu</h2>
          <p className="mt-4 text-espresso/65">
            Browse every category and find your next favorite bite.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes, coffee, desserts..."
              aria-label="Search menu items"
              className="w-full rounded-full border border-cream-dark bg-white py-3 pl-11 pr-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="no-scrollbar flex w-full max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-espresso text-cream shadow-card'
                    : 'bg-white text-espresso/70 hover:bg-cream-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="animate-fade-in">
                <MenuCard item={item} onOpenDetails={onOpenDetails} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <SearchX size={40} className="text-espresso/30" />
            <p className="font-display text-xl font-semibold text-espresso">No items found</p>
            <p className="max-w-sm text-sm text-espresso/60">
              We couldn't find anything matching "{searchTerm}". Try another search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('all')
              }}
              className="btn-dark mt-2 !py-2.5 !px-5 text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
