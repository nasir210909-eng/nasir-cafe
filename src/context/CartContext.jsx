import { createContext, useContext, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useToast } from './ToastContext'
import { buildLineKey } from '../utils/orderUtils'
import siteConfig from '../config/siteConfig'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('nasircafe_cart', [])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { showToast } = useToast()

  const addToCart = (product, quantity = 1, customizations = [], instructions = '') => {
    const lineKey = buildLineKey(product.id, customizations, instructions)

    setItems((prev) => {
      const existing = prev.find((item) => item.lineKey === lineKey)
      if (existing) {
        return prev.map((item) =>
          item.lineKey === lineKey ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [
        ...prev,
        {
          lineKey,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
          customizations,
          instructions,
        },
      ]
    })

    showToast(`${product.name} added to your cart.`)
  }

  const removeFromCart = (lineKey) => {
    setItems((prev) => prev.filter((item) => item.lineKey !== lineKey))
  }

  const updateQuantity = (lineKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(lineKey)
      return
    }
    setItems((prev) => prev.map((item) => (item.lineKey === lineKey ? { ...item, quantity } : item)))
  }

  const clearCart = () => setItems([])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )
  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0
    return subtotal >= siteConfig.freeDeliveryThreshold ? 0 : siteConfig.deliveryFee
  }, [items.length, subtotal])
  const total = subtotal + deliveryFee

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
