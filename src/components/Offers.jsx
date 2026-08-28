import { ArrowRight, Percent } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import FoodImage from './FoodImage'

const OFFERS = [
  {
    title: 'Weekend Special',
    discount: '20% OFF',
    description: 'Selected meals every Friday, Saturday and Sunday.',
    image: siteConfig.images.offer1,
  },
  {
    title: 'Coffee Hour',
    discount: 'Buy 1 Get 1',
    description: 'On all hot coffee, every day between 4–6 PM.',
    image: siteConfig.images.offer3,
  },
  {
    title: 'Family Feast',
    discount: '15% OFF',
    description: 'Combo pizza, pasta and drinks bundles for the table.',
    image: siteConfig.images.offer2,
  },
]

export default function Offers() {
  const scrollToMenu = () => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="offers" className="bg-espresso py-20 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow">Limited Time</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Special Offers
          </h2>
          <p className="mt-4 text-cream/65">
            Great food deserves great deals. Here's what's on right now.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer, idx) => (
            <div
              key={offer.title}
              className="animate-slide-up group relative overflow-hidden rounded-2xl shadow-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <FoodImage src={offer.image} alt={offer.title} className="h-64" imgClassName="transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-espresso">
                <Percent size={12} /> {offer.discount}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-cream">{offer.title}</h3>
                <p className="mt-1 text-sm text-cream/75">{offer.description}</p>
                <button
                  type="button"
                  onClick={scrollToMenu}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition hover:gap-2.5 active:text-gold-light"
                >
                  View Offers <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
