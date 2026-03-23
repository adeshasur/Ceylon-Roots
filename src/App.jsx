import React, { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Leaf, ShieldCheck, Globe, Star, Menu, X, Truck, Award, Heart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'

// --- Simple Scroll Hook for Animations ---
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(entry.target)
      }
    }, options)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [elementRef, isIntersecting]
}

function Section({ children, className = "" }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  
  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  )
}

function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Your Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
              <X className="w-6 h-6 text-stone-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-stone-300" />
                </div>
                <p className="text-stone-500">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="text-emerald-800 font-medium hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fade-in-up">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-stone-900">{item.name}</h3>
                      <p className="text-stone-500 text-sm">${item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-stone-600" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-stone-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-stone-600" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold text-stone-900">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-stone-500 text-xs">Taxes and shipping calculated at checkout.</p>
              <button className="w-full bg-emerald-800 text-white py-4 rounded-full font-medium hover:bg-emerald-900 transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98] flex items-center justify-center gap-2 group">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Navbar({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-stone-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-10">
          <a href="#shop" className="text-stone-600 hover:text-emerald-800 transition-colors font-medium text-sm tracking-wide">Shop</a>
          <a href="#about" className="text-stone-600 hover:text-emerald-800 transition-colors font-medium text-sm tracking-wide">Our Story</a>
        </div>
        
        <button className="md:hidden p-2 text-stone-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-bold tracking-[0.3em] text-stone-900 cursor-default select-none">CEYLON ROOTS</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenCart}
            className="p-3 hover:bg-stone-50 rounded-full transition-all group relative"
          >
            <ShoppingCart className="w-5 h-5 text-stone-700 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-800 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-b border-stone-100 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64" : "max-h-0"}`}>
        <div className="py-6 px-6 space-y-4">
          <a href="#shop" className="block text-stone-700 font-medium" onClick={() => setIsOpen(false)}>Shop</a>
          <a href="#about" className="block text-stone-700 font-medium" onClick={() => setIsOpen(false)}>Our Story</a>
        </div>
      </div>
    </nav>
  )
}

function Hero({ onShopNow }) {
  return (
    <section id="home" className="pt-28 pb-16 px-6 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Section className="max-w-xl order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              <span className="text-emerald-800 text-xs font-bold tracking-widest uppercase">
                Premium Organic Ceylon Cinnamon
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.1] mb-8">
              Nature's Finest <br />
              <span className="italic font-normal serif text-emerald-900">Spice Heritage</span>
            </h1>
            <p className="text-lg text-stone-500 mb-10 leading-relaxed max-w-lg">
              Experience the world's finest Ceylon cinnamon, harvested from 
              centuries-old spice gardens. Unmatched in flavor, 
              aroma, and purity.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={onShopNow}
                className="w-full sm:w-auto bg-emerald-800 text-white px-10 py-5 rounded-full font-semibold 
                tracking-wide hover:bg-emerald-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/10"
              >
                Explore Collection
              </button>
              <a href="#about" className="text-stone-600 font-medium hover:text-stone-900 flex items-center gap-2 group px-4 py-2">
                Discover our story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Section>
          
          <div className="order-1 lg:order-2 relative group flex justify-center items-center">
            <div className="relative z-10 animate-float">
              <div className="overflow-hidden rounded-[3.5rem] shadow-2xl relative border border-stone-100">
                <img 
                  src="/images/main image.png" 
                  alt="Premium Ceylon Cinnamon Heritage" 
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-8 shadow-2xl rounded-full animate-fade-in-up border border-stone-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-stone-900 font-bold text-lg">100% Pure</p>
                    <p className="text-stone-500">Single origin Grade C5</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Design accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-emerald-100 rounded-full -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/20 rounded-full blur-3xl -z-20" />
          </div>
        </div>
        
        {/* Trust Badges moved to Hero footer - Slightly more breathing room */}
        <div className="mt-20 pt-12 border-t border-stone-100/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, label: '100% Organic', desc: 'Certified farming' },
              { icon: ShieldCheck, label: 'Export Quality', desc: 'ISO Standards' },
              { icon: Globe, label: 'Ethically Sourced', desc: 'Direct trade' },
              { icon: Truck, label: 'Free Shipping', desc: 'Over $50' }
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:scale-110 transition-all duration-300">
                  <badge.icon className="w-7 h-7 text-emerald-800" />
                </div>
                <h3 className="text-stone-900 font-bold mb-1 text-base tracking-tight">{badge.label}</h3>
                <p className="text-stone-400 text-xs whitespace-nowrap uppercase tracking-widest">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.badge && (
          <div className="absolute top-5 left-5 overflow-hidden">
            <span className="bg-white/90 backdrop-blur-md text-emerald-900 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg border border-emerald-100 flex items-center gap-1.5">
              <Award className="w-3 h-3" /> {product.badge.toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed line-clamp-2">{product.desc}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-stone-400 text-xs block mb-1">MSRP</span>
            <span className="text-2xl font-bold text-stone-900">${product.price}</span>
          </div>
          <button 
            onClick={onAddToCart}
            className="bg-stone-900 text-white p-4 rounded-full hover:bg-emerald-800 
            transition-all duration-300 hover:scale-110 active:scale-90 group/btn"
          >
            <Plus className="w-6 h-6 group-hover/btn:rotate-90 transition-transform duration-300" />
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
      desc: "Premium grade A cinnamon sticks, hand-peeled and sun-dried for optimal aroma.",
      price: 18.99,
      image: "/images/Ceylon Cinnamon Sticks.png",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Ceylon Cinnamon Powder",
      desc: "Finely ground pure cinnamon from the highest grade barks. Intense flavor.",
      price: 14.99,
      image: "/images/Ceylon Cinnamon Powder.jpg",
      badge: null
    },
    {
      id: 3,
      name: "Cinnamon Gift Set",
      desc: "Sticks + Powder + Pure Cinnamon Leaf Oil. The perfect gift for gourmets.",
      price: 39.99,
      image: "/images/Cinnamon Gift Set.jpeg",
      badge: "Limited"
    },
    {
      id: 4,
      name: "Cinnamon Infused Honey",
      desc: "Raw wildflower honey infused with organic Ceylon cinnamon sticks. 250g jar.",
      price: 24.99,
      image: "/images/Cinnamon Infused Honey.jpg",
      badge: "New"
    },
    {
      id: 5,
      name: "Premium Cinnamon Tea",
      desc: "Ceylon Black Tea blended with hand-crushed cinnamon chips for a warm, spicy brew.",
      price: 12.99,
      image: "/images/Premium Cinnamon Tea.jpg",
      badge: "Trending"
    },
    {
      id: 6,
      name: "Bark Essential Oil",
      desc: "100% Pure steam-distilled cinnamon bark essential oil. Extremely aromatic.",
      price: 45.00,
      image: "/images/Bark Essential Oil.jpg",
      badge: "Pure"
    }
  ]
  
  return (
    <section id="shop" className="py-32 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <Section className="text-center mb-20 space-y-4">
          <span className="text-emerald-800 text-xs font-bold tracking-[0.3em] uppercase">
            Curated selection
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-stone-900">
            Premium <span className="italic font-normal serif">Cinnamon</span> Collection
          </h2>
          <div className="w-20 h-1 bg-emerald-800/10 mx-auto rounded-full" />
        </Section>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Section key={product.id}>
              <ProductCard product={product} onAddToCart={() => onAddToCart(product)} />
            </Section>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section id="about" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <Section className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10" />
            <img 
              src="/images/Cinnamon Plantation Sri Lanka.webp" 
              alt="Cinnamon Plantation Sri Lanka"
              className="rounded-[3rem] shadow-2xl w-full sticky top-0"
            />
            <div className="absolute -bottom-4 -right-4 bg-emerald-900 text-white p-6 rounded-3xl shadow-2xl max-w-[240px] hidden md:block">
              <Award className="w-6 h-6 mb-3 text-emerald-400" />
              <h3 className="text-lg font-bold mb-1 tracking-tight leading-tight">World Standard</h3>
              <p className="text-emerald-100/70 leading-relaxed text-[10px]">Winner of the International Spice Quality Award 2025.</p>
            </div>
          </Section>
          
          <Section className="space-y-8">
            <div className="space-y-4">
              <span className="text-emerald-800 text-xs font-bold tracking-[0.3em] uppercase">
                Direct from source
              </span>
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
                Grown with love in <br />
                <span className="italic font-normal serif text-emerald-900">Sri Lankan Soils</span>
              </h2>
            </div>
            
            <p className="text-lg text-stone-500 leading-relaxed">
              Our Ceylon cinnamon is carefully selected from small family farms where 
              traditional growing methods have been preserved for centuries. 
              Each stick is hand-harvested and naturally dried.
            </p>
            
            <div className="grid sm:grid-cols-1 gap-6 pt-4">
              {[
                { icon: Heart, title: 'Health First', text: 'Rich in antioxidants and zero coumarin' },
                { icon: Leaf, title: 'Eco-Positive', text: 'Sustainably farmed with zero waste' },
                { icon: Globe, title: 'Fair Trade', text: 'Empowering local Sri Lankan farmers' }
              ].map((item, index) => (
                <div key={index} className="flex gap-5 items-start group">
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-800 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-bold mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    {
      rating: 5,
      text: "The aroma is incredible. I've tried many cinnamon brands, but nothing comes close to the quality of Ceylon Roots. The flavor is so complex.",
      name: "Sarah M.",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face"
    },
    {
      rating: 5,
      text: "Finally found authentic Ceylon cinnamon! The difference from regular cassia is remarkable. My morning coffee has never been better.",
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
    <section className="py-32 px-6 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Section className="text-center mb-20 space-y-4">
          <span className="text-emerald-800 text-xs font-bold tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-stone-900">Customer Voices</h2>
        </Section>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Section key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-white hover:shadow-2xl transition-all duration-500">
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-8 leading-relaxed italic text-lg">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-stone-50" />
                <div>
                  <span className="text-stone-900 font-bold block">{review.name}</span>
                  <span className="text-stone-400 text-xs tracking-wide">{review.location.toUpperCase()}</span>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      q: "What makes Ceylon cinnamon 'true'?",
      a: "Ceylon cinnamon (Cinnamomum verum) is considered 'true' cinnamon because it comes from a specific tree native to Sri Lanka. It has a significantly lower coumarin level than common Cassia, making it both safer and sweeter."
    },
    {
      q: "How should I store it for maximum shelf life?",
      a: "Keep it in a cool, dry place away from direct sunlight in an airtight container. Whole sticks can stay fresh for up to 3 years, while powder is best used within 12-18 months."
    },
    {
      q: "Is it safe for daily consumption?",
      a: "Yes! In fact, Ceylon cinnamon is highly recommended for daily use because of its low coumarin content, unlike bulk store-bought cinnamon which can be hard on the liver."
    }
  ]
  
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Section className="text-center mb-16 px-4">
          <h2 className="text-4xl font-light text-stone-900 mb-4 tracking-tight">Common Inquiries</h2>
          <p className="text-stone-500">Everything you need to know about our premium selection.</p>
        </Section>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Section key={index} className="group border border-stone-100 rounded-3xl overflow-hidden hover:border-emerald-100 transition-colors">
              <details className="p-2">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-stone-900 list-none group-hover:text-emerald-900 transition-colors">
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 bg-stone-50 rounded-full flex items-center justify-center transition group-open:rotate-180">
                    <Plus className="w-4 h-4 text-stone-400" />
                  </div>
                </summary>
                <div className="px-6 pb-8 text-stone-500 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            </Section>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-24 px-6 border-t border-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <span className="text-2xl font-bold tracking-[0.4em] text-white">CEYLON ROOTS</span>
            <p className="text-sm leading-relaxed max-w-xs">
              Bringing the authentic heritage of Sri Lankan spices to modern kitchens around the globe, with ethics and purity at our core.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">Collection</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#shop" className="hover:text-emerald-400 transition-colors">Whole Sticks</a></li>
              <li><a href="#shop" className="hover:text-emerald-400 transition-colors">Grinded Powder</a></li>
              <li><a href="#shop" className="hover:text-emerald-400 transition-colors">Essential Oils</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Tracker</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="text-white font-bold tracking-wider">hello@ceylonroots.com</li>
              <li>72 Spice Garden Road, <br />Colombo 007, Sri Lanka</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-stone-900 gap-4 text-xs tracking-widest uppercase font-bold">
          <p>© 2026 Ceylon Roots Overseas. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-white cursor-pointer transition-colors">FACEBOOK</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const handleShopNow = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }
  
  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      <main>
        <Hero onShopNow={handleShopNow} />
        <Shop onAddToCart={handleAddToCart} />
        <Benefits />
        <Reviews />
        <Section><FAQ /></Section>
      </main>
      
      <Footer />
    </div>
  )
}