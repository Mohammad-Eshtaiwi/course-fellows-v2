import { useCourse } from "@/app/hooks/course/course.client";
import { useParams, redirect } from "next/navigation";
import styles from "./course.module.scss";
import Container from "@/app/components/Container";
import clsx from "clsx";
import CourseSideBar from "./components/CourseSideBar";
import VideosList from "./components/VideosList";

export default function CourseScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useCourse(id);


  if (isLoading) {
    return <Container className={clsx(styles.courseScreen)}>
      <div>Loading...</div>
    </Container>
  }

  if (!course) {
    redirect("/");
  }

  return (
    <Container className={clsx(styles.courseScreen)}>
      <CourseSideBar />
      <VideosList className={styles.videoList} />
    </Container>
  );
}
