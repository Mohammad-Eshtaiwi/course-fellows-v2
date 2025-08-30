import { CreateChapterSchema } from "@/app/api/chapters/[courseId]/schema";
import { OrganizeChaptersSchema } from "@/app/api/chapters/[courseId]/organize/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course, CourseChapter } from "@prisma/client";
import { useRouter } from "next/navigation";

type CourseWithChapters = Course & { chapters: CourseChapter[] };

const CHAPTERS_ENDPOINT = "/api/chapters";

export function useUpdateChapterTitle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      chapterId,
      title,
    }: {
      courseId: string;
      chapterId: string;
      title: string;
    }) => {
      const response = await fetch(
        `${CHAPTERS_ENDPOINT}/${courseId}/${chapterId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ title }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update chapter title");
      }
      return response.json();
    },
    onMutate: async ({ courseId, chapterId, title }) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] });
      const previousCourse = queryClient.getQueryData(["course", courseId]);

      queryClient.setQueryData(
        ["course", courseId],
        (old: CourseWithChapters) => ({
          ...old,
          chapters: old.chapters.map((chapter: CourseChapter) =>
            chapter.id === chapterId ? { ...chapter, title } : chapter
          ),
        })
      );

      return { previousCourse, courseId };
    },
    onError: (_, variables, context) => {
      if (context?.previousCourse) {
        queryClient.setQueryData(
          ["course", variables.courseId],
          context.previousCourse
        );
      }
    },
    onSettled: (_, __, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });
}

export function useCreateChapter(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      title,
    }: {
      courseId: string;
    } & CreateChapterSchema) => {
      const response = await fetch(`${CHAPTERS_ENDPOINT}/${courseId}`, {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to create chapter");
      }
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      return response.json();
    },
    onSuccess,
  });
}

export function useOrganizeChapters() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      chapters,
    }: {
      courseId: string;
      chapters: OrganizeChaptersSchema;
    }) => {
      const response = await fetch(
        `${CHAPTERS_ENDPOINT}/${courseId}/organize`,
        {
          method: "POST",
          body: JSON.stringify(chapters),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to organize chapters");
      }
      return response.json();
    },
    onSuccess: (_, { courseId }) => {
      // go to  course page
      router.push(`/courses/${courseId}`);
    },
    onSettled: (_, __, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });
}
