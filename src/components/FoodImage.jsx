import { useState } from 'react'
import { Coffee } from 'lucide-react'

// Shared <img> wrapper with a graceful on-brand fallback if an external
// image URL fails to load, so a bad/replaced link never breaks the layout.
export default function FoodImage({ src, alt, className = '', imgClassName = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-coffee-light/30 to-coffee-dark/40 text-cream ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coffee className="opacity-70" size={32} />
      </div>
    )
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
