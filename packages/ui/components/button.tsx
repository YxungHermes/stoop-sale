'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'chalk'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles - hand-drawn feel
          'relative inline-flex items-center justify-center font-display',
          'transition-all duration-200 ease-out',
          'active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Slight rotation for hand-drawn feel
          'hover:-rotate-1',

          // Variants
          {
            // Primary - warm terracotta
            'primary': [
              'bg-stoop-terracotta text-white',
              'border-2 border-stoop-charcoal/20',
              'shadow-[3px_3px_0px_rgba(0,0,0,0.2)]',
              'hover:shadow-[4px_4px_0px_rgba(0,0,0,0.25)]',
              'hover:bg-stoop-terracotta/90',
            ],
            // Secondary - sage green
            'secondary': [
              'bg-stoop-sage text-white',
              'border-2 border-stoop-charcoal/20',
              'shadow-[3px_3px_0px_rgba(0,0,0,0.15)]',
              'hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]',
              'hover:bg-stoop-sage/90',
            ],
            // Ghost
            'ghost': [
              'bg-transparent text-stoop-charcoal',
              'border-2 border-dashed border-stoop-charcoal/30',
              'hover:border-stoop-charcoal/50',
              'hover:bg-stoop-warm/30',
            ],
            // Chalk - like writing on a chalkboard price sign
            'chalk': [
              'bg-stoop-charcoal text-stoop-chalk',
              'border-2 border-stoop-charcoal',
              'shadow-[2px_2px_0px_rgba(0,0,0,0.3)]',
              'font-handwritten text-lg',
            ],
          }[variant],

          // Sizes
          {
            'sm': 'px-3 py-1.5 text-sm rounded-lg',
            'md': 'px-5 py-2.5 text-base rounded-xl',
            'lg': 'px-7 py-3.5 text-lg rounded-2xl',
          }[size],

          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
