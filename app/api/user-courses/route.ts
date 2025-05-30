import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getUserCourses } from "./getUserCourses";

export async function GET() {
  try {
    const user = await auth();
    if (!user) {
      return buildErrorResponse(401, "Unauthorized");
    }

    const courses = await getUserCourses(user.user);

    return buildSuccessResponse(courses);
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return buildErrorResponse(500, "Failed to fetch courses");
  }
}
