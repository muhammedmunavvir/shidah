"use client"
import { useState, useEffect } from "react"

export default function MobileHero() {
  const images = [
    "https://res.cloudinary.com/dwypehszo/image/upload/v1764336123/6fdb79c4566bc82ed9d31cf0a09f351b_mkiztl.jpg",
    "https://res.cloudinary.com/dwypehszo/image/upload/v1764336123/2854c5c5ba8afd211accd6b822f70e8c_vnnmcr.jpg",
  ]

  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setIndex((prev) => (prev + 1) % images.length)
    }
    if (isRightSwipe) {
      setIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <section className="w-full bg-gradient-to-b from-neutral-50 to-white min-h-screen">

      {/* HERO IMAGE WITH SWIPE */}
      <div 
        className="relative w-full h-[70vh] max-h-[600px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image with gradient overlay */}
        <div className="absolute inset-0">
          <img
            src={images[index]}
            alt="hero"
            className="w-full h-full object-cover transition-all duration-700 scale-105"
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70"></div>
        </div>

        {/* SLIDER INDICATORS - Top */}
        <div className="absolute top-5 left-0 right-0 flex justify-center gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                index === i ? "w-8 bg-white" : "w-6 bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 z-10">
          
          {/* Small label */}
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-white text-xs font-medium tracking-wide uppercase">New Collection</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl sm:text-7xl font-serif font-light leading-[0.9] tracking-tight text-white mb-4">
            Elegant<br />
            <span className="italic text-amber-50">Pastels</span>
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-lg font-light mb-6 max-w-xs leading-relaxed">
            New arrivals crafted with softness & grace for the modern soul.
          </p>

          {/* CTA Button */}
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full text-sm font-medium tracking-wide uppercase shadow-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200">
            Shop Now
          </button>
        </div>

        {/* Swipe hint (disappears after first interaction) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <svg className="w-8 h-8 text-white/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-1">
              Carefully crafted modern ethnic fashion
            </p>
          </div>
          <button className="text-sm font-medium text-gray-900 underline underline-offset-4">
            View All
          </button>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Dresses', 'Tops', 'Bottoms', 'Accessories'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                cat === 'All' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE HIGHLIGHTS */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 mx-6 mb-8 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-white p-4 text-center">
          <div className="text-2xl mb-1">🚚</div>
          <p className="text-xs font-medium text-gray-900">Free Ship</p>
          <p className="text-[10px] text-gray-500">Over ₹999</p>
        </div>
        <div className="bg-white p-4 text-center">
          <div className="text-2xl mb-1">↩️</div>
          <p className="text-xs font-medium text-gray-900">Easy Return</p>
          <p className="text-[10px] text-gray-500">30 Days</p>
        </div>
        <div className="bg-white p-4 text-center">
          <div className="text-2xl mb-1">✨</div>
          <p className="text-xs font-medium text-gray-900">Premium</p>
          <p className="text-[10px] text-gray-500">Quality</p>
        </div>
      </div>

    </section>
  )
}