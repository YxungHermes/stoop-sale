'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden',
          'transition-all duration-200',

          {
            'default': [
              'bg-white',
              'border-2 border-stoop-charcoal/10',
              'shadow-[4px_4px_0px_rgba(0,0,0,0.08)]',
            ],
            'elevated': [
              'bg-white',
              'border-2 border-stoop-charcoal/15',
              'shadow-[6px_6px_0px_rgba(0,0,0,0.12)]',
              'hover:shadow-[8px_8px_0px_rgba(0,0,0,0.15)]',
              'hover:-translate-y-0.5',
            ],
            'outlined': [
              'bg-transparent',
              'border-2 border-dashed border-stoop-charcoal/30',
            ],
          }[variant],

          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 pb-2', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 pt-0', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 pt-2 border-t border-stoop-charcoal/10', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'
