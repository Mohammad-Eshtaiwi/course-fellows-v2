import { getUserCourses } from "@/app/api/user-courses/getUserCourses";
import { useQuery } from "@tanstack/react-query";

const COURSES_ENDPOINT = "/api/user-courses";

export type Courses = Awaited<ReturnType<typeof getUserCourses>>;
export type Course = Courses[number];

export function useCourses() {
  return useQuery<Courses>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(COURSES_ENDPOINT);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json().then((data) => data.data);
    },
  });
}
