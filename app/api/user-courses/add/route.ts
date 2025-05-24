import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { CourseBuilder } from "../../lib/youtube/course-builder";
import { prisma } from "@/lib/prisma";

type CourseType = "playlist" | "video";

interface UrlParams {
  type: CourseType;
  id: string;
}

function validateAndExtractParams(request: Request): UrlParams | null {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const typeParam = searchParams.get("type");
  const type = typeParam === "playlist" || typeParam === "video" ? typeParam : null;

  if (!type) {
    throw new Error("type must be either 'playlist' or 'video'");
  }

  if (!url) {
    throw new Error("url is required");
  }

  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  const playlistId = urlObj.searchParams.get("list");

  if (type === "playlist" && !playlistId) {
    throw new Error("playlistId is required");
  } else if (type === "video" && !videoId) {
    throw new Error("videoId is required");
  }

  return {
    type,
    id: type === "playlist" ? playlistId! : videoId!,
  };
}

async function createCourseFromContent(
  userId: string,
  type: CourseType,
  id: string
): Promise<string> {
  const courseBuilder = new CourseBuilder(userId);
  const { course, videos } = type === "playlist"
    ? await courseBuilder.buildFromPlaylist(id)
    : await courseBuilder.buildFromVideo(id);

  return await prisma.$transaction(async (tx) => {
    const createdCourse = await tx.course.create({
      data: {
        ...course,
        userId,
      },
    });

    await tx.courseVideo.createMany({
      data: videos.map((video) => ({
        ...video,
        courseId: createdCourse.id,
      })),
    });

    return createdCourse.id;
  });
}

export async function GET(request: Request) {
  try {
    const user = await auth();
    if (!user) {
      return buildErrorResponse(401);
    }

    const params = validateAndExtractParams(request);
    if (!params) {
      return buildErrorResponse(400, "Invalid parameters");
    }

    const newCourseId = await createCourseFromContent(
      user.user.id,
      params.type,
      params.id
    );

    return buildSuccessResponse({ newCourseId }, 200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    if (errorMessage.includes("No chapters")) {
      return buildErrorResponse(400, errorMessage);
    }
    return buildErrorResponse(500, errorMessage);
  }
}
