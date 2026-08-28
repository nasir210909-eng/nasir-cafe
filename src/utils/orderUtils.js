// Frontend-only helpers for cart line identity and order simulation.
// NOTE: generateOrderNumber() and the "place order" flow are simulated
// entirely in the browser — see Checkout.jsx. When a real backend is
// introduced, replace this with a call to the Order Service / API.

export function buildLineKey(productId, customizations = [], instructions = '') {
  return [productId, ...customizations.slice().sort(), instructions.trim().toLowerCase()].join('|')
}

export function generateOrderNumber() {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `NC-${year}-${random}`
}

export function formatPrice(amount, currency = 'AED') {
  return `${currency} ${Number(amount).toFixed(2).replace(/\.00$/, '')}`
}
