import { Course, CourseVideo, CourseType } from "@prisma/client";
import { getPlaylistInfo, getVideoInfo } from "./youtube.client";
import { toSeconds, parse } from "iso8601-duration";
import { chaptersExtractor } from "./youtube.utils";

type CourseBuilderResult = {
  course: Omit<Course, "id" | "createdAt" | "updatedAt">;
  videos: Omit<CourseVideo, "id" | "courseId" | "isWatched">[];
};

export class CourseBuilder {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async buildFromPlaylist(playlistId: string): Promise<CourseBuilderResult> {
    const { data: playlistItems, error } = await getPlaylistInfo(playlistId);

    if (error || !playlistItems || playlistItems.length === 0) {
      throw new Error("Failed to fetch playlist information");
    }

    // Get the first video to use its thumbnail as the course thumbnail
    const firstVideo = playlistItems[0];
    const thumbnailUrl = firstVideo.snippet?.thumbnails?.high?.url || "";

    return {
      course: {
        title: firstVideo.snippet?.title || "Untitled Playlist",
        thumbnailUrl,
        type: CourseType.playlist,
        userId: this.userId,
      },
      videos: playlistItems.filter((item) => item.videoInfo).map((item, order) => {
        const duration = item.videoInfo.contentDetails?.duration!
          ? toSeconds(parse(item.videoInfo.contentDetails?.duration))
          : 0;
        return {
          title: item.snippet?.title || "Untitled Video",
          videoUrl: `https://www.youtube.com/watch?v=${item.contentDetails?.videoId}`,
          duration,
          order: order + 1,
          chapterId: null,
        };
      }),
    };
  }

  async buildFromVideo(videoId: string): Promise<CourseBuilderResult> {
    const { data: video, error } = await getVideoInfo(videoId);

    if (error || !video) {
      throw new Error("Failed to fetch video information");
    }

    const thumbnailUrl = video.snippet?.thumbnails?.high?.url || "";
    const description = video.snippet?.description || "";
    const videoDuration =
      toSeconds(parse(video.contentDetails?.duration!));
    console.log("videoDuration", videoDuration);

    const chapters = chaptersExtractor(description, videoDuration);
    console.log("chapters", chapters);

    if (chapters.length === 0) {
      throw new Error("No chapters found");
    }
    return {
      course: {
        title: video.snippet?.title!,
        thumbnailUrl,
        type: CourseType.video,
        userId: this.userId,
      },
      videos: chapters.map((chapter, order) => ({
        title: chapter.title,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}&t=${chapter.timestamp}`,
        duration: chapter.duration,
        order: order + 1,
        chapterId: null,
      })),
    };
  }
}
