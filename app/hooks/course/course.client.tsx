import { getUserCourse } from "@/app/api/user-courses/[id]/getUserCourse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const COURSE_ENDPOINT = "/api/user-courses";

export type Course = Exclude<Awaited<ReturnType<typeof getUserCourse>>, null>;

export const getCourseQueryKey = (id: string) => ["course", id];

export function useCourse(id: string) {
  return useQuery<Course>({
    queryKey: getCourseQueryKey(id),
    queryFn: async () => {
      const response = await fetch(`${COURSE_ENDPOINT}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json().then((data) => data.data);
    },
  });
}

export function useCourseFromCache() {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const course = queryClient.getQueryData<Course>(getCourseQueryKey(id))!;
  return course;
}
