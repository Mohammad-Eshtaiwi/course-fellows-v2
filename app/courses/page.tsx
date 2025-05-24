"use client";

import React, { Suspense } from "react";
import SignOutButton from "../components/SignOutButton";
import styles from "./courses.module.scss";

// Loading component for suspense
function CoursesLoading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading courses...</p>
    </div>
  );
}

// Main courses content
function CoursesContent() {
  return (
    <div className={styles.coursesPage}>
      <header className={styles.header}>
        <h1>My Courses</h1>
        <SignOutButton />
      </header>
      
      <main className={styles.main}>
        <div className={styles.coursesGrid}>
          {/* Placeholder for course cards */}
          <div className={styles.placeholder}>
            <p>No courses yet. Start by adding a course!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesLoading />}>
      <CoursesContent />
    </Suspense>
  );
}
