"use client";

import Container from "@/app/components/Container";
import { Suspense } from "react";
import styles from "./courses.module.scss";
import { useCourses } from "@/app/hooks/courses/courses.client";

// Main courses content
function CoursesContent() {
  const { data } = useCourses();

  return (
    <div className={styles.coursesPage}>
      <Container>
        {data?.map((course) => (
          <div key={course.id}>{course.title}</div>
        ))}
      </Container>
    </div>
  );
}

export default function CoursesPage() {
  return <CoursesContent />;
}
