'use client'

import { cn, formatPrice } from '../lib/utils'

export interface PriceTagProps {
  price: number
  isOBO?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  rotation?: number
}

export function PriceTag({
  price,
  isOBO = false,
  size = 'md',
  className,
  rotation = 0,
}: PriceTagProps) {
  // Slight random rotation for hand-placed feel
  const tagRotation = rotation || (Math.random() * 6 - 3)

  return (
    <div
      className={cn(
        // Base tag styles - like a hand-written price sticker
        'inline-flex flex-col items-center justify-center',
        'bg-stoop-sunshine',
        'border-2 border-stoop-charcoal/30',
        'shadow-price-tag',
        'font-handwritten',

        // Slight imperfect shape
        'rounded-sm',

        // Sizes
        {
          'sm': 'px-2 py-1 text-lg',
          'md': 'px-3 py-1.5 text-2xl',
          'lg': 'px-4 py-2 text-3xl',
        }[size],

        className
      )}
      style={{
        transform: `rotate(${tagRotation}deg)`,
        // Paper texture feel
        background: 'linear-gradient(135deg, #FFD93D 0%, #FFED4A 50%, #FFD93D 100%)',
      }}
    >
      <span className="text-stoop-charcoal font-bold leading-none">
        {formatPrice(price)}
      </span>
      {isOBO && (
        <span className="text-stoop-charcoal/70 text-xs mt-0.5 uppercase tracking-wide">
          obo
        </span>
      )}
    </div>
  )
}
