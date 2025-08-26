"use client";
import YouTubePlayer from "@/app/components/YouTubePlayer";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";

export default function WatchScreen() {
  const { id, videoId } = useParams();
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

  const { url } = urlWithNoStart(video.url);

  return (
    <div>
      <YouTubePlayer src={url} />
    </div>
  );
}

function urlWithNoStart(url: string): { url: string; start: number } {
  const urlObj = new URL(url);
  const start = urlObj.searchParams.get("start");
  urlObj.searchParams.delete("start");
  return { url: urlObj.toString(), start: start ? Number(start) : 0 };
}
