import { useEffect, useRef, useState } from 'react'
import { Search, ShoppingBag, Menu as MenuIcon, X, Coffee } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { cartCount, toggleCart } = useCart()
  const [bump, setBump] = useState(false)
  const prevCartCount = useRef(cartCount)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setBump(true)
      const timer = setTimeout(() => setBump(false), 350)
      prevCartCount.current = cartCount
      return () => clearTimeout(timer)
    }
    prevCartCount.current = cartCount
  }, [cartCount])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const submitSearch = (e) => {
    e.preventDefault()
    onSearch(searchValue)
    setSearchOpen(false)
    handleNavClick('#menu')
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur shadow-soft py-2'
          : 'bg-gradient-to-b from-black/50 to-transparent py-4'
      }`}
    >
      <nav className="container-px mx-auto flex items-center justify-between max-w-7xl">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          className="flex items-center gap-2 shrink-0"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              scrolled ? 'bg-espresso text-gold' : 'bg-cream/15 text-gold backdrop-blur'
            }`}
          >
            <Coffee size={18} />
          </span>
          <span
            className={`font-display font-bold text-xl tracking-wide ${
              scrolled ? 'text-espresso' : 'text-cream'
            }`}
          >
            {siteConfig.logoText} <span className="text-gold">{siteConfig.logoAccent}</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  scrolled ? 'text-espresso' : 'text-cream'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-label="Search menu"
              onClick={() => setSearchOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled ? 'text-espresso hover:bg-cream-dark' : 'text-cream hover:bg-white/10'
              }`}
            >
              <Search size={19} />
            </button>
            {searchOpen && (
              <form
                onSubmit={submitSearch}
                className="absolute right-0 top-12 w-64 animate-scale-in rounded-xl bg-white shadow-card p-2 origin-top-right"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search the menu..."
                  className="w-full rounded-lg border border-cream-dark px-3 py-2 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </form>
            )}
          </div>

          <button
            type="button"
            aria-label={`Open cart, ${cartCount} items`}
            onClick={toggleCart}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              scrolled ? 'text-espresso hover:bg-cream-dark' : 'text-cream hover:bg-white/10'
            }`}
          >
            <ShoppingBag size={19} className={bump ? 'animate-bump' : ''} />
            {cartCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-espresso ${
                  bump ? 'animate-bump' : ''
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('#menu')}
            className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm"
          >
            Order Now
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              scrolled ? 'text-espresso hover:bg-cream-dark' : 'text-cream hover:bg-white/10'
            }`}
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden animate-slide-up bg-cream border-t border-cream-dark mt-2 shadow-soft">
          <form onSubmit={submitSearch} className="container-px py-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search the menu..."
              className="w-full rounded-lg border border-cream-dark px-3 py-2.5 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </form>
          <ul className="container-px pb-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="block py-3 text-base font-medium text-espresso border-b border-cream-dark/60 last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-px pb-5">
            <button
              type="button"
              onClick={() => handleNavClick('#menu')}
              className="btn-primary w-full"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
