import { getPlaylistInfo } from "@/app/api/lib/youtube/client";
import { buildSuccessResponse } from "../../utils/responseBuilder";

export async function GET() {
  const res = await getPlaylistInfo("PLvGpI5t1gJ8Ta6XJLb0t0wlrKThbMxp8j");

  return buildSuccessResponse(res, 200);
}
