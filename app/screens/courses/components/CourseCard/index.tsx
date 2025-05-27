import React from "react";
import styles from "./styles.module.scss";
import { Course } from "@/app/hooks/courses/courses.client";

function CourseCard({ course }: { course: Course }) {
  return (
    <section className={`${styles.courseCard} shadow-primary-light`}>
      <div className={styles.courseCardImage}>
        <img src={course.thumbnailUrl} alt={course.title} />
      </div>
      <div className={styles.courseCardContent}>
        <h3 className={`${styles.courseCardTitle} heading-l`}>
          {course.title}
        </h3>
      </div>
    </section>
  );
}

export default CourseCard;
