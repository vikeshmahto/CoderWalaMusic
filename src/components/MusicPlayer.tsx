"use client";

import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  videoTitle: string;
  author: string;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  isReady: boolean;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function MusicPlayer({
  isPlaying,
  videoTitle,
  author,
  currentTime,
  duration,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  isReady,
}: MusicPlayerProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/20"
    >
      <div className="flex items-center gap-6">
        {/* Cover Art Placeholder */}
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
          <Music2 className="w-10 h-10 text-white/50" />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-1">
              <motion.div
                animate={{ height: ["10%", "80%", "30%"] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="w-1 bg-white/80 rounded-full"
              />
              <motion.div
                animate={{ height: ["40%", "20%", "90%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-1 bg-white/80 rounded-full"
              />
              <motion.div
                animate={{ height: ["70%", "50%", "20%"] }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                className="w-1 bg-white/80 rounded-full"
              />
            </div>
          )}
        </div>

        {/* Info & Controls */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <motion.h2
            key={videoTitle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-semibold text-xl truncate pr-4 drop-shadow"
          >
            {videoTitle}
          </motion.h2>
          <p className="text-white/60 text-sm mt-1 mb-4 truncate">{author}</p>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-white/50 text-xs w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-2 bg-white/10 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = clickX / rect.width;
                onSeek(percent * duration);
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-white/80"
                style={{ width: `${progressPercent}%` }}
                layout
              />
            </div>
            <span className="text-white/50 text-xs w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            disabled={!isReady}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors disabled:opacity-50"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTogglePlay}
            disabled={!isReady}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white shadow-lg backdrop-blur-md transition-colors disabled:opacity-50"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={!isReady}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors disabled:opacity-50"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
