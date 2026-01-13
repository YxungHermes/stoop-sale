'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Filter, Grid, Map as MapIcon, Search, ChevronDown } from 'lucide-react'
import { Badge, Card, Input } from '@stoop-sale/ui'
import { formatTimeUntil } from '@stoop-sale/ui'

// Mock sales data
const MOCK_SALES = [
  {
    id: '1',
    title: 'Moving Sale - Everything Must Go!',
    seller: { name: 'Sarah M.', image: null },
    theme: 'MOVING',
    status: 'live' as const,
    startsAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    itemCount: 24,
    distance: 0.3,
    neighborhood: 'Park Slope',
    previewItems: ['📦', '🛋️', '📚', '🏺'],
  },
  {
    id: '2',
    title: 'Vintage Vinyl & Books',
    seller: { name: 'Marcus T.', image: null },
    theme: 'VINTAGE',
    status: 'live' as const,
    startsAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    itemCount: 18,
    distance: 0.8,
    neighborhood: 'Williamsburg',
    previewItems: ['📻', '📚', '🎸', '🖼️'],
  },
  {
    id: '3',
    title: 'Kids Outgrew Everything',
    seller: { name: 'The Johnsons', image: null },
    theme: 'KIDS',
    status: 'live' as const,
    startsAt: new Date(Date.now() - 30 * 60 * 1000),
    endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
    itemCount: 35,
    distance: 1.2,
    neighborhood: 'Cobble Hill',
    previewItems: ['🧸', '🚲', '👶', '📖'],
  },
  {
    id: '4',
    title: 'Spring Cleaning',
    seller: { name: 'Elena R.', image: null },
    theme: 'GENERAL',
    status: 'upcoming' as const,
    startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
    itemCount: 20,
    distance: 0.5,
    neighborhood: 'Brooklyn Heights',
    previewItems: ['🏠', '🪴', '🕯️', '📦'],
  },
  {
    id: '5',
    title: 'Estate Sale - Antiques',
    seller: { name: 'Thompson Family', image: null },
    theme: 'ESTATE',
    status: 'upcoming' as const,
    startsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
    itemCount: 50,
    distance: 2.1,
    neighborhood: 'Carroll Gardens',
    previewItems: ['🏛️', '🪞', '🕰️', '💎'],
  },
]

const NEIGHBORHOODS = [
  'All Neighborhoods',
  'Park Slope',
  'Williamsburg',
  'Cobble Hill',
  'Brooklyn Heights',
  'Carroll Gardens',
  'DUMBO',
  'Fort Greene',
]

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming'>('all')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSales = MOCK_SALES.filter(sale => {
    if (filter !== 'all' && sale.status !== filter) return false
    if (neighborhood !== 'All Neighborhoods' && sale.neighborhood !== neighborhood) return false
    if (searchQuery && !sale.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl text-stoop-charcoal mb-2">
          Sales Near You
        </h1>
        <p className="text-stoop-charcoal/60">
          Find treasures in your neighborhood
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stoop-charcoal/40" />
          <input
            type="text"
            placeholder="Search sales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-stoop-charcoal/10 rounded-xl font-body focus:outline-none focus:border-stoop-terracotta transition-colors"
          />
        </div>

        {/* Neighborhood dropdown */}
        <div className="relative">
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-white border-2 border-stoop-charcoal/10 rounded-xl font-display cursor-pointer focus:outline-none focus:border-stoop-terracotta transition-colors"
          >
            {NEIGHBORHOODS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stoop-charcoal/40 pointer-events-none" />
        </div>

        {/* Status filter */}
        <div className="flex bg-white border-2 border-stoop-charcoal/10 rounded-xl overflow-hidden">
          {(['all', 'live', 'upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-display capitalize transition-colors ${
                filter === f
                  ? 'bg-stoop-terracotta text-white'
                  : 'text-stoop-charcoal/60 hover:text-stoop-charcoal hover:bg-stoop-warm/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex bg-white border-2 border-stoop-charcoal/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 transition-colors ${
              viewMode === 'grid'
                ? 'bg-stoop-charcoal text-white'
                : 'text-stoop-charcoal/60 hover:text-stoop-charcoal hover:bg-stoop-warm/30'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-3 transition-colors ${
              viewMode === 'map'
                ? 'bg-stoop-charcoal text-white'
                : 'text-stoop-charcoal/60 hover:text-stoop-charcoal hover:bg-stoop-warm/30'
            }`}
          >
            <MapIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-stoop-charcoal/60 mb-6">
        {filteredSales.length} sale{filteredSales.length !== 1 ? 's' : ''} found
      </p>

      {/* Sales grid */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSales.map((sale) => (
            <Link
              key={sale.id}
              href={`/sale/${sale.id}`}
              className="sale-card block"
            >
              <Card variant="elevated" className="overflow-hidden h-full">
                {/* Preview area with emoji items */}
                <div className="h-40 bg-stoop-warm relative flex items-center justify-center gap-4">
                  {sale.previewItems.map((emoji, i) => (
                    <span
                      key={i}
                      className="text-4xl"
                      style={{
                        transform: `rotate(${(i - 1.5) * 10}deg) translateY(${Math.sin(i) * 10}px)`,
                      }}
                    >
                      {emoji}
                    </span>
                  ))}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={sale.status === 'live' ? 'live' : 'upcoming'}>
                      {sale.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl text-stoop-charcoal mb-1">
                    {sale.title}
                  </h3>
                  <p className="text-sm text-stoop-charcoal/60 mb-4">
                    by {sale.seller.name} · {sale.itemCount} items
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stoop-charcoal/70 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {sale.distance} mi · {sale.neighborhood}
                    </span>
                    <span className="text-stoop-terracotta font-display flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {sale.status === 'live'
                        ? `Ends ${formatTimeUntil(sale.endsAt)}`
                        : `Starts ${formatTimeUntil(sale.startsAt)}`
                      }
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Map view placeholder */
        <div className="h-[600px] bg-stoop-warm/50 rounded-2xl border-2 border-stoop-charcoal/10 flex items-center justify-center">
          <div className="text-center">
            <MapIcon className="w-16 h-16 text-stoop-charcoal/30 mx-auto mb-4" />
            <p className="font-display text-xl text-stoop-charcoal">
              Map View Coming Soon
            </p>
            <p className="text-stoop-charcoal/60">
              Browse sales on an interactive neighborhood map
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredSales.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="font-display text-2xl text-stoop-charcoal mb-2">
            No sales found
          </h3>
          <p className="text-stoop-charcoal/60 mb-6">
            Try adjusting your filters or check back later
          </p>
          <button
            onClick={() => {
              setFilter('all')
              setNeighborhood('All Neighborhoods')
              setSearchQuery('')
            }}
            className="font-display text-stoop-terracotta hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
