"use client";

import { useState } from "react";
import Container from "@/app/components/Container";
import styles from "./courses.module.scss";
import { useCourses, Course } from "@/app/hooks/courses/courses.client";
import CoursesHeader from "./components/CoursesHeader";
import CoursesList from "./components/CoursesList";
import NoCourses from "./components/NoCourses";
import LoadingState from "./components/LoadingState";
import AddCourseDialog from "./components/AddCourseDialog";
import DeleteCourseDialog from "./components/DeleteCourseDialog";

export default function CoursesScreen() {
  const { data, isLoading } = useCourses();
  const coursesCount = data?.length || 0;
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const handleOpenAddCourseDialog = () => {
    setIsAddCourseDialogOpen(true);
  };

  const handleCloseAddCourseDialog = () => {
    setIsAddCourseDialogOpen(false);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteCourseDialogOpen(true);
  };

  const handleCloseDeleteCourseDialog = () => {
    setIsDeleteCourseDialogOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className={styles.coursesPage}>
      <Container className={styles.coursesContainer}>
        <CoursesHeader 
          count={coursesCount} 
          onAddCourse={handleOpenAddCourseDialog}
        />

        {isLoading ? (
          <LoadingState />
        ) : coursesCount > 0 && data ? (
          <CoursesList courses={data} onDeleteCourse={handleDeleteCourse} />
        ) : (
          <NoCourses />
        )}
      </Container>

      <AddCourseDialog
        isOpen={isAddCourseDialogOpen}
        onClose={handleCloseAddCourseDialog}
      />
      <DeleteCourseDialog
        isOpen={isDeleteCourseDialogOpen}
        onClose={handleCloseDeleteCourseDialog}
        course={courseToDelete}
      />
    </div>
  );
}
