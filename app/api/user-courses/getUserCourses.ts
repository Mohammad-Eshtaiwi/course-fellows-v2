import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

export async function getUserCourses(user: User) {
  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      type: true,
      videos: {
        select: {
          id: true,
          isWatched: true,
          order: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses.map((course) => {
    const totalVideos = course.videos.length;
    const completedVideos = course.videos.filter((v) => v.isWatched).length;
    const totalDuration = course.videos.reduce((acc, v) => acc + v.duration, 0);
    const nextVideo =
      course.videos
        .filter((v) => !v.isWatched)
        .sort((a, b) => a.order - b.order)[0] || course.videos.at(-1);

    return {
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      type: course.type,
      totalDuration: totalDuration,
      nextVideo: {
        id: nextVideo.id,
        order: nextVideo.order,
        title: nextVideo.title,
        videoUrl: nextVideo.url,
        duration: nextVideo.duration,
      },
      progress: {
        total: totalVideos,
        completed: completedVideos,
        average: totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0,
      },
    };
  });
}
