# Stoop Sale

**Saturday morning treasure hunting, online.**

A virtual yard sale platform that captures the magic of real yard sales - discovery, serendipity, and the hunt.

## The Vision

Current marketplace apps kill the yard sale experience. They're Amazon-ified grids with search bars. Stoop Sale is different:

- **Visual browsing** - Items arranged on virtual blankets, not sterile grids
- **Time-limited sales** - Like real yard sales, they happen during a window
- **Discovery over search** - The "Endless Table" lets you stumble onto treasures
- **Haggle-friendly** - "Would you take $5?" is encouraged
- **Neighborhood-focused** - Browse sales in your area

## Features

### For Sellers
- Create time-limited sales with custom themes
- Visually arrange items on a canvas (blanket, grass, wood table, etc.)
- Drag, rotate, and scale items for that authentic yard sale look
- Set prices with optional "Or Best Offer" (OBO)
- Receive and respond to offers in real-time

### For Buyers
- Browse active and upcoming sales near you
- Explore the "Endless Table" - items from multiple sales, mixed together
- Click items to see details and make offers
- Chat with sellers and negotiate
- Save items to your wishlist

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS with custom hand-drawn aesthetic
- **Animation**: Framer Motion
- **Monorepo**: npm workspaces

## Project Structure

\`\`\`
/stoop-sale
├── apps/
│   └── web/                    # Next.js app
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   │   ├── (auth)/     # Auth pages
│       │   │   ├── (buyer)/    # Browse, discover, sale view
│       │   │   └── (seller)/   # Dashboard, create/edit sales
│       │   ├── components/
│       │   │   ├── sale-canvas/  # THE key component
│       │   │   └── chat/         # Messaging/haggling
│       │   └── lib/
│       └── ...
├── packages/
│   ├── db/                     # Prisma schema & client
│   └── ui/                     # Shared UI components
└── ...
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/stoop-sale.git
cd stoop-sale
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your values
\`\`\`

4. Set up the database:
\`\`\`bash
npm run db:push
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Key Components

### SaleCanvas

The heart of the product. A freeform canvas where:
- Sellers drag, rotate, and arrange items visually
- Buyers pan, zoom, and click to explore
- Items have price tags positioned with slight rotation for authenticity

### Endless Table

The discovery feed - items from nearby sales mixed together. No search bar, no categories. Just scroll and stumble onto things you didn't know you needed.

### Chat/Haggle System

Real-time messaging with built-in offer functionality. Quick replies like "Would you take $5?" make negotiation feel natural.

## Design Philosophy

- **Hand-drawn aesthetic** - Custom fonts, slight rotations, soft shadows
- **Warm colors** - Cream, terracotta, sage, sunshine yellow
- **Personality** - Sale themes, seller bios, casual copy
- **Mobile-first** - Works great on Saturday morning walks

## Roadmap

- [ ] Map view for browsing
- [ ] Real-time notifications
- [ ] Image upload with optimization
- [ ] Stripe integration for optional payments
- [ ] Mobile app (React Native)
- [ ] Seller analytics dashboard

## Contributing

This is currently a solo project, but contributions are welcome! Feel free to open issues or PRs.

## License

MIT

---

*Made with love for Saturday mornings everywhere.*
