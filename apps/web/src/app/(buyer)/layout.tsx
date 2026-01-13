import Link from 'next/link'
import { MapPin, Compass, Heart, User } from 'lucide-react'

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stoop-cream">
      {/* Buyer Navigation */}
      <header className="border-b-2 border-stoop-charcoal/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="font-display text-xl text-stoop-charcoal">Stoop Sale</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/browse"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-stoop-charcoal hover:bg-stoop-warm/50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Browse
            </Link>
            <Link
              href="/discover"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-stoop-charcoal hover:bg-stoop-warm/50 transition-colors"
            >
              <Compass className="w-4 h-4" />
              Discover
            </Link>
            <Link
              href="/saved"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-stoop-charcoal hover:bg-stoop-warm/50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Saved
            </Link>
            <Link
              href="/sell"
              className="flex items-center gap-2 px-4 py-2 ml-2 rounded-xl font-display bg-stoop-terracotta text-white hover:bg-stoop-terracotta/90 transition-colors"
            >
              Host a Sale
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
