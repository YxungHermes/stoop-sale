import Link from 'next/link'
import { Home, Plus, Settings, LogOut } from 'lucide-react'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stoop-cream">
      {/* Seller Navigation */}
      <header className="border-b-2 border-stoop-charcoal/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="font-display text-xl text-stoop-charcoal">Stoop Sale</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-stoop-charcoal hover:bg-stoop-warm/50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/sell"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display bg-stoop-terracotta text-white hover:bg-stoop-terracotta/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Sale
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
