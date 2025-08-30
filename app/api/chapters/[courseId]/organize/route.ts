import { NextRequest } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { prisma } from "@/lib/prisma";
import { CourseChapter, Prisma, PrismaClient } from "@prisma/client";
import { OrganizeChaptersSchema, chaptersSchema } from "./schema";
import { z } from "zod";

interface CreateChapterResult {
  chapters: CourseChapter[];
  error?: string;
}

type TransactionClient = {
  courseChapter: PrismaClient["courseChapter"];
  courseVideo: PrismaClient["courseVideo"];
};

async function assignVideosToChapters(
  tx: TransactionClient,
  chapters: { id: string; videos: { id: string }[] }[]
) {
  await Promise.all(
    chapters.map((chapter) =>
      tx.courseVideo.updateMany({
        where: { id: { in: chapter.videos.map((video) => video.id) } },
        data: { chapterId: chapter.id },
      })
    )
  );
}

async function handleOldChapters(
  tx: TransactionClient,
  oldChapters: OrganizeChaptersSchema["oldChapters"]
) {
  try {
    const updatedChapters = await Promise.all(
      oldChapters.map((oldChapter) =>
        tx.courseChapter.update({
          where: { id: oldChapter.id },
          data: { title: oldChapter.title, order: oldChapter.order },
        })
      )
    );

    await assignVideosToChapters(tx, oldChapters);

    return { chapters: updatedChapters };
  } catch (error) {
    console.error("Error in handleOldChapters:", error);
    return { error: "Failed to update old chapters", chapters: [] };
  }
}

async function createChaptersWithVideos(
  tx: TransactionClient,
  courseId: string,
  chapters: OrganizeChaptersSchema["newChapters"]
): Promise<CreateChapterResult> {
  try {
    // Create all chapters in parallel
    const newChapters = await Promise.all(
      chapters.map((chapter) =>
        tx.courseChapter.create({
          data: { title: chapter.title, courseId, order: chapter.order },
        })
      )
    );

    await assignVideosToChapters(
      tx,
      newChapters.map((chapter, index) => ({
        ...chapter,
        videos: chapters[index].videos,
      }))
    );

    return { chapters: newChapters };
  } catch {
    return {
      chapters: [],
      error: "Failed to create chapters and update videos",
    };
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // Authentication check
    const user = await auth();
    if (!user) {
      return buildErrorResponse(401, "Unauthorized");
    }

    // Input validation
    const { courseId } = await params;
    if (!courseId || typeof courseId !== "string") {
      return buildErrorResponse(400, "Valid course ID is required");
    }

    // Request body validation
    const body: OrganizeChaptersSchema = await request.json();
    try {
      chaptersSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return buildErrorResponse(400, error.message);
      }
      throw error;
    }

    // Execute transaction
    const { oldChapters, newChapters, deletedChapters } = body;

    const oldChaptersResult = await prisma.$transaction(async (tx) => {
      return handleOldChapters(tx, oldChapters);
    });

    const newChaptersResult = await prisma.$transaction(async (tx) => {
      return createChaptersWithVideos(tx, courseId, newChapters);
    });

    if (newChaptersResult.error || oldChaptersResult.error) {
      return buildErrorResponse(500, newChaptersResult.error);
    }

    await prisma.courseChapter.deleteMany({
      where: { id: { in: deletedChapters } },
    });

    return buildSuccessResponse({ message: "Success" }, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return buildErrorResponse(500, error.message);
    }
    console.error("Error in chapter organization:", error);
    return buildErrorResponse(500, "Internal server error");
  }
}
