import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import siteConfig from '../config/siteConfig'

export default function Contact() {
  return (
    <section id="contact" className="container-px mx-auto max-w-7xl py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="section-eyebrow">Get In Touch</p>
        <h2 className="section-heading mt-3">Visit or Contact Us</h2>
        <p className="mt-4 text-espresso/65">
          We'd love to welcome you — or bring {siteConfig.name} straight to your door.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="animate-fade-in overflow-hidden rounded-2xl shadow-card">
          <iframe
            title={`${siteConfig.name} location map`}
            src={siteConfig.mapEmbedUrl}
            className="h-72 w-full border-0 sm:h-full sm:min-h-[22rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="animate-slide-up flex flex-col gap-4">
          <div className="flex items-start gap-4 rounded-2xl bg-cream-dark/40 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-gold">
              <MapPin size={18} />
            </span>
            <div>
              <p className="font-display font-semibold text-espresso">{siteConfig.name}</p>
              <p className="text-sm text-espresso/65">{siteConfig.contact.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-cream-dark/40 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-gold">
              <Clock size={18} />
            </span>
            <div>
              <p className="font-display font-semibold text-espresso">Opening Hours</p>
              <p className="text-sm text-espresso/65">
                {siteConfig.hours.days} · {siteConfig.hours.time}
              </p>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 rounded-full bg-espresso px-4 py-3 text-sm font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-ink active:scale-95 active:translate-y-0"
            >
              <Phone size={16} /> Call
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-green-700 active:scale-95 active:translate-y-0"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-espresso shadow-soft transition hover:-translate-y-0.5 hover:bg-gold-light active:scale-95 active:translate-y-0"
            >
              <Mail size={16} /> Email
            </a>
          </div>

          <p className="mt-1 text-center text-xs text-espresso/45 sm:text-left">
            {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </section>
  )
}
