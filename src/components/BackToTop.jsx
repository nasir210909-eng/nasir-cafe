import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="animate-fade-in fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-gold shadow-card transition hover:-translate-y-1 hover:bg-ink sm:bottom-8 sm:right-6"
    >
      <ArrowUp size={19} />
    </button>
  )
}
