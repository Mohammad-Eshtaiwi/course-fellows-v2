import { prisma } from "@/lib/prisma";
import { CourseChapter, CourseVideo } from "@prisma/client";

type CourseChapterWithVideos = CourseChapter & {
  videos: CourseVideo[];
};

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
                order: 'asc',
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

  const duration = course?.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.reduce((acc, video) => acc + video.duration, 0);
  }, 0);

  const videoCount = course?.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.length;
  }, 0);

  const watchedCount = course?.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.reduce((acc, video) => acc + Number(video.isWatched), 0);
  }, 0);

  const progress = videoCount > 0 ? Math.floor((watchedCount / videoCount) * 100) : 0;

  return { ...course, duration, videoCount, progress, watchedCount };
}

function getChapterState(chapter: CourseChapterWithVideos) {
  let state: "completed" | "in-progress" | "not-started" = "not-started";
  const watchedVideos = chapter.videos.filter((video) => video.isWatched);
  if (watchedVideos.length === chapter.videos.length) {
    state = "completed";
  } else if (watchedVideos.length > 0) {
    state = "in-progress";
  }
  return state;
}
