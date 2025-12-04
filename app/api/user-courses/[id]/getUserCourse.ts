import { prisma } from "@/lib/prisma";
import {
  getChapterState,
  getDuration,
  getStartAtAccociatedWithVideoId,
  getVideoCount,
  getWatchedCount,
} from "./factories";

export async function getUserCourse(id: string) {
  const course = await prisma.course
    .findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          include: {
            videos: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    })
    .then((course) => {
      if (!course) {
        return null;
      }
      return {
        ...course,
        chapters: course.chapters.map((chapter) => {
          const state = getChapterState(chapter);
          return {
            ...chapter,
            state,
          };
        }),
      };
    });

  if (!course) {
    return null;
  }

  const duration = getDuration(course);
  const videoCount = getVideoCount(course);
  const watchedCount = getWatchedCount(course);

  const progress =
    videoCount > 0 ? Math.floor((watchedCount / videoCount) * 100) : 0;

  const startAtAccociatedWithVideoId = getStartAtAccociatedWithVideoId(course);

  return {
    ...course,
    duration,
    videoCount,
    progress,
    watchedCount,
    startAtAccociatedWithVideoId,
  };
}
