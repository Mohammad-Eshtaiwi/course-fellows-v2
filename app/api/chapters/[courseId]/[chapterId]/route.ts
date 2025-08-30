import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createChapterSchema } from "../schema";

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
  try {
    createChapterSchema.parse(body);
  } catch {
    return buildErrorResponse(400, "Invalid request body");
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
