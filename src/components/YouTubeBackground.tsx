"use client";

import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubeBackgroundProps {
  playlistId: string;
  onReady: YouTubeProps["onReady"];
  onStateChange: YouTubeProps["onStateChange"];
}

export default function YouTubeBackground({
  playlistId,
  onReady,
  onStateChange,
}: YouTubeBackgroundProps) {
  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      listType: "playlist",
      list: playlistId,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <YouTube
      videoId=""
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
      className="hidden"
      iframeClassName="hidden"
    />
  );
}
