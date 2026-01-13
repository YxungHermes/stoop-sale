'use client'

import { cn } from '../lib/utils'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'live' | 'upcoming' | 'ended' | 'sold'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'px-2.5 py-1 rounded-full',
        'text-xs font-display font-medium uppercase tracking-wide',

        {
          'default': 'bg-stoop-warm text-stoop-charcoal',
          'live': [
            'bg-green-500 text-white',
            'animate-pulse',
          ],
          'upcoming': 'bg-stoop-sky text-stoop-charcoal',
          'ended': 'bg-gray-200 text-gray-600',
          'sold': 'bg-stoop-terracotta text-white',
        }[variant],

        className
      )}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 bg-white rounded-full" />
      )}
      {children}
    </span>
  )
}
