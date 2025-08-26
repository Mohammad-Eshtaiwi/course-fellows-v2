import { Course } from "@/app/hooks/courses/courses.client";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import styles from "./styles.module.scss";

import IconButton from "@/app/components/IconButton";
import Progress from "@/app/components/Progress";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";
import { IoMdTrash } from "react-icons/io";
import Link from "next/link";
import clsx from "clsx";

interface CourseCardProps {
  course: Course;
  onDelete: (course: Course) => void;
}

function CourseCard({ course, onDelete }: CourseCardProps) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    onDelete(course);
  };

  const courseMetaStyle = clsx("border-dividor", styles.courseMeta);

  return (
    <article className={`${styles.courseCard} shadow-primary-light`}>
      <Link
        href={`/courses/${course.id}`}
        className={styles.courseCardImageWrapper}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className={styles.courseImage}
        />
      </Link>
      <div className={styles.courseCardContent}>
        <Link href={`/courses/${course.id}`}>
          <h3 className={` heading-l truncate`}>{course.title}</h3>
        </Link>
        <Progress value={course.progress.average} className={styles.progress} />

        <div className={styles.nextVideo}>
          <button className={styles.nextVideoButton}>
            <FaPlay />
          </button>
          <Link
            href={`/watch/${course.id}/${course.nextVideo.id}`}
            className={styles.nextVideoInfo}
          >
            <p className={`${styles.nextVideoTitle} heading-m truncate`}>
              {course.nextVideo.title}
            </p>
            <p className={`body-s ${styles.nextVideoDuration}`}>
              {formatDurationToHoursMinutes(course.nextVideo.duration)}
            </p>
          </Link>
        </div>
        <div className={courseMetaStyle}>
          <p className={`${styles.courseCardDuration} body-s`}>
            <BsClock className={styles.icon} />
            {formatDurationToHoursMinutes(course.totalDuration)}
          </p>
          <p className={`${styles.totalVideos} body-s`}>
            <MdOndemandVideo className={styles.icon} />
            {course.progress.total} videos
          </p>
          <IconButton
            className={styles.deleteButton}
            icon={IoMdTrash}
            circle
            size="sm"
            variant="danger"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
