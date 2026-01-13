import Link from 'next/link'
import { MapPin, Clock, Sparkles, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-2 border-stoop-charcoal/10 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <span className="font-display text-2xl text-stoop-charcoal">Stoop Sale</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/browse"
              className="font-display text-stoop-charcoal hover:text-stoop-terracotta transition-colors"
            >
              Browse Sales
            </Link>
            <Link
              href="/sell"
              className="font-display px-5 py-2 bg-stoop-terracotta text-white rounded-xl border-2 border-stoop-charcoal/20 shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-all hover:-rotate-1"
            >
              Host a Sale
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 text-6xl transform -rotate-12">🧸</div>
          <div className="absolute top-40 right-20 text-5xl transform rotate-6">📚</div>
          <div className="absolute bottom-20 left-1/4 text-4xl transform rotate-12">🪴</div>
          <div className="absolute top-60 left-1/2 text-5xl transform -rotate-6">🎸</div>
          <div className="absolute bottom-40 right-1/3 text-4xl transform rotate-3">🏺</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-stoop-charcoal mb-6 leading-tight">
            Saturday Morning
            <br />
            <span className="text-stoop-terracotta">Treasure Hunting</span>
            <br />
            Comes Online
          </h1>

          <p className="text-xl text-stoop-charcoal/70 mb-8 max-w-2xl mx-auto font-body">
            Discover unique finds at local yard sales. Browse virtual stoops,
            make offers, and find treasures you didn&apos;t know you needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stoop-charcoal text-stoop-chalk font-display text-lg rounded-2xl border-2 border-stoop-charcoal shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.25)] transition-all hover:-rotate-1"
            >
              <MapPin className="w-5 h-5" />
              Find Sales Near You
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stoop-sunshine text-stoop-charcoal font-display text-lg rounded-2xl border-2 border-stoop-charcoal/30 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.15)] transition-all hover:rotate-1"
            >
              <Sparkles className="w-5 h-5" />
              Host Your Sale
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-stoop-warm/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-4xl text-center text-stoop-charcoal mb-16">
            How Stoop Sale Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Sellers */}
            <div className="bg-white rounded-2xl p-8 border-2 border-stoop-charcoal/10 shadow-[6px_6px_0px_rgba(0,0,0,0.08)]">
              <div className="w-16 h-16 bg-stoop-sage rounded-xl flex items-center justify-center mb-6 transform -rotate-3">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="font-display text-2xl text-stoop-charcoal mb-3">
                Set Up Your Stoop
              </h3>
              <p className="text-stoop-charcoal/70">
                Upload photos of your items and arrange them on your virtual blanket.
                Just like setting up a real yard sale, but without the early wake-up.
              </p>
            </div>

            {/* Time Limited */}
            <div className="bg-white rounded-2xl p-8 border-2 border-stoop-charcoal/10 shadow-[6px_6px_0px_rgba(0,0,0,0.08)]">
              <div className="w-16 h-16 bg-stoop-terracotta rounded-xl flex items-center justify-center mb-6 transform rotate-2">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl text-stoop-charcoal mb-3">
                Go Live, Saturday Style
              </h3>
              <p className="text-stoop-charcoal/70">
                Your sale runs for a set window - just like real yard sales.
                This creates urgency and that authentic &ldquo;gotta go now&rdquo; feeling.
              </p>
            </div>

            {/* Browse & Haggle */}
            <div className="bg-white rounded-2xl p-8 border-2 border-stoop-charcoal/10 shadow-[6px_6px_0px_rgba(0,0,0,0.08)]">
              <div className="w-16 h-16 bg-stoop-sky rounded-xl flex items-center justify-center mb-6 transform -rotate-2">
                <Users className="w-8 h-8 text-stoop-charcoal" />
              </div>
              <h3 className="font-display text-2xl text-stoop-charcoal mb-3">
                Browse & Haggle
              </h3>
              <p className="text-stoop-charcoal/70">
                Walk through virtual yards, spot something you like, and make an offer.
                &ldquo;Would you take $5?&rdquo; is encouraged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sales Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-4xl text-stoop-charcoal">
              Happening Now
            </h2>
            <Link
              href="/browse"
              className="font-display text-stoop-terracotta hover:underline"
            >
              View all sales →
            </Link>
          </div>

          {/* Demo sale cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Moving Sale - Everything Must Go!",
                seller: "Sarah M.",
                items: 24,
                distance: "0.3 mi",
                endsIn: "2h 30m",
                emoji: "📦",
              },
              {
                title: "Vintage Vinyl & Books",
                seller: "Marcus T.",
                items: 18,
                distance: "0.8 mi",
                endsIn: "4h 15m",
                emoji: "📚",
              },
              {
                title: "Kids Outgrew Everything",
                seller: "The Johnsons",
                items: 35,
                distance: "1.2 mi",
                endsIn: "5h 45m",
                emoji: "🧸",
              },
            ].map((sale, i) => (
              <div
                key={i}
                className="sale-card bg-white rounded-2xl border-2 border-stoop-charcoal/10 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Sale preview image area */}
                <div className="h-48 bg-stoop-warm relative flex items-center justify-center">
                  <span className="text-6xl">{sale.emoji}</span>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-display font-medium uppercase tracking-wide bg-green-500 text-white animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      Live
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl text-stoop-charcoal mb-2">
                    {sale.title}
                  </h3>
                  <p className="text-sm text-stoop-charcoal/60 mb-4">
                    by {sale.seller} · {sale.items} items
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stoop-charcoal/70">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {sale.distance}
                    </span>
                    <span className="text-stoop-terracotta font-display">
                      Ends in {sale.endsIn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stoop-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl mb-6">
            Ready to find your next treasure?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of neighbors buying and selling the good old-fashioned way.
            No algorithms. No infinite scroll. Just stuff, stories, and good deals.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stoop-sunshine text-stoop-charcoal font-display text-lg rounded-2xl border-2 border-stoop-sunshine shadow-[4px_4px_0px_rgba(255,217,61,0.3)] hover:shadow-[6px_6px_0px_rgba(255,217,61,0.4)] transition-all hover:-rotate-1"
          >
            Start Browsing
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-2 border-stoop-charcoal/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              <span className="font-display text-xl text-stoop-charcoal">Stoop Sale</span>
            </div>
            <p className="text-stoop-charcoal/60 text-sm">
              Made with love for Saturday mornings everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
