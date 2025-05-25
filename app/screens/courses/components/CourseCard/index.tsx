import React from "react";
import styles from "./styles.module.scss";
import { Course } from "@/app/hooks/courses/courses.client";

function CourseCard({ course }: { course: Course }) {
  return <section>{course.title}</section>;
}

export default CourseCard;
