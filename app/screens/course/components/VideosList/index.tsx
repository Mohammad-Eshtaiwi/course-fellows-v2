import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { useCourseFromCache } from "@/app/hooks/course/course.client";
import clsx from "clsx";
import { Fragment } from "react";
import styles from "./videosList.module.scss";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";

export default function VideosList({ className }: { className?: string }) {
    const course = useCourseFromCache();

    return (
        <div className={clsx(styles.videoList, className)}>
            <div className="video-list">
                {course?.chapters.map((chapter) => (
                    <Fragment key={chapter.id}>
                        {COURSE_DEFAULT_NAME !== chapter.title && (
                            <div className={styles.chapterItem}>
                                <h2>{chapter.title}</h2>
                            </div>
                        )}
                        <div className={styles.videoList}>
                            {chapter.videos.map((video) => (
                                <div key={video.id} className={styles.videoItem}>
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className={styles.thumbnail}
                                    />
                                    <div className={styles.videoInfo}>
                                        <h3>{video.title}</h3>
                                        <div className={styles.videoInfoBottom}>
                                            <p className={styles.duration}>
                                                {formatDurationToHoursMinutes(video.duration)}
                                            </p>
                                            {video.isWatched && (
                                                <div className={`${styles.watchedStatus} ${styles.isWatched}`}>
                                                    <span className={styles.circle}></span>
                                                    <span className={styles.label}>Watched</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}