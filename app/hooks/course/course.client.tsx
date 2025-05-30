import { getUserCourses } from "@/app/api/user-courses/getUserCourses";
import { useQuery } from "@tanstack/react-query";

const COURSE_ENDPOINT = "/api/user-courses";

export type Courses = Awaited<ReturnType<typeof getUserCourses>>;
export type Course = Courses[number];

export function useCourse(id: string) {
  return useQuery<Course>({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await fetch(`${COURSE_ENDPOINT}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json().then((data) => data.data);
    },
  });
}
