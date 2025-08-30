import { useCourseFromCache } from "@/app/hooks/course/course.client";
import clsx from "clsx";
import styles from "./courseSideBar.module.scss";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";
import { BsClock } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import courseMetaStyles from "@/app/style/modules/courseMeta.module.scss";
import Progress from "@/app/components/Progress";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button";

export default function CourseSideBar() {
  const course = useCourseFromCache();
  const courseMetaStyle = clsx("border-dividor", courseMetaStyles.courseMeta);
  return (
    <div className={styles.courseSideBar}>
      <figure className={clsx(styles.thumbnail)}>
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          width={354}
          height={200}
        />
      </figure>
      <h2 className="heading-xl">{course?.title}</h2>
      <Progress value={course?.progress} className={styles.progress} />
      <div className={courseMetaStyle}>
        <p className={`${courseMetaStyles.courseCardDuration} body-s`}>
          <BsClock className={courseMetaStyles.icon} />
          {formatDurationToHoursMinutes(course.duration)}
        </p>
        <p className={`${courseMetaStyles.totalVideos} body-s`}>
          <MdOndemandVideo className={courseMetaStyles.icon} />
          {course.videoCount} videos
        </p>
      </div>
      <Link
        className={styles.organizeLink}
        href={`/courses/${course?.id}/organize`}
      >
        <Button variant="primary">Organize Your Course</Button>
      </Link>
    </div>
  );
}
