import menuItems from '../data/menu'
import MenuCard from './MenuCard'

export default function FeaturedMenu({ onOpenDetails }) {
  const favorites = menuItems.filter((item) => item.featured)

  return (
    <section className="container-px mx-auto max-w-7xl py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="section-eyebrow">Handpicked For You</p>
        <h2 className="section-heading mt-3">Our Favorites</h2>
        <p className="mt-4 text-espresso/65">
          The dishes and drinks our guests keep coming back for.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item, idx) => (
          <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.08}s` }}>
            <MenuCard item={item} onOpenDetails={onOpenDetails} />
          </div>
        ))}
      </div>
    </section>
  )
}
