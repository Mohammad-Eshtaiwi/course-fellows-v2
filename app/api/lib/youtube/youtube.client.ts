import { youtube_v3 } from "@googleapis/youtube";
import { YOUTUBE_API_BASE } from "./youtube.constants";

type PlaylistInfoResult = {
  data:
    | (youtube_v3.Schema$PlaylistItem & {
        videoInfo: youtube_v3.Schema$Video;
      })[]
    | undefined;
  error: boolean;
};

export async function getPlaylistInfo(
  playlistId: string
): Promise<PlaylistInfoResult> {
  const allItems: (youtube_v3.Schema$PlaylistItem & {
    videoInfo: youtube_v3.Schema$Video;
  })[] = [];
  let nextPageToken: string | undefined = undefined;

  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not set");
  }

  try {
    do {
      const url = new URL(YOUTUBE_API_BASE + "/playlistItems");
      url.searchParams.append("part", "snippet,contentDetails");
      url.searchParams.append("playlistId", playlistId);
      url.searchParams.append("maxResults", "50");
      url.searchParams.append("key", process.env.YOUTUBE_API_KEY!);
      if (nextPageToken) {
        url.searchParams.append("pageToken", nextPageToken);
      }

      const res = await fetch(url.toString());
      const data: youtube_v3.Schema$PlaylistItemListResponse = await res.json();

      // get video info
      const videoIds = data.items?.map((item) => item.contentDetails!.videoId!);
      const videoInfos = await Promise.all(
        videoIds?.map((videoId) => getVideoInfo(videoId)) || []
      );

      const itemsWithVideoInfo = data.items?.map((item, index) => ({
        ...item,
        videoInfo: videoInfos[index]!.data!,
      }));

      if (itemsWithVideoInfo) {
        allItems.push(...itemsWithVideoInfo);
      }

      nextPageToken = data.nextPageToken || undefined;
    } while (nextPageToken);
    return { data: allItems, error: false };
  } catch (err) {
    console.error("Error fetching playlist info:", err);
    return { data: undefined, error: true };
  }
}

type VideoInfoResult = {
  data: youtube_v3.Schema$Video | undefined;
  error: boolean;
};

export async function getVideoInfo(
  videoId: string,
): Promise<VideoInfoResult> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not set");
  }

  try {
    const url = new URL(YOUTUBE_API_BASE + "/videos");

    url.searchParams.append("part", "snippet,contentDetails,statistics");
    url.searchParams.append("id", videoId);
    url.searchParams.append("key", process.env.YOUTUBE_API_KEY!);

    const res = await fetch(url.toString());
    const data: youtube_v3.Schema$VideoListResponse = await res.json();

    const video = data.items?.[0];
    return { data: video, error: !video };
  } catch (err) {
    console.error("Error fetching video info:", err);
    return { data: undefined, error: true };
  }
}
