'use client'

import { cn, getInitials } from '../lib/utils'

export interface AvatarProps {
  src?: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover',
          'border-2 border-stoop-charcoal/10',
          sizeClasses[size],
          className
        )}
      />
    )
  }

  // Generate a consistent color based on name
  const colors = [
    'bg-stoop-terracotta',
    'bg-stoop-sage',
    'bg-stoop-sky',
    'bg-stoop-sunshine',
    'bg-stoop-wood',
  ]
  const colorIndex = name.charCodeAt(0) % colors.length

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center',
        'border-2 border-stoop-charcoal/10',
        'font-display font-bold text-white',
        colors[colorIndex],
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
