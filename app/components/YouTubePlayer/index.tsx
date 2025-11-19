"use client";
import { useEffect, useRef } from "react";

type YouTubePlayerProps = {
  src: string;
  getPlayer?: (player: YT.Player) => void;
  startAt?: number | null;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

function YouTubePlayer({ src, getPlayer, startAt }: YouTubePlayerProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    function createPlayer() {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: extractVideoId(src),
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: startAt ? undefined : 1,
            start: startAt || undefined,
            playsinline: 1,
          },
        });
      }
      getPlayer?.(playerRef.current!);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div ref={containerRef} style={{ width: "100%", aspectRatio: "16/9" }} />
  );
}

export default YouTubePlayer;

function extractVideoId(url: string): string {
  // Handle both videoId and full YouTube URLs
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const urlObj = new URL(url);
    return (
      urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop() || ""
    );
  }
  return url;
}
