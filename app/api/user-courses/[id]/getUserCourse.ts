import { prisma } from "@/lib/prisma";
import { CourseChapter, CourseVideo } from "@prisma/client";

type CourseChapterWithVideos = CourseChapter & {
  videos: CourseVideo[];
};

export async function getUserCourse(id: string) {
  console.log("getUserCourse", id);

  const course = await prisma.course
    .findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          include: {
            videos: true,
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
            videos: chapter.videos.map((video) => ({
              ...video,
            })),
          };
        }),
      };
    });

  return course;
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
