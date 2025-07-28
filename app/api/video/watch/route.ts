import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await auth();
    if (!user) {
      return buildErrorResponse(401, "Unauthorized");
    }

    const body = await request.json();
    const { videoId } = body;

    if (!videoId) {
      return buildErrorResponse(400, "Video ID is required");
    }

    // Find the video and include the course to check ownership
    const video = await prisma.courseVideo.findUnique({
      where: { id: videoId },
      include: {
        course: {
          select: {
            id: true,
            userId: true,
            title: true,
          },
        },
      },
    });

    if (!video) {
      return buildErrorResponse(404, "Video not found");
    }

    // Check if the course belongs to the authenticated user
    if (video.course.userId !== user.user.id) {
      return buildErrorResponse(
        403,
        "You don't have permission to modify this video"
      );
    }

    // Toggle the isWatched status
    const updatedVideo = await prisma.courseVideo.update({
      where: { id: videoId },
      data: {
        isWatched: !video.isWatched,
      },
      select: {
        id: true,
        title: true,
        isWatched: true,
      },
    });

    return buildSuccessResponse({
      message: `Video "${updatedVideo.title}" marked as ${
        updatedVideo.isWatched ? "watched" : "unwatched"
      }`,
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error toggling video watch status:", error);
    return buildErrorResponse(500, "Failed to update video watch status");
  }
}
