"use client";

import { useState, useEffect } from "react";
import YouTubeBackground from "./YouTubeBackground";
import MusicPlayer from "./MusicPlayer";
import { YouTubePlayer } from "react-youtube";
import Image from "next/image";

// Placeholder details for the playlist
const PLAYLIST_ID = "PLgObA3pAqvOh87Z03QG8Z4xE-uqlAWSBy";

export default function AppContainer() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTitle, setVideoTitle] = useState("Loading...");
  const [author, setAuthor] = useState("YouTube Music");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && player) {
      interval = setInterval(async () => {
        const time = await player.getCurrentTime();
        setCurrentTime(time);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const handleReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    setIsReady(true);
    updateVideoData(event.target);
  };

  const updateVideoData = async (ytPlayer: YouTubePlayer) => {
    const data = await ytPlayer.getVideoData();
    if (data) {
      setVideoTitle(data.title || "Unknown Track");
      setAuthor(data.author || "YouTube Music");
    }
    const dur = await ytPlayer.getDuration();
    setDuration(dur);
  };

  const handleStateChange = (event: { target: YouTubePlayer; data: number }) => {
    // data 1 is playing, 2 is paused
    if (event.data === 1) {
      setIsPlaying(true);
      updateVideoData(event.target);
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const playNext = () => {
    if (player) player.nextVideo();
  };

  const playPrevious = () => {
    if (player) player.previousVideo();
  };

  const handleSeek = (seconds: number) => {
    if (player) {
      player.seekTo(seconds, true);
      setCurrentTime(seconds);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/truck_desert_bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      <div className="z-10 w-full h-full flex flex-col justify-between items-center py-12 px-6">
        <div className="text-center mt-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider drop-shadow-lg">
            ट्रक ड्राइवर
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 uppercase tracking-[0.3em] font-light">
            Music
          </p>
        </div>

        <div className="w-full max-w-xl mb-12">
          {/* Tagline */}
          <p className="text-white/80 text-center mb-6 text-sm font-medium tracking-wide drop-shadow-md">
            बुरी नज़र वाले तेरा मुँह काला
          </p>

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
            isReady={isReady}
          />

          <p className="text-white/50 text-center mt-8 text-xs font-light">
            made with ♥ by Harshit
          </p>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <YouTubeBackground
          playlistId={PLAYLIST_ID}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
}
