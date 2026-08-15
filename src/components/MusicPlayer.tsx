"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  ListMusic,
  Music2,
} from "lucide-react";

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
  onShuffle: () => void;
  onPlaylistOpen: () => void;
  isShuffled: boolean;
  isReady: boolean;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
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
  onShuffle,
  onPlaylistOpen,
  isShuffled,
  isReady,
}: MusicPlayerProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Pill card */}
      <div className="flex items-center gap-3 px-3 py-3 rounded-full bg-black/40 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_0_rgba(0,0,0,0.5)]">

        {/* --- Album art --- */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
          {isPlaying ? (
            /* Equaliser bars while playing */
            <div className="flex items-end gap-[3px] h-6 px-1">
              {[
                { from: "10%", to: "80%" },
                { from: "80%", to: "20%" },
                { from: "30%", to: "90%" },
                { from: "60%", to: "30%" },
              ].map((bar, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [bar.from, bar.to, bar.from] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.7 + i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-[3px] bg-white/80 rounded-full"
                />
              ))}
            </div>
          ) : (
            <Music2 className="w-6 h-6 text-white/50" />
          )}
        </div>

        {/* --- Track info + progress bar --- */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 pr-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={videoTitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-white font-semibold text-sm leading-tight truncate"
            >
              {videoTitle}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/50 text-xs truncate leading-tight">
            {isReady ? author : "Click ▶ to play"}
          </p>

          {/* Progress bar row */}
          <div className="flex items-center gap-2 w-full mt-0.5">
            <span className="text-white/40 text-[10px] w-7 text-right shrink-0">
              {formatTime(currentTime)}
            </span>

            {/* Track */}
            <div
              className="flex-1 h-[3px] bg-white/15 rounded-full cursor-pointer relative group"
              onClick={(e) => {
                if (!isReady) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                onSeek(Math.max(0, Math.min(1, pct)) * duration);
              }}
            >
              {/* Fill */}
              <div
                className="absolute top-0 left-0 h-full bg-white/80 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Thumb dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            <span className="text-white/40 text-[10px] w-7 shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* --- Controls --- */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Shuffle */}
          <motion.button
            id="shuffle-btn"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onShuffle}
            title={isShuffled ? "Shuffle: On" : "Shuffle: Off"}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isShuffled
                ? "text-white bg-white/15"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <Shuffle size={14} />
          </motion.button>

          {/* Prev */}
          <motion.button
            id="prev-btn"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrev}
            disabled={!isReady}
            title="Previous"
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <SkipBack size={16} className="fill-current" />
          </motion.button>

          {/* Play / Pause — large white circle */}
          <motion.button
            id="play-pause-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onTogglePlay}
            disabled={!isReady}
            title={isPlaying ? "Pause" : "Play"}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors disabled:opacity-40 mx-0.5"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Pause size={18} className="fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Play size={18} className="fill-current ml-0.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Next */}
          <motion.button
            id="next-btn"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNext}
            disabled={!isReady}
            title="Next"
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <SkipForward size={16} className="fill-current" />
          </motion.button>

          {/* Playlist */}
          <motion.button
            id="playlist-btn"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPlaylistOpen}
            title="Playlist"
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ListMusic size={14} />
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}
