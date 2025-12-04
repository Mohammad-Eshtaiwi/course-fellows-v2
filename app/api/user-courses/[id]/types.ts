import { CourseChapter, CourseVideo, Prisma } from "@prisma/client";

// Type for course
export type CourseWithChaptersAndVideos = Prisma.CourseGetPayload<{
  include: {
    chapters: {
      include: { videos: true };
    };
  };
}>;

export type CourseChapterWithVideos = CourseChapter & {
  videos: CourseVideo[];
};
