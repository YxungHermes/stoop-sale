// Core types for Stoop Sale

export interface CanvasItem {
  id: string
  title: string
  price: number
  isOBO: boolean
  images: string[]
  positionX: number
  positionY: number
  rotation: number
  scale: number
  status: 'AVAILABLE' | 'PENDING' | 'SOLD' | 'REMOVED'
  description?: string
  category?: string
}

export interface CanvasLayout {
  items: CanvasItem[]
  background: 'BLANKET' | 'GRASS' | 'WOOD' | 'CONCRETE' | 'DRIVEWAY' | 'PORCH'
  width: number
  height: number
}

export interface Sale {
  id: string
  title: string
  description?: string
  theme: string
  startsAt: Date
  endsAt: Date
  isLive: boolean
  address?: string
  city: string
  neighborhood?: string
  latitude: number
  longitude: number
  canvasLayout?: CanvasLayout
  seller: {
    id: string
    name: string
    image?: string
  }
  items: CanvasItem[]
  viewCount: number
}

export interface Position {
  x: number
  y: number
}

export interface DragState {
  isDragging: boolean
  itemId: string | null
  startPosition: Position
  currentPosition: Position
}
