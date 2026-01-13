'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-display text-stoop-charcoal mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5',
            'bg-white',
            'border-2 border-stoop-charcoal/20',
            'rounded-xl',
            'font-body text-stoop-charcoal',
            'placeholder:text-stoop-charcoal/40',
            'transition-all duration-200',
            'focus:outline-none focus:border-stoop-terracotta focus:ring-2 focus:ring-stoop-terracotta/20',
            'hover:border-stoop-charcoal/30',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-body">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-display text-stoop-charcoal mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5',
            'bg-white',
            'border-2 border-stoop-charcoal/20',
            'rounded-xl',
            'font-body text-stoop-charcoal',
            'placeholder:text-stoop-charcoal/40',
            'transition-all duration-200',
            'focus:outline-none focus:border-stoop-terracotta focus:ring-2 focus:ring-stoop-terracotta/20',
            'hover:border-stoop-charcoal/30',
            'resize-none',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-body">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
