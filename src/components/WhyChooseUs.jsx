import { Salad, ChefHat, Zap, HeartHandshake } from 'lucide-react'

const FEATURES = [
  {
    icon: Salad,
    title: 'Fresh Ingredients',
    description: 'Quality ingredients selected every day.',
  },
  {
    icon: ChefHat,
    title: 'Expert Preparation',
    description: 'Carefully prepared food and beverages.',
  },
  {
    icon: Zap,
    title: 'Fast Service',
    description: 'Quick and convenient ordering.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Satisfaction',
    description: 'Your experience matters to us.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-cream-dark/40 py-20 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow">Why NASIR CAFÉ</p>
          <h2 className="section-heading mt-3">Why Choose Us</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              className="animate-slide-up group rounded-2xl bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-espresso">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-espresso">{title}</h3>
              <p className="mt-1.5 text-sm text-espresso/65">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
