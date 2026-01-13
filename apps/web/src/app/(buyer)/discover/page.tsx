'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, ChevronUp, Shuffle, Filter, X } from 'lucide-react'
import { PriceTag, Badge, Button } from '@stoop-sale/ui'
import Link from 'next/link'

// Mock items for the endless table
const MOCK_DISCOVER_ITEMS = [
  {
    id: '1',
    saleId: 'sale-1',
    title: 'Vintage Record Player',
    price: 45,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    seller: 'Sarah M.',
    neighborhood: 'Park Slope',
    distance: 0.3,
  },
  {
    id: '2',
    saleId: 'sale-2',
    title: 'Mid-Century Modern Chair',
    price: 75,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    seller: 'Marcus T.',
    neighborhood: 'Williamsburg',
    distance: 0.8,
  },
  {
    id: '3',
    saleId: 'sale-1',
    title: 'Box of Vintage Books',
    price: 15,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
    seller: 'Sarah M.',
    neighborhood: 'Park Slope',
    distance: 0.3,
  },
  {
    id: '4',
    saleId: 'sale-3',
    title: 'Kids Wooden Blocks Set',
    price: 12,
    isOBO: false,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
    seller: 'The Johnsons',
    neighborhood: 'Cobble Hill',
    distance: 1.2,
  },
  {
    id: '5',
    saleId: 'sale-2',
    title: 'Vinyl Record Collection',
    price: 50,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=400&h=400&fit=crop',
    seller: 'Marcus T.',
    neighborhood: 'Williamsburg',
    distance: 0.8,
  },
  {
    id: '6',
    saleId: 'sale-1',
    title: 'Ceramic Plant Pots (3)',
    price: 20,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    seller: 'Sarah M.',
    neighborhood: 'Park Slope',
    distance: 0.3,
  },
  {
    id: '7',
    saleId: 'sale-4',
    title: 'Vintage Camera',
    price: 65,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    seller: 'Elena R.',
    neighborhood: 'Brooklyn Heights',
    distance: 0.5,
  },
  {
    id: '8',
    saleId: 'sale-3',
    title: 'Kids Bicycle with Training Wheels',
    price: 35,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=400&fit=crop',
    seller: 'The Johnsons',
    neighborhood: 'Cobble Hill',
    distance: 1.2,
  },
  {
    id: '9',
    saleId: 'sale-2',
    title: 'Retro Desk Lamp',
    price: 28,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    seller: 'Marcus T.',
    neighborhood: 'Williamsburg',
    distance: 0.8,
  },
  {
    id: '10',
    saleId: 'sale-4',
    title: 'Handmade Quilt',
    price: 45,
    isOBO: false,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    seller: 'Elena R.',
    neighborhood: 'Brooklyn Heights',
    distance: 0.5,
  },
  {
    id: '11',
    saleId: 'sale-1',
    title: 'Cast Iron Skillet',
    price: 25,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1585442231018-4e2e9ee21d0d?w=400&h=400&fit=crop',
    seller: 'Sarah M.',
    neighborhood: 'Park Slope',
    distance: 0.3,
  },
  {
    id: '12',
    saleId: 'sale-5',
    title: 'Antique Mirror',
    price: 85,
    isOBO: true,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
    seller: 'Thompson Family',
    neighborhood: 'Carroll Gardens',
    distance: 2.1,
  },
]

interface DiscoverItem {
  id: string
  saleId: string
  title: string
  price: number
  isOBO: boolean
  image: string
  seller: string
  neighborhood: string
  distance: number
}

function DiscoverCard({ item, onSave }: { item: DiscoverItem; onSave: () => void }) {
  const [saved, setSaved] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, rotate: Math.random() * 2 - 1 }}
      className="relative group"
    >
      <Link href={`/sale/${item.saleId}`}>
        <div className="bg-white rounded-2xl overflow-hidden border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[6px_6px_0px_rgba(0,0,0,0.12)]">
          {/* Image */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Save button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setSaved(!saved)
                onSave()
              }}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                saved
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-stoop-charcoal/60 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>

            {/* Price tag */}
            <div className="absolute bottom-3 left-3">
              <PriceTag price={item.price} isOBO={item.isOBO} size="sm" />
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-display text-lg text-stoop-charcoal mb-1 truncate">
              {item.title}
            </h3>
            <p className="text-sm text-stoop-charcoal/60">
              {item.seller} · {item.distance} mi
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function DiscoverPage() {
  const [items, setItems] = useState(MOCK_DISCOVER_ITEMS)
  const [showFilters, setShowFilters] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Shuffle items for that serendipitous feel
  const shuffleItems = useCallback(() => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }, [])

  // Load more items (infinite scroll simulation)
  const loadMore = useCallback(() => {
    // In a real app, this would fetch more items
    // For now, just duplicate with new IDs
    setItems(prev => [
      ...prev,
      ...MOCK_DISCOVER_ITEMS.map(item => ({
        ...item,
        id: `${item.id}-${Date.now()}-${Math.random()}`,
      })),
    ])
  }, [])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1000
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])

  return (
    <div className="min-h-screen bg-stoop-cream">
      {/* Header */}
      <div className="sticky top-[65px] z-40 bg-stoop-cream/95 backdrop-blur-sm border-b-2 border-stoop-charcoal/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-stoop-charcoal">
                Endless Table
              </h1>
              <p className="text-stoop-charcoal/60">
                Scroll, discover, stumble upon something great
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={shuffleItems}>
                <Shuffle className="w-5 h-5 mr-2" />
                Shuffle
              </Button>
              <Button
                variant={showFilters ? 'secondary' : 'ghost'}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 flex flex-wrap gap-2">
                  {['All', 'Under $25', 'Vintage', 'Kids', 'Furniture', 'Books', 'Electronics'].map(
                    (filter) => (
                      <button
                        key={filter}
                        className="px-4 py-2 bg-white rounded-full border-2 border-stoop-charcoal/10 font-display text-sm text-stoop-charcoal hover:border-stoop-terracotta hover:bg-stoop-terracotta/10 transition-colors"
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The endless table */}
      <div className="max-w-6xl mx-auto px-4 py-8" ref={containerRef}>
        {/* Intro text */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <p className="font-handwritten text-2xl text-stoop-charcoal/80 mb-2">
            No search bar. No categories. Just... stuff.
          </p>
          <p className="text-stoop-charcoal/60">
            Items from active sales near you, mixed together like a real yard sale.
            Scroll and see what catches your eye.
          </p>
        </div>

        {/* Masonry-ish grid with varying sizes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <DiscoverCard
              key={item.id}
              item={item}
              onSave={() => {}}
            />
          ))}
        </div>

        {/* Loading indicator */}
        <div className="text-center py-12">
          <p className="font-display text-stoop-charcoal/60 animate-pulse">
            Loading more treasures...
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-4 bg-stoop-charcoal text-white rounded-full shadow-lg hover:bg-stoop-charcoal/90 transition-colors z-50"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  )
}
