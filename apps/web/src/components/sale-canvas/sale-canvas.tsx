'use client'

import { useState, useRef, useCallback, useEffect, type MouseEvent, type TouchEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react'
import { CanvasItem } from './canvas-item'
import { ItemDetailModal } from './item-detail-modal'
import type { CanvasItem as CanvasItemType, CanvasLayout, Position } from '@/lib/types'
import { cn } from '@stoop-sale/ui'

interface SaleCanvasProps {
  items: CanvasItemType[]
  background?: CanvasLayout['background']
  isEditable?: boolean
  onItemMove?: (itemId: string, position: Position) => void
  onItemRotate?: (itemId: string, rotation: number) => void
  onItemScale?: (itemId: string, scale: number) => void
  onItemClick?: (item: CanvasItemType) => void
  className?: string
}

const BACKGROUNDS: Record<CanvasLayout['background'], string> = {
  BLANKET: 'texture-blanket bg-stoop-warm',
  GRASS: 'texture-grass',
  WOOD: 'texture-wood',
  CONCRETE: 'texture-concrete',
  DRIVEWAY: 'bg-gray-400',
  PORCH: 'bg-amber-100',
}

export function SaleCanvas({
  items,
  background = 'BLANKET',
  isEditable = false,
  onItemMove,
  onItemRotate,
  onItemScale,
  onItemClick,
  className,
}: SaleCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 })
  const [selectedItem, setSelectedItem] = useState<CanvasItemType | null>(null)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

  // Drag state for editable mode
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  // Handle zoom
  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 0.25, 0.5))
  }, [])

  const handleResetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  // Handle canvas panning
  const handlePanStart = useCallback((e: MouseEvent | TouchEvent) => {
    if ((e.target as HTMLElement).closest('.canvas-item')) return

    setIsPanning(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setPanStart({ x: clientX - pan.x, y: clientY - pan.y })
  }, [pan])

  const handlePanMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isPanning) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setPan({
      x: clientX - panStart.x,
      y: clientY - panStart.y,
    })
  }, [isPanning, panStart])

  const handlePanEnd = useCallback(() => {
    setIsPanning(false)
  }, [])

  // Handle item dragging (for editable mode)
  const handleItemDragStart = useCallback((itemId: string, e: MouseEvent | TouchEvent) => {
    if (!isEditable) return

    e.stopPropagation()
    setDraggedItemId(itemId)

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const item = items.find((i) => i.id === itemId)
    if (item) {
      setDragStart({ x: clientX, y: clientY })
      setDragOffset({ x: item.positionX, y: item.positionY })
    }
  }, [isEditable, items])

  const handleItemDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedItemId || !isEditable) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const newX = dragOffset.x + (clientX - dragStart.x) / zoom
    const newY = dragOffset.y + (clientY - dragStart.y) / zoom

    onItemMove?.(draggedItemId, { x: newX, y: newY })
  }, [draggedItemId, isEditable, dragOffset, dragStart, zoom, onItemMove])

  const handleItemDragEnd = useCallback(() => {
    setDraggedItemId(null)
  }, [])

  // Handle item click for buyer view
  const handleItemClick = useCallback((item: CanvasItemType) => {
    if (isEditable) return
    setSelectedItem(item)
    onItemClick?.(item)
  }, [isEditable, onItemClick])

  // Global mouse/touch events for drag
  useEffect(() => {
    const handleGlobalMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      handlePanMove(e as unknown as MouseEvent | TouchEvent)
      handleItemDragMove(e as unknown as MouseEvent | TouchEvent)
    }

    const handleGlobalEnd = () => {
      handlePanEnd()
      handleItemDragEnd()
    }

    window.addEventListener('mousemove', handleGlobalMove)
    window.addEventListener('touchmove', handleGlobalMove)
    window.addEventListener('mouseup', handleGlobalEnd)
    window.addEventListener('touchend', handleGlobalEnd)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('touchmove', handleGlobalMove)
      window.removeEventListener('mouseup', handleGlobalEnd)
      window.removeEventListener('touchend', handleGlobalEnd)
    }
  }, [handlePanMove, handleItemDragMove, handlePanEnd, handleItemDragEnd])

  // Wheel zoom
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3))
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {/* Canvas controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-stoop-charcoal/10 shadow-md hover:bg-white transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-stoop-charcoal" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-stoop-charcoal/10 shadow-md hover:bg-white transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-stoop-charcoal" />
        </button>
        <button
          onClick={handleResetView}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-stoop-charcoal/10 shadow-md hover:bg-white transition-colors"
          aria-label="Reset view"
        >
          <RotateCcw className="w-5 h-5 text-stoop-charcoal" />
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border-2 border-stoop-charcoal/10 shadow-md">
        <span className="text-sm font-display text-stoop-charcoal">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* Pan/drag hint */}
      {!isEditable && (
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border-2 border-stoop-charcoal/10 shadow-md">
          <Move className="w-4 h-4 text-stoop-charcoal/60" />
          <span className="text-sm text-stoop-charcoal/60">Drag to pan</span>
        </div>
      )}

      {/* The canvas itself */}
      <div
        ref={canvasRef}
        className={cn(
          'sale-canvas w-full h-full cursor-grab active:cursor-grabbing',
          BACKGROUNDS[background],
          isPanning && 'cursor-grabbing'
        )}
        onMouseDown={handlePanStart}
        onTouchStart={handlePanStart}
      >
        {/* Transformed content container */}
        <div
          className="absolute inset-0 origin-center transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Items on the canvas */}
          <AnimatePresence>
            {items.map((item) => (
              <CanvasItem
                key={item.id}
                item={item}
                isEditable={isEditable}
                isDragging={draggedItemId === item.id}
                isHovered={hoveredItemId === item.id}
                onDragStart={(e) => handleItemDragStart(item.id, e)}
                onClick={() => handleItemClick(item)}
                onHover={() => setHoveredItemId(item.id)}
                onHoverEnd={() => setHoveredItemId(null)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Item detail modal (buyer view) */}
      {selectedItem && !isEditable && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
