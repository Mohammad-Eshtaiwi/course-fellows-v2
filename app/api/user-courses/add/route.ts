import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { CourseBuilder } from "../../lib/youtube/course-builder";
import { prisma } from "@/lib/prisma";
import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { NextResponse } from "next/server";
import { PLAYLIST_ID_REQUIRED, VIDEO_ID_REQUIRED } from "./add.constants";

type CourseType = "playlist" | "video";

interface UrlParams {
  type: CourseType;
  id: string;
}

function validateAndExtractParams(request: Request): UrlParams | NextResponse {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "playlist" || typeParam === "video" ? typeParam : null;

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
    return buildErrorResponse(400, PLAYLIST_ID_REQUIRED);
  } else if (type === "video" && !videoId) {
    return buildErrorResponse(400, VIDEO_ID_REQUIRED);
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
  const { course, videos } =
    type === "playlist"
      ? await courseBuilder.buildFromPlaylist(id)
      : await courseBuilder.buildFromVideo(id);

  return await prisma.$transaction(async (tx) => {
    const createdCourse = await tx.course.create({
      data: {
        ...course,
        userId,
      },
    });
    const courseChapter = await tx.courseChapter.create({
      data: {
        title: COURSE_DEFAULT_NAME,
        order: 1,
        courseId: createdCourse.id,
      },
    });

    await tx.courseVideo.createMany({
      data: videos.map((video) => ({
        ...video,
        courseId: createdCourse.id,
        chapterId: courseChapter.id,
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

    if (params instanceof NextResponse) {
      // if the params is a NextResponse, then it means that the request is invalid
      // so we return the response
      return params;
    }

    const newCourseId = await createCourseFromContent(
      user.user.id,
      params.type,
      params.id
    );

    return buildSuccessResponse({ newCourseId }, 200);
  } catch (error) {
    console.log(error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    if (errorMessage.includes("No chapters")) {
      return buildErrorResponse(400, errorMessage);
    }
    return buildErrorResponse(500, errorMessage);
  }
}
