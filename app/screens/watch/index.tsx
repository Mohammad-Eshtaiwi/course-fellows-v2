"use client";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function WatchScreen() {
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

  return (
    <div>
      <ReactPlayer src={video.url} width="100%" height={680} controls />
    </div>
  );
}
