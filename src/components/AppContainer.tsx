'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import YouTubeBackground from './YouTubeBackground'
import MusicPlayer from './MusicPlayer'
import { YouTubePlayer } from 'react-youtube'
import Image from 'next/image'
import Link from 'next/link'
import { Settings, Maximize2, Minimize2 } from 'lucide-react'
import SettingsModal from './SettingsModal'
import PlaylistModal, { PRESET_PLAYLISTS } from './PlaylistModal'

const DEFAULT_PLAYLIST_ID = PRESET_PLAYLISTS[0].id

const TAGLINES = [
  "बुरी नज़र वाले तेरा कोड क्रैश हो",
  "नज़र लगे तो प्रोडक्शन में बग आये",
  "जलने वाले तेरा सर्वर डाउन हो",
  "चाय पिया, बग हटाया, फिर सो गए",
  "दिन को सोया, रात को कोडा",
  "कोड लिखा दिल से, चला किस्मत से",
  "काम मेरा, क्रेडिट बॉस का",
  "डेडलाइन नज़दीक, नींद है दूर",
  "बग है दुश्मन, कॉफी है यार"
]

export default function AppContainer() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoTitle, setVideoTitle] = useState('Loading...')
  const [author, setAuthor] = useState('YouTube Music')
  const [isReady, setIsReady] = useState(false)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [activePlaylistId, setActivePlaylistId] = useState(DEFAULT_PLAYLIST_ID)
  const [clockTime, setClockTime] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cwm_wallpaper') || null
    }
    return null
  })

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // format: "5:20 pm"
      setClockTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleWallpaperChange = (url: string | null) => {
    setBackgroundUrl(url)
    if (url === null) {
      localStorage.removeItem('cwm_wallpaper')
    } else {
      localStorage.setItem('cwm_wallpaper', url)
    }
  }

  const toggleShuffle = () => {
    if (!player) return
    const next = !isShuffled
    setIsShuffled(next)
    player.setShuffle(next)
  }

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length)
    }, 120000)

    return () => clearInterval(taglineInterval)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && player) {
      interval = setInterval(async () => {
        const time = await player.getCurrentTime()
        setCurrentTime(time)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, player])

  const handleReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target)
    setIsReady(true)
    updateVideoData(event.target)
  }

  const updateVideoData = async (ytPlayer: YouTubePlayer) => {
    const data = await ytPlayer.getVideoData()
    if (data) {
      setVideoTitle(data.title || 'Unknown Track')
      setAuthor(data.author || 'YouTube Music')
    }
    const dur = await ytPlayer.getDuration()
    setDuration(dur)
  }

  const handleStateChange = (event: {
    target: YouTubePlayer
    data: number
  }) => {
    // data 1 is playing, 2 is paused
    if (event.data === 1) {
      setIsPlaying(true)
      updateVideoData(event.target)
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (!player) return
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const playNext = () => {
    if (player) player.nextVideo()
  }

  const playPrevious = () => {
    if (player) player.previousVideo()
  }

  const handleSeek = (seconds: number) => {
    if (player) {
      player.seekTo(seconds, true)
      setCurrentTime(seconds)
    }
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden">

      {/* Top-left corner: Live Clock */}
      <div className="absolute top-5 left-6 z-20">
        <p className="text-white font-semibold text-[15px] drop-shadow-md tracking-wide">
          {clockTime}
        </p>
      </div>

      {/* Top-right corner icons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-2">
        {/* Settings icon */}
        <motion.button
          id="settings-btn"
          aria-label="Settings"
          onClick={() => setIsSettingsOpen(true)}
          whileHover={{ scale: 1.1, rotate: 30 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/70 hover:text-white transition-colors shadow-lg cursor-pointer"
        >
          <Settings size={16} />
        </motion.button>

        {/* Fullscreen toggle icon */}
        <motion.button
          id="fullscreen-btn"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onClick={toggleFullscreen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/70 hover:text-white transition-colors shadow-lg cursor-pointer"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </motion.button>
      </div>
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {backgroundUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={backgroundUrl}
            alt="Background wallpaper"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <video
            src="/bg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        )}
        {/* Subtle dark overlay for better text readability (removed blur) */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="z-10 w-full h-full flex flex-col justify-between items-center py-12 px-6">
        <div className="text-center mt-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider drop-shadow-lg font-arya">
            कोडर वाला
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 uppercase tracking-[0.3em] font-light">
            Music
          </p>
        </div>

        <div className="w-full max-w-xl mb-12">
          {/* Tagline */}
          <div className="h-6 mb-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-white/80 text-center text-sm font-medium tracking-wide drop-shadow-md font-arya"
              >
                {TAGLINES[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <MusicPlayer
            isPlaying={isPlaying}
            videoTitle={videoTitle}
            author={author}
            currentTime={currentTime}
            duration={duration}
            onTogglePlay={togglePlay}
            onNext={playNext}
            onPrev={playPrevious}
            onSeek={handleSeek}
            onShuffle={toggleShuffle}
            onPlaylistOpen={() => setIsPlaylistOpen(true)}
            isShuffled={isShuffled}
            isReady={isReady}
          />

          <div className="text-white/50 text-center mt-8 text-xs font-light flex items-center justify-center gap-2">
            <span>made with ♥ by Vikesh</span>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About & FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <YouTubeBackground
          playlistId={activePlaylistId}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentWallpaper={backgroundUrl}
        onWallpaperChange={handleWallpaperChange}
      />
      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentPlaylistId={activePlaylistId}
        onPlaylistChange={(id) => {
          setActivePlaylistId(id)
          setPlayer(null)
          setIsReady(false)
          setIsPlaying(false)
          setVideoTitle('Loading...')
        }}
      />
    </div>
  )
}
