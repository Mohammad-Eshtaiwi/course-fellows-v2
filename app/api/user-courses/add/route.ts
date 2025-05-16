import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { CourseBuilder } from "../../lib/youtube/course-builder";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await auth();

  if (!user) {
    return buildErrorResponse(401);
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "playlist" || typeParam === "video" ? typeParam : null;

  if (!type) {
    return buildErrorResponse(400, "type must be either 'playlist' or 'video'");
  }

  let id: string;

  if (!url) {
    return buildErrorResponse(400, "url is required");
  }
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  const playlistId = urlObj.searchParams.get("list");

  if (type === "playlist" && !playlistId) {
    return buildErrorResponse(400, "playlistId is required");
  } else if (type === "video" && !videoId) {
    return buildErrorResponse(400, "videoId is required");
  }

  if (type === "playlist") {
    id = playlistId!;
  } else if (type === "video") {
    id = videoId!;
  }
  try {
    if (type === "playlist") {
      const courseBuilder = new CourseBuilder(user.user.id);
      const { course, videos } = await courseBuilder.buildFromPlaylist(id!);
      const result = await prisma.$transaction(async (tx) => {
      const createdCourse = await tx.course.create({
        data: {
          ...course,
          userId: user.user.id,
        },
      });
      
      const courseVideos = await tx.courseVideo.createMany({
        data: videos.map((video) => ({
          ...video,
          courseId: createdCourse.id,
        })),
      });

      return createdCourse.id;
    });
    return buildSuccessResponse({ newCourseId: result }, 200);
  } else if (type === "video") {
      return buildSuccessResponse({ course: {}, videos: [] }, 200);
    }
  } catch (error) {
    console.error(error);
    return buildErrorResponse(500, "Internal server error");
  }
}
