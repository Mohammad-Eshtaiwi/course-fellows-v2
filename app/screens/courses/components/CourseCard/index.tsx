import React from "react";
import styles from "./styles.module.scss";
import { Course } from "@/app/hooks/courses/courses.client";
import { formatDuration, intervalToDuration } from "date-fns";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";

function CourseCard({ course }: { course: Course }) {
  const formatCourseDuration = (duration: number) => {
    const durationObj = intervalToDuration({ start: 0, end: duration * 1000 });
    return formatDuration(durationObj, { format: ['hours', 'minutes'] });
  };

  return (
    <article className={`${styles.courseCard} shadow-primary-light`}>
      <div className={styles.courseCardImage}>
        <Image 
          src={course.thumbnailUrl} 
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className={styles.courseImage}
        />
      </div>
      <div className={styles.courseCardContent}>
        <h3 className={`${styles.courseCardTitle} heading-l`}>
          {course.title}
        </h3>
        <div className={styles.courseMeta}>
          <p className={styles.courseCardDuration}>
            <BsClock className={styles.icon} />
            {formatCourseDuration(course.totalDuration)}
          </p>
          <p className={styles.totalVideos}>
            <MdOndemandVideo className={styles.icon} />
            {course.progress.total} videos
          </p>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
