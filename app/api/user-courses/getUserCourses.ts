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
      thumbnailUrl: true,
      type: true,
      videos: {
        take: 1,
        where: {
          isWatched: false,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          order: true,
          title: true,
          videoUrl: true,
          duration: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
}
