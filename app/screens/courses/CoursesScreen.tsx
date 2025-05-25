"use client";

import Container from "@/app/components/Container";
import styles from "./courses.module.scss";
import { useCourses } from "@/app/hooks/courses/courses.client";
import CourseCard from "./components/CourseCard";

export default function CoursesScreen() {
  const { data } = useCourses();

  return (
    <div className={styles.coursesPage}>
      <Container className={styles.coursesContainer}>
        <div className={styles.coursesHeader}>
          <p className="heading-l">
            My Courses <sup>({data?.length})</sup>
          </p>
        </div>
        {data?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Container>
    </div>
  );
}
