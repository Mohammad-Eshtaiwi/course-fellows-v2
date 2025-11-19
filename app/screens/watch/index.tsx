"use client";
import { useYTPlayer } from "@/app/(watch)/hooks/ytPlayerContext";
import YouTubePlayer from "@/app/components/YouTubePlayer/index";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export default function WatchScreen() {
  const { id, videoId } = useParams();
  const { playerRef } = useYTPlayer();
  const handleGetPlayer = useCallback(
    (player: YT.Player) => {
      playerRef.current = player;
    },
    [playerRef]
  );
  const { data: course } = useCourse(id as string);
  const chapter = course?.chapters.find((chapter) =>
    chapter.videos.find((video) => {
      if (video.id === videoId) {
        return true;
      }
    })
  );

  const video = chapter?.videos.find((video) => video.id === videoId);

  if (!video) {
    return null;
  }

  if (!video) {
    return null;
  }
  const { url } = urlWithNoStart(video.url);
  return (
    <div>
      <YouTubePlayer
        src={url}
        getPlayer={handleGetPlayer}
        startAt={video.startAt}
      />
    </div>
  );
}

function urlWithNoStart(url: string): { url: string; start: number } {
  const urlObj = new URL(url);
  const start = urlObj.searchParams.get("start");
  urlObj.searchParams.delete("start");
  return { url: urlObj.toString(), start: start ? Number(start) : 0 };
}
