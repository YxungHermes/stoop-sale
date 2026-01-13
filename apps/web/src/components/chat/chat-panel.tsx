'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, DollarSign, MessageCircle } from 'lucide-react'
import { Button, Avatar, PriceTag } from '@stoop-sale/ui'

interface Message {
  id: string
  senderId: string
  content: string
  type: 'text' | 'offer'
  offerAmount?: number
  offerStatus?: 'pending' | 'accepted' | 'declined' | 'countered'
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  seller: {
    id: string
    name: string
    image?: string | null
  }
  item?: {
    id: string
    title: string
    price: number
    image?: string
  }
  currentUserId: string
}

// Mock messages
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'buyer-1',
    content: 'Hi! Is this still available?',
    type: 'text',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: '2',
    senderId: 'seller-1',
    content: 'Yes it is! Were you interested?',
    type: 'text',
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
  },
  {
    id: '3',
    senderId: 'buyer-1',
    content: '',
    type: 'offer',
    offerAmount: 35,
    offerStatus: 'pending',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
]

export function ChatPanel({
  isOpen,
  onClose,
  seller,
  item,
  currentUserId,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [showOfferInput, setShowOfferInput] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const sendOffer = () => {
    const amount = parseFloat(offerAmount)
    if (isNaN(amount) || amount <= 0) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: '',
      type: 'offer',
      offerAmount: amount,
      offerStatus: 'pending',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, message])
    setOfferAmount('')
    setShowOfferInput(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l-2 border-stoop-charcoal/10 shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b-2 border-stoop-charcoal/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={seller.name} src={seller.image} size="md" />
              <div>
                <p className="font-display text-stoop-charcoal">{seller.name}</p>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stoop-warm/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-stoop-charcoal/60" />
            </button>
          </div>

          {/* Item context (if chatting about specific item) */}
          {item && (
            <div className="p-3 bg-stoop-warm/30 border-b-2 border-stoop-charcoal/10 flex items-center gap-3">
              <div className="w-12 h-12 bg-stoop-warm rounded-lg overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
                <p className="text-sm text-stoop-charcoal/60">
                  Asking ${item.price}
                </p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isOwn = message.senderId === currentUserId
              const isSeller = message.senderId === seller.id

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.type === 'offer' ? 'w-full max-w-[250px]' : ''
                    }`}
                  >
                    {message.type === 'text' ? (
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          isOwn
                            ? 'bg-stoop-terracotta text-white rounded-br-md'
                            : 'bg-stoop-warm/50 text-stoop-charcoal rounded-bl-md'
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    ) : (
                      // Offer message
                      <div
                        className={`p-4 rounded-2xl border-2 ${
                          isOwn
                            ? 'bg-stoop-terracotta/10 border-stoop-terracotta/30'
                            : 'bg-stoop-sage/10 border-stoop-sage/30'
                        }`}
                      >
                        <p className="text-sm text-stoop-charcoal/60 mb-2">
                          {isOwn ? 'You offered' : `${seller.name} offered`}
                        </p>
                        <p className="font-accent text-3xl text-stoop-charcoal mb-2">
                          ${message.offerAmount}
                        </p>
                        {message.offerStatus === 'pending' && !isOwn && (
                          <div className="flex gap-2">
                            <Button variant="primary" size="sm" className="flex-1">
                              Accept
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1">
                              Counter
                            </Button>
                          </div>
                        )}
                        {message.offerStatus === 'pending' && isOwn && (
                          <p className="text-sm text-stoop-charcoal/60 italic">
                            Waiting for response...
                          </p>
                        )}
                        {message.offerStatus === 'accepted' && (
                          <p className="text-sm text-green-600 font-display">
                            Offer accepted!
                          </p>
                        )}
                        {message.offerStatus === 'declined' && (
                          <p className="text-sm text-red-500 font-display">
                            Offer declined
                          </p>
                        )}
                      </div>
                    )}

                    <p
                      className={`text-xs text-stoop-charcoal/40 mt-1 ${
                        isOwn ? 'text-right' : 'text-left'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t-2 border-stoop-charcoal/10">
            {showOfferInput ? (
              // Offer input
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stoop-charcoal/60">
                    $
                  </span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder={item ? `Asking $${item.price}` : 'Enter amount'}
                    className="w-full pl-8 pr-4 py-3 bg-stoop-warm/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-stoop-terracotta/50"
                    autoFocus
                  />
                </div>
                <Button variant="primary" onClick={sendOffer}>
                  Send Offer
                </Button>
                <button
                  onClick={() => setShowOfferInput(false)}
                  className="p-3 hover:bg-stoop-warm/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-stoop-charcoal/60" />
                </button>
              </div>
            ) : (
              // Regular message input
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOfferInput(true)}
                  className="p-3 bg-stoop-sunshine/50 hover:bg-stoop-sunshine/70 rounded-xl transition-colors"
                  title="Make an offer"
                >
                  <DollarSign className="w-5 h-5 text-stoop-charcoal" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-stoop-warm/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-stoop-terracotta/50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-stoop-terracotta text-white rounded-xl hover:bg-stoop-terracotta/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Quick responses */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {['Is this still available?', 'Would you take $', "Can I see more photos?", 'When can I pick up?'].map(
                (quick) => (
                  <button
                    key={quick}
                    onClick={() => setNewMessage(quick)}
                    className="px-3 py-1.5 bg-stoop-warm/50 rounded-full text-sm text-stoop-charcoal/70 hover:bg-stoop-warm hover:text-stoop-charcoal transition-colors whitespace-nowrap"
                  >
                    {quick}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
