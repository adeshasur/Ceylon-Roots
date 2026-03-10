import React, { useState } from 'react'
import { ShoppingCart, Leaf, ShieldCheck, Globe, Star, Menu, X, Truck, Award, Heart } from 'lucide-react'

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-stone-50/95 backdrop-blur-md z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8">
          <a href="#shop" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">Shop</a>
          <a href="#about" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">Our Story</a>
        </div>
        
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-semibold tracking-[0.25em] text-stone-900">CEYLON ROOTS</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-stone-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-stone-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 py-4 px-6">
          <a href="#shop" className="block py-2 text-stone-700 hover:text-emerald-800" onClick={() => setIsOpen(false)}>Shop</a>
          <a href="#about" className="block py-2 text-stone-700 hover:text-emerald-800" onClick={() => setIsOpen(false)}>Our Story</a>
        </div>
      )}
    </nav>
  )
}

function Hero({ onShopNow }) {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl order-2 lg:order-1 opacity-0 animate-fade-in-up">
            <span className="text-emerald-800 text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
              Premium Organic Ceylon Cinnamon
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 leading-tight mb-6">
              Pure. Organic. Authentic.
            </h1>
            <p className="text-base sm:text-lg text-stone-500 mb-8 leading-loose">
              Experience the world's finest Ceylon cinnamon, harvested from 
              centuries-old spice gardens in Sri Lanka. Unmatched in flavor, 
              aroma, and quality.
            </p>
            <button 
              onClick={onShopNow}
              className="bg-emerald-800 text-white px-8 py-4 text-sm font-medium 
              tracking-widest hover:bg-emerald-900 transition-all duration-300 hover:scale-105 
              hover:shadow-2xl active:scale-95"
            >
              SHOP NOW
            </button>
          </div>
          
          <div className="order-1 lg:order-2 relative opacity-0 animate-fade-in-up-delay">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=900&q=85&auto=format&fit=crop" 
                alt="Ceylon Cinnamon Sticks" 
                className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 shadow-xl rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <p className="text-stone-900 font-semibold">100% Pure</p>
                  <p className="text-stone-500 text-sm">Single origin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBadges() {
  const badges = [
    { icon: Leaf, label: '100% Organic', desc: 'Certified organic farming' },
    { icon: ShieldCheck, label: 'Export Quality', desc: 'International standards' },
    { icon: Globe, label: 'Ethically Sourced', desc: 'Direct trade with farmers' },
    { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' }
  ]
  
  return (
    <section className="bg-white border-y border-stone-200 py-10 sm:py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />
              </div>
              <div>
                <span className="text-stone-900 font-semibold text-sm sm:text-base block">{badge.label}</span>
                <span className="text-stone-500 text-xs sm:text-sm">{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-emerald-800 text-white text-xs px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2">{product.name}</h3>
        <p className="text-stone-500 text-sm mb-4">{product.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-stone-900">${product.price}</span>
          <button 
            onClick={onAddToCart}
            className="bg-emerald-800 text-white px-5 sm:px-6 py-2 rounded-full hover:bg-emerald-900 
            transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function Shop({ onAddToCart }) {
  const products = [
    {
      id: 1,
      name: "Ceylon Cinnamon Sticks",
      desc: "Premium grade A cinnamon sticks, 50g",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=700&q=85&auto=format&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Ceylon Cinnamon Powder",
      desc: "Finely ground pure cinnamon, 100g",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=85&auto=format&fit=crop",
      badge: null
    },
    {
      id: 3,
      name: "Cinnamon Gift Set",
      desc: "Sticks + Powder + Cinnamon Oil, 150g",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=700&q=85&auto=format&fit=crop",
      badge: "Popular"
    }
  ]
  
  return (
    <section id="shop" className="py-20 sm:py-24 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in-up">
          <span className="text-emerald-800 text-sm font-medium tracking-[0.25em] uppercase">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mt-4">
            Premium Ceylon Cinnamon
          </h2>
          <p className="text-stone-500 mt-4 max-w-2xl mx-auto leading-relaxed px-4">
            Hand-selected from the finest spice gardens in Sri Lanka. Each product is carefully 
            processed to preserve its natural flavor, aroma, and health benefits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <ProductCard product={product} onAddToCart={() => onAddToCart(product)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section id="about" className="py-20 sm:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative opacity-0 animate-fade-in-up">
            <img 
              src="https://images.unsplash.com/photo-1599707367072-cd6cf2c57609?w=900&q=85&auto=format&fit=crop" 
              alt="Cinnamon Plantation Sri Lanka"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-5 -right-5 sm:-bottom-8 sm:-right-8 bg-emerald-800 text-white p-6 sm:p-8 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8" />
                <span className="text-lg sm:text-xl font-semibold">Award Winning</span>
              </div>
              <p className="text-emerald-100 text-sm">Recognized for exceptional quality since 2018</p>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in-up-delay">
            <span className="text-emerald-800 text-sm font-medium tracking-widest uppercase">
              Premium Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mt-4 mb-6">
              Nature's purest spice, delivered to your door
            </h2>
            <p className="text-stone-500 leading-loose mb-6">
              Our Ceylon cinnamon is carefully selected from small family farms 
              in Sri Lanka, where traditional growing methods have been preserved 
              for generations. Each stick is hand-harvested and naturally dried, 
              retaining its delicate flavor profile and health properties.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Heart, text: 'Rich in antioxidants and anti-inflammatory compounds' },
                { icon: Leaf, text: 'Sustainable farming practices' },
                { icon: ShieldCheck, text: 'Third-party tested for purity' },
                { icon: Globe, text: 'Direct trade from farm to table' }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-stone-600">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    {
      rating: 5,
      text: "The aroma is incredible. I've tried many cinnamon brands, but nothing comes close to the quality of Ceylon Roots. The flavor is so much more complex and nuanced.",
      name: "Sarah M.",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face"
    },
    {
      rating: 5,
      text: "Finally found authentic Ceylon cinnamon! The difference from regular cassia is remarkable. My morning coffee has never been better. Will definitely order again.",
      name: "James K.",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face"
    },
    {
      rating: 5,
      text: "Beautiful packaging and exceptional product. This is now my go-to for all my baking needs. My pastries have never tasted better!",
      name: "Elena R.",
      location: "Miami, FL",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&crop=face"
    }
  ]
  
  return (
    <section className="py-20 sm:py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in-up">
          <span className="text-emerald-800 text-sm font-medium tracking-[0.25em] uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mt-4">What our customers say</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white p-6 sm:p-8 shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-6 leading-loose">"{review.text}"</p>
              <div className="border-t border-stone-100 pt-4 flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-100 flex-shrink-0"
                />
                <div>
                  <span className="text-stone-900 font-semibold block">{review.name}</span>
                  <span className="text-stone-500 text-sm">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      q: "What makes Ceylon cinnamon different from regular cinnamon?",
      a: "Ceylon cinnamon (Cinnamomum verum) is considered the 'true' cinnamon with a milder, sweeter flavor. It has significantly lower coumarin levels compared to cassia cinnamon, making it safer for regular consumption."
    },
    {
      q: "How should I store my cinnamon?",
      a: "Store in a cool, dry place away from direct sunlight. Properly stored, ground cinnamon lasts about 2 years while cinnamon sticks can last up to 3-4 years."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes! We ship worldwide. Free shipping is available on orders over $50. All orders are carefully packaged to ensure freshness."
    },
    {
      q: "Is your product organic certified?",
      a: "Yes, all our products are certified organic and we work directly with certified organic farms in Sri Lanka."
    }
  ]
  
  return (
    <section className="py-20 sm:py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in-up">
          <span className="text-emerald-800 text-sm font-medium tracking-[0.25em] uppercase">
            Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mt-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-stone-50 rounded-lg p-5 sm:p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-stone-900 list-none">
                <span className="pr-4">{faq.q}</span>
                <span className="transition group-open:rotate-180 flex-shrink-0">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-stone-500 mt-4 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 sm:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg sm:text-xl font-semibold tracking-[0.25em] text-white block mb-4">
              CEYLON ROOTS
            </span>
            <p className="text-sm">Premium Organic Ceylon Cinnamon from Sri Lanka</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>hello@ceylonroots.com</li>
              <li>Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-6 sm:pt-8 text-center">
          <p className="text-sm">© 2026 Ceylon Roots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  
  const handleShopNow = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1)
    alert(`Added ${product.name} to cart!`)
  }
  
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar cartCount={cartCount} />
      <main>
        <Hero onShopNow={handleShopNow} />
        <TrustBadges />
        <Shop onAddToCart={handleAddToCart} />
        <Benefits />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}