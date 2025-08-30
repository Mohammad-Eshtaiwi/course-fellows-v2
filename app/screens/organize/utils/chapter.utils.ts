import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { Course } from "@/app/hooks/course/course.client";

export type ChapterWithNew = Course["chapters"][number] & { isNew: boolean };

// Move UUID generation outside of render cycle
function generateChapterId() {
  return crypto.randomUUID();
}

export function createNewChapter(
  title: string,
  courseId: string
): ChapterWithNew {
  return {
    order: -1,
    title,
    id: generateChapterId(),
    state: "not-started",
    videos: [],
    courseId,
    isNew: true,
  };
}

export function isDefaultChapter(chapters: ChapterWithNew[]) {
  return chapters.length === 1 && chapters[0].title === COURSE_DEFAULT_NAME;
}

export function splitVideos(
  videos: Course["chapters"][number]["videos"],
  videoIndex: number
) {
  const allVideos = videos.map((video, idx) => ({
    ...video,
    order: idx + 1,
  }));

  return {
    remainingVideos: allVideos.slice(0, videoIndex),
    movedVideos: allVideos.slice(videoIndex),
  };
}
