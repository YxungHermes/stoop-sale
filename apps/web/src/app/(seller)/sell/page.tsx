'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Clock, ChevronRight, Sparkles } from 'lucide-react'
import { Button, Input, Textarea, Card } from '@stoop-sale/ui'

const SALE_THEMES = [
  { id: 'GENERAL', label: 'General', emoji: '🏠', description: 'A bit of everything' },
  { id: 'MOVING', label: 'Moving Sale', emoji: '📦', description: 'Everything must go!' },
  { id: 'VINTAGE', label: 'Vintage', emoji: '📻', description: 'Retro and antique finds' },
  { id: 'KIDS', label: 'Kids & Baby', emoji: '🧸', description: 'Toys, clothes, gear' },
  { id: 'ESTATE', label: 'Estate Sale', emoji: '🏛️', description: 'Whole home clearout' },
  { id: 'ELECTRONICS', label: 'Electronics', emoji: '📱', description: 'Gadgets and tech' },
  { id: 'BOOKS', label: 'Books & Media', emoji: '📚', description: 'Books, vinyl, movies' },
  { id: 'FURNITURE', label: 'Furniture', emoji: '🛋️', description: 'Big and small pieces' },
]

const CANVAS_BACKGROUNDS = [
  { id: 'BLANKET', label: 'Blanket', preview: 'bg-stoop-warm' },
  { id: 'GRASS', label: 'Lawn', preview: 'bg-stoop-sage' },
  { id: 'WOOD', label: 'Table', preview: 'bg-stoop-wood' },
  { id: 'CONCRETE', label: 'Driveway', preview: 'bg-gray-400' },
  { id: 'PORCH', label: 'Porch', preview: 'bg-amber-100' },
]

export default function CreateSalePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: 'GENERAL',
    background: 'BLANKET',
    address: '',
    city: '',
    date: '',
    startTime: '09:00',
    endTime: '14:00',
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCreate = () => {
    // In a real app, this would create the sale via API
    // For now, just redirect to the edit page
    router.push('/sell/new/edit')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg transition-all ${
                s === step
                  ? 'bg-stoop-terracotta text-white scale-110'
                  : s < step
                  ? 'bg-stoop-sage text-white'
                  : 'bg-stoop-warm text-stoop-charcoal/50'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 mx-1 rounded ${
                  s < step ? 'bg-stoop-sage' : 'bg-stoop-warm'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-stoop-charcoal mb-2">
              Let&apos;s set up your sale
            </h1>
            <p className="text-stoop-charcoal/60">
              First, give it a name and tell people what to expect
            </p>
          </div>

          <Input
            label="Sale Title"
            placeholder="e.g., Moving Sale - Everything Must Go!"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            placeholder="Tell buyers what kind of stuff you're selling..."
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
          />

          {/* Theme selection */}
          <div>
            <label className="block text-sm font-display text-stoop-charcoal mb-3">
              What kind of sale is this?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SALE_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateField('theme', theme.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.theme === theme.id
                      ? 'border-stoop-terracotta bg-stoop-terracotta/10'
                      : 'border-stoop-charcoal/10 hover:border-stoop-charcoal/30 bg-white'
                  }`}
                >
                  <span className="text-2xl mb-1 block">{theme.emoji}</span>
                  <span className="font-display text-stoop-charcoal block">{theme.label}</span>
                  <span className="text-xs text-stoop-charcoal/60">{theme.description}</span>
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" className="w-full" onClick={handleNext}>
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Location & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-stoop-charcoal mb-2">
              When and where?
            </h1>
            <p className="text-stoop-charcoal/60">
              This helps buyers find your sale
            </p>
          </div>

          <div className="bg-stoop-warm/30 rounded-xl p-4 mb-6">
            <p className="font-display text-stoop-charcoal flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-stoop-terracotta" />
              Pro tip: Saturday mornings are the most popular!
            </p>
          </div>

          <Input
            label="Address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
          />

          <Input
            label="City"
            placeholder="Brooklyn, NY"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
            <Input
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) => updateField('startTime', e.target.value)}
            />
            <Input
              label="End Time"
              type="time"
              value={formData.endTime}
              onChange={(e) => updateField('endTime', e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={handleBack}>
              Back
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleNext}>
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Canvas Style */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-stoop-charcoal mb-2">
              Choose your setup
            </h1>
            <p className="text-stoop-charcoal/60">
              Pick a background for your virtual yard sale
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CANVAS_BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => updateField('background', bg.id)}
                className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all ${bg.preview} ${
                  formData.background === bg.id
                    ? 'border-stoop-terracotta ring-4 ring-stoop-terracotta/30 scale-105'
                    : 'border-stoop-charcoal/10 hover:border-stoop-charcoal/30'
                }`}
              >
                <span className="font-display text-lg text-stoop-charcoal bg-white/80 px-3 py-1 rounded-lg">
                  {bg.label}
                </span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-8">
            <p className="text-sm font-display text-stoop-charcoal/60 mb-3">Preview:</p>
            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">
                  {SALE_THEMES.find(t => t.id === formData.theme)?.emoji}
                </div>
                <div>
                  <h3 className="font-display text-xl text-stoop-charcoal">
                    {formData.title || 'Your Sale Title'}
                  </h3>
                  <p className="text-sm text-stoop-charcoal/60">
                    {formData.city || 'Your City'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-stoop-charcoal/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formData.date || 'Date TBD'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formData.startTime} - {formData.endTime}
                </span>
              </div>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={handleBack}>
              Back
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleCreate}>
              Create Sale
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
