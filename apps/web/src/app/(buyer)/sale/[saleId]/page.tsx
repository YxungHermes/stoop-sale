'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, MessageCircle, Share2, Heart, User } from 'lucide-react'
import { SaleCanvas } from '@/components/sale-canvas'
import { Badge, Button, Avatar } from '@stoop-sale/ui'
import { formatTimeUntil } from '@stoop-sale/ui'
import type { CanvasItem } from '@/lib/types'

// Mock sale data
const MOCK_SALE = {
  id: '1',
  title: 'Moving Sale - Everything Must Go!',
  description: "We're moving across the country and can't take everything. Great deals on furniture, books, vintage finds, and more. Everything priced to sell!",
  seller: {
    id: 'seller-1',
    name: 'Sarah M.',
    image: null,
    bio: 'Brooklyn native, vintage lover, plant mom',
    rating: 4.8,
    salesCount: 12,
  },
  theme: 'MOVING',
  status: 'live' as const,
  startsAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  address: 'Park Slope, Brooklyn',
  neighborhood: 'Park Slope',
  viewCount: 156,
}

// Mock items for the canvas
const MOCK_ITEMS: CanvasItem[] = [
  {
    id: '1',
    title: 'Vintage Record Player',
    price: 45,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'],
    positionX: 100,
    positionY: 150,
    rotation: -5,
    scale: 1.2,
    status: 'AVAILABLE',
    description: 'Works great, just needs a new needle. Perfect for vinyl lovers.',
    category: 'Electronics',
  },
  {
    id: '2',
    title: 'Stack of Fiction Books',
    price: 10,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop'],
    positionX: 350,
    positionY: 200,
    rotation: 3,
    scale: 0.9,
    status: 'AVAILABLE',
    description: 'Mix of contemporary fiction. Great summer reads!',
    category: 'Books',
  },
  {
    id: '3',
    title: 'Hand-painted Ceramic Vase',
    price: 15,
    isOBO: false,
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&h=300&fit=crop'],
    positionX: 500,
    positionY: 120,
    rotation: -2,
    scale: 1,
    status: 'AVAILABLE',
    description: 'Beautiful handmade vase, perfect for fresh flowers.',
    category: 'Home Decor',
  },
  {
    id: '4',
    title: 'Kids Bicycle',
    price: 35,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=300&h=300&fit=crop'],
    positionX: 200,
    positionY: 350,
    rotation: 8,
    scale: 1.3,
    status: 'SOLD',
    description: 'Great condition, fits ages 5-8. Includes training wheels.',
    category: 'Kids',
  },
  {
    id: '5',
    title: 'Vintage Lamp',
    price: 25,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop'],
    positionX: 450,
    positionY: 320,
    rotation: -4,
    scale: 1.1,
    status: 'AVAILABLE',
    description: '1970s brass lamp, works perfectly. Great mood lighting.',
    category: 'Furniture',
  },
  {
    id: '6',
    title: 'Potted Monstera',
    price: 20,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300&h=300&fit=crop'],
    positionX: 600,
    positionY: 250,
    rotation: 2,
    scale: 1,
    status: 'PENDING',
    description: 'Healthy monstera, about 2 years old. Comes with pot.',
    category: 'Plants',
  },
]

export default function SalePage({ params }: { params: { saleId: string } }) {
  const [isSaved, setIsSaved] = useState(false)

  const availableItems = MOCK_ITEMS.filter(i => i.status === 'AVAILABLE').length
  const totalItems = MOCK_ITEMS.length

  return (
    <div className="min-h-screen">
      {/* Back navigation and sale header */}
      <div className="bg-white border-b-2 border-stoop-charcoal/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Back link */}
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-stoop-charcoal/60 hover:text-stoop-charcoal transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to browse
          </Link>

          {/* Sale header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl text-stoop-charcoal">
                  {MOCK_SALE.title}
                </h1>
                <Badge variant={MOCK_SALE.status === 'live' ? 'live' : 'upcoming'}>
                  {MOCK_SALE.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stoop-charcoal/60">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {MOCK_SALE.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {MOCK_SALE.status === 'live'
                    ? `Ends in ${formatTimeUntil(MOCK_SALE.endsAt)}`
                    : `Starts in ${formatTimeUntil(MOCK_SALE.startsAt)}`
                  }
                </span>
                <span>
                  {availableItems} of {totalItems} items available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? 'text-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="secondary">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Seller
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row">
        {/* Canvas area */}
        <div className="flex-1 h-[60vh] lg:h-[calc(100vh-180px)]">
          <SaleCanvas
            items={MOCK_ITEMS}
            background="BLANKET"
            isEditable={false}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white border-l-2 border-stoop-charcoal/10 p-6">
          {/* Seller info */}
          <div className="mb-6">
            <h3 className="font-display text-sm text-stoop-charcoal/60 uppercase tracking-wide mb-3">
              Seller
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={MOCK_SALE.seller.name} size="lg" />
              <div>
                <p className="font-display text-lg text-stoop-charcoal">
                  {MOCK_SALE.seller.name}
                </p>
                <p className="text-sm text-stoop-charcoal/60">
                  {MOCK_SALE.seller.salesCount} sales · {MOCK_SALE.seller.rating} stars
                </p>
              </div>
            </div>
            {MOCK_SALE.seller.bio && (
              <p className="text-sm text-stoop-charcoal/70 italic">
                "{MOCK_SALE.seller.bio}"
              </p>
            )}
          </div>

          {/* Sale description */}
          {MOCK_SALE.description && (
            <div className="mb-6">
              <h3 className="font-display text-sm text-stoop-charcoal/60 uppercase tracking-wide mb-2">
                About This Sale
              </h3>
              <p className="text-stoop-charcoal/80 text-sm leading-relaxed">
                {MOCK_SALE.description}
              </p>
            </div>
          )}

          {/* Quick stats */}
          <div className="mb-6 p-4 bg-stoop-warm/30 rounded-xl">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-stoop-charcoal">{totalItems}</p>
                <p className="text-sm text-stoop-charcoal/60">Total Items</p>
              </div>
              <div>
                <p className="font-display text-2xl text-stoop-charcoal">{MOCK_SALE.viewCount}</p>
                <p className="text-sm text-stoop-charcoal/60">Views</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-stoop-sunshine/20 rounded-xl border-2 border-stoop-sunshine/30">
            <p className="font-accent text-lg text-stoop-charcoal mb-1">
              Pro tip!
            </p>
            <p className="text-sm text-stoop-charcoal/70">
              Click on any item to see details and make an offer. Don't be shy - "OBO" means the seller expects some haggling!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
