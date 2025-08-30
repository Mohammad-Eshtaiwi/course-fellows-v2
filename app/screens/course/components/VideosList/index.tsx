import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { useCourseFromCache } from "@/app/hooks/course/course.client";
import clsx from "clsx";
import { Fragment } from "react";
import styles from "./videosList.module.scss";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";
import Link from "next/link";
import Image from "next/image";

export default function VideosList({ className }: { className?: string }) {
  const course = useCourseFromCache();

  return (
    <div className={clsx(styles.videoList, className)}>
      {course?.chapters.map((chapter) => (
        <Fragment key={chapter.id}>
          {COURSE_DEFAULT_NAME !== chapter.title && (
            <div className={styles.chapterItem}>
              <h2>{chapter.title}</h2>
            </div>
          )}
          <div className={styles.videoList}>
            {chapter.videos.map((video) => (
              <Link
                href={`/watch/${course.id}/${video.id}`}
                key={video.id}
                className={styles.videoItem}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  className={styles.thumbnail}
                  width={160}
                  height={90}
                />
                <div className={styles.videoInfo}>
                  <h3>{video.title}</h3>
                  <div className={styles.videoInfoBottom}>
                    <p className={styles.duration}>
                      {formatDurationToHoursMinutes(video.duration)}
                    </p>
                    {video.isWatched && (
                      <div
                        className={`${styles.watchedStatus} ${styles.isWatched}`}
                      >
                        <span className={styles.circle}></span>
                        <span className={styles.label}>Watched</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
