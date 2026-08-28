import { ArrowRight, ShoppingBag } from 'lucide-react'
import siteConfig from '../config/siteConfig'

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-espresso"
    >
      <div className="absolute inset-0">
        <img
          src={siteConfig.images.hero}
          alt="Freshly prepared food and coffee at NASIR CAFÉ"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-espresso/20" />
      </div>

      <div className="relative z-10 container-px mx-auto max-w-7xl pt-24">
        <p className="animate-fade-in section-eyebrow text-gold">Welcome to Nasir Café</p>
        <h1 className="animate-slide-up mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-cream sm:text-5xl md:text-6xl">
          Good Food. Great Coffee. <span className="text-gold">Better Moments.</span>
        </h1>
        <p
          className="animate-slide-up mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
          style={{ animationDelay: '0.1s' }}
        >
          {siteConfig.description}
        </p>

        <div
          className="animate-slide-up mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: '0.2s' }}
        >
          <button type="button" onClick={() => scrollTo('#menu')} className="btn-primary">
            Explore Menu <ArrowRight size={18} />
          </button>
          <button type="button" onClick={() => scrollTo('#menu')} className="btn-outline">
            <ShoppingBag size={18} /> Order Now
          </button>
        </div>

        <div
          className="animate-fade-in mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-cream/20 pt-6"
          style={{ animationDelay: '0.35s' }}
        >
          <div>
            <p className="font-display text-2xl font-bold text-gold">4.8/5</p>
            <p className="text-xs text-cream/70">Customer Rating</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-gold">25+</p>
            <p className="text-xs text-cream/70">Menu Favorites</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-gold">16h</p>
            <p className="text-xs text-cream/70">Daily Service</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="animate-float h-10 w-6 rounded-full border-2 border-cream/40 p-1">
          <div className="h-2 w-2 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  )
}
