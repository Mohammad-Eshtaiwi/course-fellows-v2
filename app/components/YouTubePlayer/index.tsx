"use client";
import ReactPlayer from "react-player";

type YouTubePlayerProps = {
  src: string;
};

export default function YouTubePlayer({ src }: YouTubePlayerProps) {
  return (
    <ReactPlayer
      src={src}
      autoPlay
      style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
      config={{
        youtube: {
          color: "white",
        },
      }}
      controls
    />
  );
}
