'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Calendar, Eye, DollarSign, Package, Clock, ChevronRight } from 'lucide-react'
import { Badge } from '@stoop-sale/ui'
import { formatTimeUntil } from '@stoop-sale/ui'

// Mock data for demo
const mockSales = [
  {
    id: '1',
    title: 'Moving Sale - Everything Must Go!',
    status: 'live' as const,
    startsAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    itemCount: 24,
    viewCount: 156,
    revenue: 85,
  },
  {
    id: '2',
    title: 'Vintage Collection',
    status: 'upcoming' as const,
    startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
    itemCount: 12,
    viewCount: 0,
    revenue: 0,
  },
  {
    id: '3',
    title: 'Spring Cleaning Sale',
    status: 'ended' as const,
    startsAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endsAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
    itemCount: 18,
    viewCount: 243,
    revenue: 210,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all')

  const filteredSales = activeTab === 'all'
    ? mockSales
    : mockSales.filter(sale => sale.status === activeTab)

  const stats = {
    totalViews: mockSales.reduce((sum, s) => sum + s.viewCount, 0),
    totalRevenue: mockSales.reduce((sum, s) => sum + s.revenue, 0),
    activeSales: mockSales.filter(s => s.status === 'live').length,
    totalItems: mockSales.reduce((sum, s) => sum + s.itemCount, 0),
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-stoop-charcoal mb-2">
            Your Stoop
          </h1>
          <p className="text-stoop-charcoal/60">
            Manage your sales and see how they&apos;re doing
          </p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 px-6 py-3 bg-stoop-terracotta text-white rounded-xl font-display border-2 border-stoop-charcoal/20 shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-all hover:-rotate-1"
        >
          <Plus className="w-5 h-5" />
          New Sale
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-stoop-sky/30 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-stoop-charcoal" />
            </div>
          </div>
          <p className="font-display text-2xl text-stoop-charcoal">{stats.totalViews}</p>
          <p className="text-sm text-stoop-charcoal/60">Total Views</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-stoop-sage/30 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-stoop-charcoal" />
            </div>
          </div>
          <p className="font-display text-2xl text-stoop-charcoal">${stats.totalRevenue}</p>
          <p className="text-sm text-stoop-charcoal/60">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-stoop-terracotta/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-stoop-charcoal" />
            </div>
          </div>
          <p className="font-display text-2xl text-stoop-charcoal">{stats.activeSales}</p>
          <p className="text-sm text-stoop-charcoal/60">Active Sales</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-stoop-sunshine/30 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-stoop-charcoal" />
            </div>
          </div>
          <p className="font-display text-2xl text-stoop-charcoal">{stats.totalItems}</p>
          <p className="text-sm text-stoop-charcoal/60">Items Listed</p>
        </div>
      </div>

      {/* Sales tabs and list */}
      <div className="bg-white rounded-2xl border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b-2 border-stoop-charcoal/10">
          {(['all', 'live', 'upcoming', 'ended'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-display capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-stoop-warm/50 text-stoop-charcoal border-b-2 border-stoop-terracotta -mb-[2px]'
                  : 'text-stoop-charcoal/60 hover:text-stoop-charcoal hover:bg-stoop-warm/20'
              }`}
            >
              {tab}
              {tab === 'live' && mockSales.filter(s => s.status === 'live').length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-green-500 text-white rounded-full">
                  {mockSales.filter(s => s.status === 'live').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sales list */}
        <div className="divide-y divide-stoop-charcoal/10">
          {filteredSales.length === 0 ? (
            <div className="p-12 text-center">
              <span className="text-5xl mb-4 block">📦</span>
              <p className="font-display text-xl text-stoop-charcoal mb-2">
                No {activeTab === 'all' ? '' : activeTab} sales yet
              </p>
              <p className="text-stoop-charcoal/60 mb-6">
                Ready to host your first yard sale?
              </p>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stoop-terracotta text-white rounded-xl font-display"
              >
                <Plus className="w-5 h-5" />
                Create a Sale
              </Link>
            </div>
          ) : (
            filteredSales.map((sale) => (
              <Link
                key={sale.id}
                href={`/sell/${sale.id}/edit`}
                className="flex items-center gap-6 p-6 hover:bg-stoop-warm/20 transition-colors group"
              >
                {/* Sale preview thumbnail */}
                <div className="w-20 h-20 bg-stoop-warm rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-3xl">
                    {sale.status === 'live' ? '🔴' : sale.status === 'upcoming' ? '📅' : '✅'}
                  </span>
                </div>

                {/* Sale info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-lg text-stoop-charcoal truncate">
                      {sale.title}
                    </h3>
                    <Badge
                      variant={
                        sale.status === 'live' ? 'live' :
                        sale.status === 'upcoming' ? 'upcoming' : 'ended'
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stoop-charcoal/60">
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {sale.itemCount} items
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {sale.viewCount} views
                    </span>
                    {sale.revenue > 0 && (
                      <span className="flex items-center gap-1 text-stoop-sage">
                        <DollarSign className="w-4 h-4" />
                        ${sale.revenue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Time info */}
                <div className="text-right shrink-0">
                  {sale.status === 'live' && (
                    <p className="text-sm text-stoop-terracotta font-display">
                      Ends in {formatTimeUntil(sale.endsAt)}
                    </p>
                  )}
                  {sale.status === 'upcoming' && (
                    <p className="text-sm text-stoop-charcoal/60">
                      Starts in {formatTimeUntil(sale.startsAt)}
                    </p>
                  )}
                </div>

                <ChevronRight className="w-5 h-5 text-stoop-charcoal/30 group-hover:text-stoop-charcoal/60 transition-colors" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
