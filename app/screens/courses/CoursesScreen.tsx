"use client";

import Container from "@/app/components/Container";
import styles from "./courses.module.scss";
import { useCourses, Courses } from "@/app/hooks/courses/courses.client";
import CourseCard from "./components/CourseCard";
import Spinner from "@/app/components/Spinner";

const CoursesHeader = ({ count }: { count: number }) => (
  <div className={styles.coursesHeader}>
    <p className="heading-l">
      My Courses <sup>({count})</sup>
    </p>
  </div>
);

const CoursesList = ({ courses }: { courses: Courses }) => (
  <div className={styles.coursesGrid}>
    {courses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
);

const NoCourses = () => (
  <div className={styles.noCourses}>
    <p className="body-l">
      You have no courses. Create a new course to get started.
    </p>
  </div>
);

const LoadingState = () => (
  <div className={styles.loadingContainer}>
    <Spinner size="lg" color="primary" />
  </div>
);

export default function CoursesScreen() {
  const { data, isLoading } = useCourses();
  const coursesCount = data?.length || 0;

  return (
    <div className={styles.coursesPage}>
      <Container className={styles.coursesContainer}>
        <CoursesHeader count={coursesCount} />

        {isLoading ? (
          <LoadingState />
        ) : coursesCount > 0 && data ? (
          <CoursesList courses={data} />
        ) : (
          <NoCourses />
        )}
      </Container>
    </div>
  );
}
