import { NextRequest } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../../utils/responseBuilder";
import { prisma } from "@/lib/prisma";
import { createChapterSchema } from "./schema";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { courseId } = await params;

  if (!courseId) {
    return buildErrorResponse(400, "Course ID is required");
  }

  const body = await request.json();

  try {
    createChapterSchema.parse(body);
  } catch (error) {
    return buildErrorResponse(400, "Invalid request body");
  }

  const chapter = await prisma.courseChapter.create({
    data: {
      title: body.title,
      courseId,
      order: 1,
    },
  });

  return buildSuccessResponse(chapter, 201);
}
