'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, PriceTag, Badge } from '@stoop-sale/ui'
import type { CanvasItem } from '@/lib/types'

interface ItemDetailModalProps {
  item: CanvasItem
  onClose: () => void
  onMakeOffer?: (amount: number) => void
  onSave?: () => void
  onMessage?: () => void
}

export function ItemDetailModal({
  item,
  onClose,
  onMakeOffer,
  onSave,
  onMessage,
}: ItemDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [offerAmount, setOfferAmount] = useState('')
  const [showOfferInput, setShowOfferInput] = useState(false)

  const hasMultipleImages = item.images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((i) => (i + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((i) => (i - 1 + item.images.length) % item.images.length)
  }

  const handleMakeOffer = () => {
    const amount = parseFloat(offerAmount)
    if (!isNaN(amount) && amount > 0) {
      onMakeOffer?.(amount)
      setShowOfferInput(false)
      setOfferAmount('')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-stoop-charcoal/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image gallery */}
          <div className="relative aspect-square bg-stoop-warm">
            {item.images[0] ? (
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl">📦</span>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-stoop-charcoal" />
            </button>

            {/* Save/heart button */}
            <button
              onClick={onSave}
              className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart className="w-5 h-5 text-stoop-terracotta" />
            </button>

            {/* Image navigation */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-stoop-charcoal" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-stoop-charcoal" />
                </button>

                {/* Image dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {item.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Status badge */}
            {item.status !== 'AVAILABLE' && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <Badge variant={item.status === 'SOLD' ? 'sold' : 'upcoming'}>
                  {item.status}
                </Badge>
              </div>
            )}
          </div>

          {/* Item details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-2xl text-stoop-charcoal mb-1">
                  {item.title}
                </h2>
                {item.category && (
                  <span className="text-sm text-stoop-charcoal/60">
                    {item.category}
                  </span>
                )}
              </div>
              <PriceTag price={item.price} isOBO={item.isOBO} size="md" />
            </div>

            {item.description && (
              <p className="text-stoop-charcoal/70 mb-6">
                {item.description}
              </p>
            )}

            {/* Actions */}
            {item.status === 'AVAILABLE' && (
              <div className="space-y-3">
                {!showOfferInput ? (
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => setShowOfferInput(true)}
                    >
                      Make an Offer
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={onMessage}
                      className="px-4"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stoop-charcoal/60">
                        $
                      </span>
                      <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder={`Asking: $${item.price}`}
                        className="w-full pl-8 pr-4 py-2.5 border-2 border-stoop-charcoal/20 rounded-xl focus:outline-none focus:border-stoop-terracotta"
                        autoFocus
                      />
                    </div>
                    <Button variant="primary" onClick={handleMakeOffer}>
                      Send
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowOfferInput(false)
                        setOfferAmount('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {item.isOBO && !showOfferInput && (
                  <p className="text-center text-sm text-stoop-charcoal/60 font-handwritten text-lg">
                    &ldquo;Or Best Offer&rdquo; - don&apos;t be shy!
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
