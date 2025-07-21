import { Courses, Course } from "@/app/hooks/courses/courses.client";
import CourseCard from "../CourseCard";
import styles from "../../courses.module.scss";

interface CoursesListProps {
  courses: Courses;
  onDeleteCourse: (course: Course) => void;
}

const CoursesList = ({ courses, onDeleteCourse }: CoursesListProps) => (
  <div className={styles.coursesGrid}>
    {courses.map((course) => (
      <CourseCard key={course.id} course={course} onDelete={onDeleteCourse} />
    ))}
  </div>
);

export default CoursesList;
