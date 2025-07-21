import { getUserCourses } from "@/app/api/user-courses/getUserCourses";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const COURSES_ENDPOINT = "/api/user-courses";

export type Courses = Awaited<ReturnType<typeof getUserCourses>>;
export type Course = Courses[number];

export const coursesQueryKey = ["courses"];

export function useCourses() {
  return useQuery<Courses>({
    queryKey: coursesQueryKey,
    queryFn: async () => {
      const response = await fetch(COURSES_ENDPOINT);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json().then((data) => data.data);
    },
  });
}

export function useAddCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, type }: { url: string; type: "playlist" | "video" }) => {
      const response = await fetch(`${COURSES_ENDPOINT}/add?url=${encodeURIComponent(url)}&type=${type}`, {
        method: "GET",
      });
      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.error.message || "Failed to add course");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesQueryKey });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await fetch(`${COURSES_ENDPOINT}/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to delete course");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesQueryKey });
    },
  });
}
