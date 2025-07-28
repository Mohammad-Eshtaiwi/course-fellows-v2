import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourseQueryKey, Course } from "../course/course.client";

const VIDEO_ENDPOINT = "/api/video";

export function useToggleVideoWatchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ videoId }: { videoId: string }) => {
      const response = await fetch(`${VIDEO_ENDPOINT}/watch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to update video watch status"
        );
      }

      return response.json();
    },
    onMutate: async ({ videoId }) => {
      // Find which course contains this video by checking all cached courses
      const queryCache = queryClient.getQueryCache();
      let courseId: string | null = null;
      let previousCourse: Course | null = null;

      // Look through all course queries to find the one containing this video
      queryCache.getAll().forEach((query) => {
        if (query.queryKey[0] === "course") {
          const course = query.state.data as Course;
          if (course?.chapters) {
            for (const chapter of course.chapters) {
              if (chapter.videos.some((video) => video.id === videoId)) {
                courseId = query.queryKey[1] as string;
                previousCourse = course;
                return;
              }
            }
          }
        }
      });

      if (!courseId || !previousCourse) {
        throw new Error("Video not found in cached courses");
      }

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: getCourseQueryKey(courseId),
      });

      // Optimistically update the cache
      queryClient.setQueryData(getCourseQueryKey(courseId), (old: Course) => {
        const newCourse = { ...old };
        let totalWatchedChange = 0;

        newCourse.chapters = old.chapters.map((chapter) => ({
          ...chapter,
          videos: chapter.videos.map((video) => {
            if (video.id === videoId) {
              const newWatchedStatus = !video.isWatched;
              totalWatchedChange = newWatchedStatus ? 1 : -1;
              return { ...video, isWatched: newWatchedStatus };
            }
            return video;
          }),
        }));

        // Update the watched count
        newCourse.watchedCount = (old.watchedCount || 0) + totalWatchedChange;

        return newCourse;
      });

      return { previousCourse, courseId, videoId };
    },
    onError: (_, __, context) => {
      // Rollback on error
      if (context?.previousCourse && context?.courseId) {
        queryClient.setQueryData(
          getCourseQueryKey(context.courseId),
          context.previousCourse
        );
      }
    },
    onSettled: (_, __, ___, context) => {
      // Refetch to ensure consistency
      if (context?.courseId) {
        queryClient.invalidateQueries({
          queryKey: getCourseQueryKey(context.courseId),
        });
      }
    },
  });
}
