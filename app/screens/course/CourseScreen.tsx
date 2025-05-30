import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import styles from "./course.module.scss";
export default function CourseScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useCourse(id);

  return (
    <div className={styles.courseScreen}>CourseScreen {course?.title}</div>
  );
}
