import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { courseId, chapterId } = await params;
  if (!courseId || !chapterId) {
    return buildErrorResponse(400, "Course ID and chapter ID are required");
  }

  const body = await request.json();

  if (!body.title) {
    return buildErrorResponse(400, "Title is required");
  }

  if (body.title.length > 255) {
    return buildErrorResponse(400, "Title must be less than 255 characters");
  }

  const chapter = await prisma.courseChapter.update({
    where: {
      id: chapterId,
      courseId: courseId,
    },
    data: {
      title: body.title,
    },
  });

  return buildSuccessResponse(chapter, 200);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { courseId, chapterId } = await params;

  if (!courseId || !chapterId) {
    return buildErrorResponse(400, "Course ID and chapter ID are required");
  }

  const body = await request.json();

  if (!body.title) {
    return buildErrorResponse(400, "Title is required");
  }

  if (body.title.length > 100) {
    return buildErrorResponse(400, "Title must be less than 100 characters");
  }

  const chapter = await prisma.courseChapter.create({
    data: {
      title: body.title,
      courseId: courseId,
      order: 1,
    },
  });

  return buildSuccessResponse(chapter, 201);
}
