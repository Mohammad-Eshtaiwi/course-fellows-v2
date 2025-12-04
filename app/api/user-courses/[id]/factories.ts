import { CourseChapterWithVideos, CourseWithChaptersAndVideos } from "./types";

export const getDuration = (course: CourseWithChaptersAndVideos) => {
  return course?.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.reduce((acc, video) => acc + video.duration, 0);
  }, 0);
};

export const getVideoCount = (course: CourseWithChaptersAndVideos) => {
  return course?.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.length;
  }, 0);
};

export const getWatchedCount = (course: CourseWithChaptersAndVideos) => {
  return course?.chapters.reduce((acc, chapter) => {
    return (
      acc +
      chapter.videos.reduce((acc, video) => acc + Number(video.isWatched), 0)
    );
  }, 0);
};

export const getStartAtAccociatedWithVideoId = (
  course: CourseWithChaptersAndVideos
) => {
  return course?.chapters.reduce((acc, chapter) => {
    const startAtMap = chapter.videos.reduce<Record<string, string>>(
      (acc, video) => {
        return { ...acc, [video.startAt + ""]: video.id };
      },
      {}
    );
    return { ...acc, ...startAtMap };
  }, {});
};


export const getChapterState = (chapter: CourseChapterWithVideos) => {
    let state: "completed" | "in-progress" | "not-started" = "not-started";
    const watchedVideos = chapter.videos.filter((video) => video.isWatched);
    if (watchedVideos.length === chapter.videos.length) {
      state = "completed";
    } else if (watchedVideos.length > 0) {
      state = "in-progress";
    }
    return state;
  }