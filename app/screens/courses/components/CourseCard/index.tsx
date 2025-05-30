import { Course } from "@/app/hooks/courses/courses.client";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import styles from "./styles.module.scss";

import IconButton from "@/app/components/IconButton";
import Progress from "@/app/components/Progress";
import { formatTimeDuration } from "@/app/utils/common.utils";
import { IoMdTrash } from "react-icons/io";
import Link from "next/link";

function CourseCard({ course }: { course: Course }) {
  return (
    <article className={`${styles.courseCard} shadow-primary-light`}>
      <Link
        href={`/courses/${course.id}`}
        className={styles.courseCardImageWrapper}
      >
        <Image
          src={course.thumbnailUrl}
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
          <div className={styles.nextVideoInfo}>
            <p className={`${styles.nextVideoTitle} heading-m truncate`}>
              {course.nextVideo.title}
            </p>
            <p className={`body-s ${styles.nextVideoDuration}`}>
              {formatTimeDuration(course.nextVideo.duration)}
            </p>
          </div>
        </div>
        <div className={styles.courseMeta}>
          <p className={`${styles.courseCardDuration} body-s`}>
            <BsClock className={styles.icon} />
            {formatTimeDuration(course.totalDuration)}
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
          />
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
