'use client'

import { type MouseEvent, type TouchEvent } from 'react'
import { motion } from 'framer-motion'
import { PriceTag } from '@stoop-sale/ui'
import type { CanvasItem as CanvasItemType } from '@/lib/types'
import { cn } from '@stoop-sale/ui'

interface CanvasItemProps {
  item: CanvasItemType
  isEditable?: boolean
  isDragging?: boolean
  isHovered?: boolean
  onDragStart?: (e: MouseEvent | TouchEvent) => void
  onClick?: () => void
  onHover?: () => void
  onHoverEnd?: () => void
}

export function CanvasItem({
  item,
  isEditable = false,
  isDragging = false,
  isHovered = false,
  onDragStart,
  onClick,
  onHover,
  onHoverEnd,
}: CanvasItemProps) {
  const isSold = item.status === 'SOLD'
  const isPending = item.status === 'PENDING'

  // Calculate size based on scale
  const baseSize = 120 // Base size in pixels
  const size = baseSize * item.scale

  return (
    <motion.div
      className={cn(
        'canvas-item',
        isDragging && 'dragging',
        isEditable && 'cursor-move',
        !isEditable && 'cursor-pointer',
        isSold && 'opacity-50 grayscale'
      )}
      style={{
        left: item.positionX,
        top: item.positionY,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: item.rotation,
        zIndex: isDragging ? 1000 : isHovered ? 100 : 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={!isEditable ? { scale: 1.05 } : undefined}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {/* Item image */}
      <div
        className={cn(
          'relative w-full h-full rounded-lg overflow-hidden',
          'border-2 border-white/50',
          'shadow-lg',
          isHovered && !isEditable && 'ring-4 ring-stoop-terracotta/50'
        )}
      >
        {item.images[0] ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          // Placeholder for items without images
          <div className="w-full h-full bg-stoop-warm flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="font-handwritten text-2xl text-white transform -rotate-12 bg-red-500 px-3 py-1 rounded">
              SOLD!
            </span>
          </div>
        )}

        {/* Pending overlay */}
        {isPending && (
          <div className="absolute inset-0 bg-yellow-500/30 flex items-center justify-center">
            <span className="font-handwritten text-lg text-stoop-charcoal transform rotate-6 bg-stoop-sunshine px-2 py-0.5 rounded">
              Pending
            </span>
          </div>
        )}

        {/* Edit mode indicator */}
        {isEditable && (
          <div className="absolute top-1 right-1 w-6 h-6 bg-stoop-charcoal/80 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        )}
      </div>

      {/* Price tag - positioned slightly offset for that hand-placed look */}
      <div
        className="absolute -bottom-2 -right-2"
        style={{
          transform: `rotate(${Math.random() * 10 - 5}deg)`,
        }}
      >
        <PriceTag
          price={item.price}
          isOBO={item.isOBO}
          size="sm"
        />
      </div>

      {/* Item title on hover (buyer mode) */}
      {isHovered && !isEditable && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <div className="px-3 py-1.5 bg-white rounded-lg shadow-lg border-2 border-stoop-charcoal/10">
            <span className="font-display text-sm text-stoop-charcoal">
              {item.title}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
