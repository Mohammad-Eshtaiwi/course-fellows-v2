"use client";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import YouTubePlayer from "@/app/components/YouTubePlayer";

export default function WatchScreen() {
  const playerRef = useRef(null);
  const { id, videoId } = useParams();
  const { data: course } = useCourse(id as string);
  const chapter = course?.chapters.find((chapter) =>
    chapter.videos.find((video, index) => {
      if (video.id === videoId) {
        return true;
      }
    })
  );

  const video = chapter?.videos.find((video) => video.id === videoId);

  if (!video) {
    return null;
  }
  let url = video.url;
  let start = 0;
  if (course?.type === "video") {
    start = Number(extractTimeFromYouTubeUrl(url)?.replace("s", ""));
  }

  return (
    <div>
      <YouTubePlayer
        url={video.url}
        start={start}
        style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
      />
    </div>
  );
}

export function extractTimeFromYouTubeUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // Extract the 't' parameter (e.g., t=500s, t=1h17m15s)
    const tParam = urlObj.searchParams.get("t");

    return tParam;
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return null;
  }
}
