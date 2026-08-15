'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'

// --- Preset playlists ---
// Playlist ID is extracted from the YouTube playlist URL
export const PRESET_PLAYLISTS = [
  {
    id: 'PLgObA3pAqvOh87Z03QG8Z4xE-uqlAWSBy',
    name: 'Bus Driver Playlist',
    subtitle: 'Focus beats for devs',
    emoji: '💻',
  },
  {
    id: 'PLO7-VO1D0_6MnOoKQGmYNY2OoCOP3GRfm',
    name: 'Lofi Hip Hop',
    subtitle: 'Chill & study',
    emoji: '🎧',
  },
  {
    id: 'PLluqBUTOXDHUjNguM2wgfaVJhC0OHTTqB',
    name: 'Travel Hindi Songs',
    subtitle: 'Deep focus mode',
    emoji: '🌙',
  },
  {
    id: 'PLFPg_IUxqnZNFDZhMXkNMGTBMBKKDynK6',
    name: 'Synthwave / Retro',
    subtitle: 'Code like it\'s the 80s',
    emoji: '🌆',
  },
  {
    id: 'PLF_JFgcGgMFSJisCKh8dNYlq00gHGTmLk',
    name: 'Coding Jazz',
    subtitle: 'Smooth tunes for late nights',
    emoji: '🎷',
  },
  {
    id: 'PLx65qkgCWNJIgq1Mj0rtsthmpqDGe-KAo',
    name: 'Rain & Ambience',
    subtitle: 'Calm background sounds',
    emoji: '🌧️',
  },
]

// Extract playlist ID from a YouTube URL or return raw string if already an ID
function extractPlaylistId(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed)
    const list = url.searchParams.get('list')
    if (list) return list
  } catch {
    // Not a URL — treat as raw playlist ID
    if (/^[A-Za-z0-9_-]{10,}$/.test(trimmed)) return trimmed
  }
  return null
}

interface PlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlaylistId: string
  onPlaylistChange: (id: string) => void
}

export default function PlaylistModal({
  isOpen,
  onClose,
  currentPlaylistId,
  onPlaylistChange,
}: PlaylistModalProps) {
  const [customInput, setCustomInput] = useState('')
  const [error, setError] = useState('')

  const handlePreset = (id: string) => {
    onPlaylistChange(id)
    onClose()
  }

  const handleCustomPlay = () => {
    const id = extractPlaylistId(customInput)
    if (!id) {
      setError('Please enter a valid YouTube playlist URL or ID')
      return
    }
    setError('')
    onPlaylistChange(id)
    setCustomInput('')
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCustomPlay()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="pl-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(440px,92vw)] flex flex-col rounded-2xl bg-[#111111]/96 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white text-lg font-semibold tracking-wide">Playlist</h2>
              <button
                id="playlist-modal-close"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preset list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 max-h-[54vh]">
              {PRESET_PLAYLISTS.map((pl) => {
                const isActive = currentPlaylistId === pl.id
                return (
                  <motion.button
                    key={pl.id}
                    id={`playlist-${pl.id}`}
                    onClick={() => handlePreset(pl.id)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border transition-all cursor-pointer text-left ${isActive
                      ? 'bg-white/15 border-white/30'
                      : 'bg-white/5 border-white/8 hover:bg-white/10 hover:border-white/15'
                      }`}
                  >
                    {/* Emoji icon box */}
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
                      {pl.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{pl.name}</p>
                      <p className="text-white/45 text-xs mt-0.5 truncate">{pl.subtitle}</p>
                    </div>

                    {/* Play button */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-white text-black' : 'bg-white/15 text-white hover:bg-white/25'
                      }`}>
                      <Play size={13} className="fill-current ml-0.5" />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Custom input */}
            <div className="px-5 py-4 border-t border-white/10">
              <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-3">
                Add Your Playlist
              </p>
              <div className="flex gap-2">
                <input
                  id="custom-playlist-input"
                  type="text"
                  value={customInput}
                  onChange={(e) => { setCustomInput(e.target.value); setError('') }}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste YouTube playlist link..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                />
                <motion.button
                  id="custom-playlist-play"
                  onClick={handleCustomPlay}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Play size={12} className="fill-current" />
                  Play
                </motion.button>
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2">{error}</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
