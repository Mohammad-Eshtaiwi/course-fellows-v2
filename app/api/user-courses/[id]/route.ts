import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/app/api/utils/responseBuilder";
import { getUserCourse } from "./getUserCourse";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const user = await auth();
  if (!user) {
    return buildErrorResponse(401, "Unauthorized");
  }

  const { id } = params;
  if (!id) {
    return buildErrorResponse(400, "Course ID is required");
  }

  const course = await getUserCourse(id);
  if (!course) {
    return buildErrorResponse(404, "Course not found");
  }

  return buildSuccessResponse(course, 200);
}
