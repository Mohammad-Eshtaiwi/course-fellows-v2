import { prisma } from "@/lib/prisma";

export async function getUserCourse(id: string) {
  console.log("getUserCourse", id);

  const course = await prisma.course.findUnique({
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
  });

  return course;
}
