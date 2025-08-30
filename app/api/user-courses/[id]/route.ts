import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { getUserCourse } from "./getUserCourse";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { id } = await params;
  if (!id) {
    return buildErrorResponse(400, "Course ID is required");
  }

  const course = await getUserCourse(id);
  if (!course) {
    return buildErrorResponse(404, "Course not found");
  }

  return buildSuccessResponse(course, 200);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { id } = await params;
  if (!id) {
    return buildErrorResponse(400, "Course ID is required");
  }

  try {
    // First verify the course exists and belongs to the user
    const existingCourse = await prisma.course.findUnique({
      where: { id },
      select: { id: true, userId: true, title: true },
    });

    if (!existingCourse) {
      return buildErrorResponse(404, "Course not found");
    }

    if (existingCourse.userId !== user.user.id) {
      return buildErrorResponse(
        403,
        "You don't have permission to delete this course"
      );
    }

    // Delete the course - cascade will handle videos and chapters
    await prisma.course.delete({
      where: { id },
    });

    return buildSuccessResponse(
      {
        message: `Course "${existingCourse.title}" has been deleted successfully`,
      },
      200
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return buildErrorResponse(500, "Failed to delete course");
  }
}
