import { Coffee, MessageCircle } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { useCart } from '../context/CartContext'

// lucide-react no longer bundles trademarked brand/social logos, so the
// social row below uses small self-drawn glyphs instead.
function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3h-3.1v12.4a2.7 2.7 0 1 1-2.1-2.63V9.6a5.8 5.8 0 1 0 5.2 5.77V9.9a6.9 6.9 0 0 0 4 1.28V8.1a3.9 3.9 0 0 1-4-3.86V3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.34C15.9 4.24 15 4.16 13.94 4.16c-2.2 0-3.7 1.34-3.7 3.8v2.44H7.6v3h2.64V21h3.26z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const { toggleCart } = useCart()

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-ink text-cream/70">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-gold">
                <Coffee size={17} />
              </span>
              <span className="font-display text-lg font-bold text-cream">
                {siteConfig.logoText} <span className="text-gold">{siteConfig.logoAccent}</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.href)
                    }}
                    className="transition active:text-gold-light hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              Customer
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <button type="button" onClick={() => scrollTo('#menu')} className="transition active:text-gold-light hover:text-gold">
                  Order Now
                </button>
              </li>
              <li>
                <button type="button" onClick={toggleCart} className="transition active:text-gold-light hover:text-gold">
                  Cart
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('#contact')} className="transition active:text-gold-light hover:text-gold">
                  Delivery Information
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              Follow Us
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition active:scale-90 hover:bg-gold hover:text-espresso"
              >
                <InstagramIcon width={17} height={17} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition active:scale-90 hover:bg-gold hover:text-espresso"
              >
                <FacebookIcon width={17} height={17} />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition active:scale-90 hover:bg-gold hover:text-espresso"
              >
                <TikTokIcon width={16} height={16} />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition active:scale-90 hover:bg-gold hover:text-espresso"
              >
                <MessageCircle size={17} />
              </a>
            </div>
            <p className="mt-5 text-sm">{siteConfig.contact.phoneDisplay}</p>
            <p className="text-sm">{siteConfig.contact.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5">
        <p className="text-center text-xs text-cream/50">
          © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
