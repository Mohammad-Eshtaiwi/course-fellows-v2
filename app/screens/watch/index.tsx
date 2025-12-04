"use client";
import { useYTPlayer } from "@/app/(watch)/hooks/ytPlayerContext";
import YouTubePlayer from "@/app/components/YouTubePlayer/index";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getCurrentVideoId } from "./utils/getCurrentVideoId";

let interval: NodeJS.Timeout | undefined = undefined;

export default function WatchScreen() {
  const { id, videoId } = useParams();
  const { playerRef, setPlayerIsReady, playerIsReady } = useYTPlayer();
  const router = useRouter();
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

  useEffect(() => {
    if (!playerRef.current || course?.type === "playlist") return;

    interval = setInterval(() => {
      const currentTime = Math.floor(playerRef.current?.getCurrentTime() || 0);
      const newVideoId = getCurrentVideoId(
        currentTime,
        course?.startAtAccociatedWithVideoId || {}
      );
      if (newVideoId !== videoId) {
        router.push(`/watch/${id}/${newVideoId}`, {
          scroll: true,
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, playerIsReady, videoId]);

  if (!video) {
    return null;
  }

  if (!video) {
    return null;
  }
  const { url } = urlWithNoStart(video.url);

  const onReady = () => {
    setPlayerIsReady(true);
  };

  return (
    <div>
      <YouTubePlayer
        src={url}
        getPlayer={handleGetPlayer}
        startAt={video.startAt}
        onReady={onReady}
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
