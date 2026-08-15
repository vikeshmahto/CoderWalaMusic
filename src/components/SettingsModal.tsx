'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Video } from 'lucide-react'

export const PRESET_WALLPAPERS = [
  {
    id: 'video',
    label: 'Default Video',
    url: null,
    thumb: null,
  },
  {
    id: 'ghibli-night',
    label: 'Ghibli Night',
    url: '/the-night-doesn-t-shine-she-does-follow-ghibliglimmers-for-m.jpg',
    thumb: '/the-night-doesn-t-shine-she-does-follow-ghibliglimmers-for-m.jpg',
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk City',
    url: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=400&q=70',
  },
  {
    id: 'tokyo',
    label: 'Tokyo Night',
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70',
  },
  {
    id: 'mountain',
    label: 'Mountain Sunset',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70',
  },
  {
    id: 'galaxy',
    label: 'Galaxy',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=70',
  },
  {
    id: 'forest',
    label: 'Forest Path',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=70',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=70',
  },
  {
    id: 'raincity',
    label: 'Rainy City',
    url: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=70',
  },
  {
    id: 'desert',
    label: 'Desert Dusk',
    url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=70',
  },
  {
    id: 'ocean',
    label: 'Ocean Wave',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70',
  },
  {
    id: 'neon',
    label: 'Neon Street',
    url: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=400&q=70',
  },
  {
    id: 'starry',
    label: 'Starry Night',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=70',
  },
]

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentWallpaper: string | null
  onWallpaperChange: (url: string | null) => void
}

export default function SettingsModal({
  isOpen,
  onClose,
  currentWallpaper,
  onWallpaperChange,
}: SettingsModalProps) {
  const [customUrl, setCustomUrl] = useState('')

  const handlePresetClick = (url: string | null) => {
    onWallpaperChange(url)
  }

  const handleSetCustom = () => {
    const trimmed = customUrl.trim()
    if (trimmed) {
      onWallpaperChange(trimmed)
      setCustomUrl('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSetCustom()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(560px,92vw)] max-h-[82vh] flex flex-col rounded-2xl bg-[#111111]/95 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <h2 className="text-white text-lg font-semibold tracking-wide">Wallpaper</h2>
              <button
                id="settings-modal-close"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable preset grid */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-3 gap-3">
                {PRESET_WALLPAPERS.map((preset) => {
                  const isSelected = currentWallpaper === preset.url
                  return (
                    <motion.button
                      key={preset.id}
                      id={`preset-${preset.id}`}
                      onClick={() => handlePresetClick(preset.url)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-white shadow-[0_0_0_2px_rgba(255,255,255,0.3)]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {preset.id === 'video' ? (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center gap-1">
                          <Video size={22} className="text-white/60" />
                          <span className="text-white/50 text-[10px]">Default</span>
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={preset.thumb!}
                          alt={preset.label}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                        >
                          <Check size={11} className="text-black" strokeWidth={3} />
                        </motion.div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-white text-[10px] font-medium truncate">{preset.label}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Custom URL input */}
            <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
              <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-3">
                Custom Image URL
              </p>
              <div className="flex gap-2">
                <input
                  id="custom-wallpaper-url"
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="https://..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                />
                <motion.button
                  id="set-custom-wallpaper"
                  onClick={handleSetCustom}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors flex-shrink-0 cursor-pointer"
                >
                  Set
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
