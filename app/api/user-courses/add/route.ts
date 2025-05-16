import { getPlaylistInfo, getVideoInfo } from "@/app/api/lib/youtube/client";
import { buildErrorResponse, buildSuccessResponse } from "@/app/api/utils/responseBuilder";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const typeParam = searchParams.get("type");
  const type = typeParam === "playlist" || typeParam === "video" ? typeParam : null;
  console.log(url, type);
  
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

  if (type === "playlist") {
    const res = await getPlaylistInfo(id!);
    return buildSuccessResponse(res, 200);
  } else if (type === "video") {
    const res = await getVideoInfo(id!);
    return buildSuccessResponse(res, 200);
  }
}
