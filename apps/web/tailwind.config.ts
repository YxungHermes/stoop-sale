import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, sunny Saturday morning vibes
        stoop: {
          cream: '#FDF8F3',
          warm: '#F5E6D3',
          terracotta: '#C4846C',
          sage: '#87A878',
          sky: '#87CEEB',
          sunshine: '#FFD93D',
          wood: '#8B7355',
          chalk: '#FEFEFE',
          charcoal: '#2D3436',
        },
      },
      fontFamily: {
        // Refined, elegant marketplace feel
        display: ['var(--font-display)', 'DM Serif Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'blanket-pattern': "url('/textures/blanket.png')",
        'grass-pattern': "url('/textures/grass.png')",
        'wood-pattern': "url('/textures/wood.png')",
        'concrete-pattern': "url('/textures/concrete.png')",
      },
      boxShadow: {
        'price-tag': '2px 2px 0px rgba(0,0,0,0.1)',
        'item-hover': '0 8px 30px rgba(0,0,0,0.12)',
      },
      animation: {
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'hand-wave': 'hand-wave 0.5s ease-in-out',
      },
      keyframes: {
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'hand-wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
