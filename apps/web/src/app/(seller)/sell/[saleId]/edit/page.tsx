'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Save, Eye, Trash2, RotateCw, ZoomIn, ZoomOut, Upload } from 'lucide-react'
import { SaleCanvas } from '@/components/sale-canvas'
import { Button, Input, PriceTag } from '@stoop-sale/ui'
import type { CanvasItem, Position } from '@/lib/types'

// Mock initial items for demo
const MOCK_ITEMS: CanvasItem[] = [
  {
    id: '1',
    title: 'Vintage Record Player',
    price: 45,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'],
    positionX: 100,
    positionY: 150,
    rotation: -5,
    scale: 1.2,
    status: 'AVAILABLE',
    description: 'Works great, just needs a new needle.',
  },
  {
    id: '2',
    title: 'Stack of Books',
    price: 10,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop'],
    positionX: 350,
    positionY: 200,
    rotation: 3,
    scale: 0.9,
    status: 'AVAILABLE',
    description: 'Various fiction and non-fiction.',
  },
  {
    id: '3',
    title: 'Ceramic Vase',
    price: 15,
    isOBO: false,
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&h=300&fit=crop'],
    positionX: 500,
    positionY: 120,
    rotation: -2,
    scale: 1,
    status: 'AVAILABLE',
    description: 'Hand-painted, perfect condition.',
  },
  {
    id: '4',
    title: 'Kids Bicycle',
    price: 35,
    isOBO: true,
    images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=300&h=300&fit=crop'],
    positionX: 200,
    positionY: 350,
    rotation: 8,
    scale: 1.3,
    status: 'AVAILABLE',
    description: 'Great condition, fits ages 5-8.',
  },
]

export default function EditSalePage() {
  const [items, setItems] = useState<CanvasItem[]>(MOCK_ITEMS)
  const [selectedItem, setSelectedItem] = useState<CanvasItem | null>(null)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    description: '',
    isOBO: true,
  })

  // Handle item movement on canvas
  const handleItemMove = useCallback((itemId: string, position: Position) => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, positionX: position.x, positionY: position.y }
        : item
    ))
  }, [])

  // Handle item rotation
  const handleRotateItem = useCallback((itemId: string, direction: 'cw' | 'ccw') => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, rotation: item.rotation + (direction === 'cw' ? 15 : -15) }
        : item
    ))
  }, [])

  // Handle item scale
  const handleScaleItem = useCallback((itemId: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, scale: Math.max(0.5, Math.min(2, item.scale + delta)) }
        : item
    ))
  }, [])

  // Handle item deletion
  const handleDeleteItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
    setSelectedItem(null)
  }, [])

  // Add new item
  const handleAddItem = useCallback(() => {
    if (!newItem.title || !newItem.price) return

    const item: CanvasItem = {
      id: Date.now().toString(),
      title: newItem.title,
      price: parseFloat(newItem.price),
      isOBO: newItem.isOBO,
      description: newItem.description,
      images: [],
      positionX: 200 + Math.random() * 200,
      positionY: 200 + Math.random() * 200,
      rotation: Math.random() * 10 - 5,
      scale: 1,
      status: 'AVAILABLE',
    }

    setItems(prev => [...prev, item])
    setNewItem({ title: '', price: '', description: '', isOBO: true })
    setShowAddItem(false)
  }, [newItem])

  return (
    <div className="h-[calc(100vh-65px)] flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r-2 border-stoop-charcoal/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-stoop-charcoal/10">
          <h2 className="font-display text-xl text-stoop-charcoal mb-1">
            Arrange Your Sale
          </h2>
          <p className="text-sm text-stoop-charcoal/60">
            Drag items to position them on your blanket
          </p>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-stoop-charcoal">
              Items ({items.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddItem(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Add item form */}
          {showAddItem && (
            <div className="mb-4 p-4 bg-stoop-warm/30 rounded-xl space-y-3">
              <Input
                placeholder="Item name"
                value={newItem.title}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                  className="flex-1"
                />
                <label className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border-2 border-stoop-charcoal/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isOBO}
                    onChange={(e) => setNewItem(prev => ({ ...prev, isOBO: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">OBO</span>
                </label>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1" onClick={handleAddItem}>
                  Add Item
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowAddItem(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  selectedItem?.id === item.id
                    ? 'bg-stoop-terracotta/10 border-2 border-stoop-terracotta'
                    : 'bg-stoop-warm/30 border-2 border-transparent hover:border-stoop-charcoal/20'
                }`}
              >
                <div className="w-12 h-12 bg-stoop-warm rounded-lg overflow-hidden shrink-0">
                  {item.images[0] ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl">📦</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm text-stoop-charcoal truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-stoop-charcoal/60">
                    ${item.price} {item.isOBO && '(OBO)'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected item controls */}
        {selectedItem && (
          <div className="p-4 border-t-2 border-stoop-charcoal/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-stoop-charcoal truncate flex-1">
                {selectedItem.title}
              </h4>
              <button
                onClick={() => handleDeleteItem(selectedItem.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rotation controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stoop-charcoal/60 w-16">Rotate:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleRotateItem(selectedItem.id, 'ccw')}
                  className="p-2 bg-stoop-warm/50 rounded-lg hover:bg-stoop-warm transition-colors"
                >
                  <RotateCw className="w-4 h-4 transform -scale-x-100" />
                </button>
                <button
                  onClick={() => handleRotateItem(selectedItem.id, 'cw')}
                  className="p-2 bg-stoop-warm/50 rounded-lg hover:bg-stoop-warm transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-stoop-charcoal/40">
                {Math.round(selectedItem.rotation)}°
              </span>
            </div>

            {/* Scale controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stoop-charcoal/60 w-16">Size:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleScaleItem(selectedItem.id, -0.1)}
                  className="p-2 bg-stoop-warm/50 rounded-lg hover:bg-stoop-warm transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScaleItem(selectedItem.id, 0.1)}
                  className="p-2 bg-stoop-warm/50 rounded-lg hover:bg-stoop-warm transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-stoop-charcoal/40">
                {Math.round(selectedItem.scale * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 border-t-2 border-stoop-charcoal/10 space-y-2">
          <Button variant="primary" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Link href="/browse" className="block">
            <Button variant="ghost" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview Sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 bg-stoop-cream">
        <SaleCanvas
          items={items}
          background="BLANKET"
          isEditable={true}
          onItemMove={handleItemMove}
        />
      </div>
    </div>
  )
}
