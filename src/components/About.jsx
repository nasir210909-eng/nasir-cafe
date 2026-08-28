import { Leaf, ChefHat, Smile, Sparkles } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import FoodImage from './FoodImage'

const HIGHLIGHTS = [
  { icon: Leaf, label: 'Quality Ingredients' },
  { icon: ChefHat, label: 'Freshly Prepared' },
  { icon: Smile, label: 'Friendly Service' },
  { icon: Sparkles, label: 'Great Atmosphere' },
]

export default function About() {
  return (
    <section id="about" className="container-px mx-auto max-w-7xl py-20 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-in relative">
          <FoodImage
            src={siteConfig.images.about}
            alt={`Inside ${siteConfig.name}`}
            className="h-80 w-full overflow-hidden rounded-3xl shadow-card sm:h-[26rem]"
          />
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-5 shadow-card sm:block">
            <p className="font-display text-3xl font-bold text-gold-dark">10+</p>
            <p className="text-xs text-espresso/60">Years of Passion</p>
          </div>
        </div>

        <div className="animate-slide-up">
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-heading mt-3">More Than Just a Café</h2>
          <p className="mt-5 leading-relaxed text-espresso/70">
            At {siteConfig.name}, we believe great food brings people together. From freshly
            brewed coffee to carefully prepared meals, every item is made with quality, freshness
            and attention to detail.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-cream-dark/50 p-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso text-gold">
                  <Icon size={17} />
                </span>
                <span className="text-sm font-semibold text-espresso">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
