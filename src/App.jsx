import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryCards from './components/CategoryCards'
import FeaturedMenu from './components/FeaturedMenu'
import Menu from './components/Menu'
import Offers from './components/Offers'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductModal from './components/ProductModal'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import BackToTop from './components/BackToTop'
import MobileOrderBar from './components/MobileOrderBar'
import AdminPage from './components/AdminPage'
import { useCart } from './context/CartContext'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeProduct, setActiveProduct] = useState(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  const { closeCart } = useCart()

  const handleNavSearch = (term) => {
    setSearchTerm(term)
    setActiveCategory('all')
  }

  const openCheckout = () => {
    closeCart()
    setCheckoutOpen(true)
  }

  const handlePlaceOrder = (order) => {
    setCheckoutOpen(false)
    setConfirmedOrder(order)
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return <AdminPage />
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onSearch={handleNavSearch} />

      <main>
        <Hero />
        <CategoryCards onSelectCategory={setActiveCategory} />
        <FeaturedMenu onOpenDetails={setActiveProduct} />
        <Menu
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenDetails={setActiveProduct}
        />
        <Offers />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />

      {activeProduct && (
        <ProductModal item={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

      <Cart onCheckout={openCheckout} />

      {checkoutOpen && (
        <Checkout onClose={() => setCheckoutOpen(false)} onPlaceOrder={handlePlaceOrder} />
      )}

      {confirmedOrder && (
        <OrderConfirmation order={confirmedOrder} onClose={() => setConfirmedOrder(null)} />
      )}

      <BackToTop />
      <MobileOrderBar />
    </div>
  )
}
