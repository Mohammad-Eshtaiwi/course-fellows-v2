"use client";
import { useCourse } from "@/app/hooks/course/course.client";
import { useToggleVideoWatchStatus } from "@/app/hooks/video/video.client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./sidebar.module.scss";
import { Fragment } from "react";
import clsx from "clsx";
import courseMetaStyles from "@/app/style/modules/courseMeta.module.scss";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";
import { BsClock } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import WatchedStatus from "@/app/components/WatchedStatus";
export default function Sidebar() {
  const { id, videoId } = useParams();
  const { data: course } = useCourse(id as string);
  const toggleWatchStatus = useToggleVideoWatchStatus();

  const handleToggleWatchStatus = (videoId: string) => {
    toggleWatchStatus.mutate({ videoId });
  };

  return (
    <aside className={styles.sidebar}>
      <Link
        href={`/courses/${id}`}
        className={clsx("heading-xl", styles.sidebarHeaderTitle)}
      >
        {course?.title}
      </Link>
      <div
        className={clsx(
          courseMetaStyles.courseMeta,
          styles.sidebarHeaderMeta,
          "border-dividor-bottom"
        )}
      >
        <p className={`${courseMetaStyles.courseCardDuration} body-s`}>
          <BsClock className={courseMetaStyles.icon} />
          {formatDurationToHoursMinutes(course?.duration!)}
        </p>
        <p className={`${courseMetaStyles.totalVideos} body-s`}>
          <MdOndemandVideo className={courseMetaStyles.icon} />
          Watched {course?.watchedCount} out of {course?.videoCount} videos
        </p>
      </div>
      <div className={styles.sidebarContent}>
        {course?.chapters.map((chapter) => (
          <Fragment key={chapter.id}>
            {/* TODO: Add chapter title here */}
            {/* <Link href={`/watch/${id}/${chapter.id}`} key={chapter.id}>{chapter.title}</Link> */}
            <div className={styles.videos}>
              {chapter.videos.map((video) => (
                <div className={styles.video} key={video.id}>
                  <Link
                    href={`/watch/${id}/${video.id}`}
                    className={clsx(styles.videoTitle, "heading-m", {
                      [styles.activeVideo]: video.id === videoId,
                    })}
                  >
                    {video.title}
                  </Link>
                  <div className={styles.videoMeta}>
                    <p
                      className={`${courseMetaStyles.courseCardDuration} body-s`}
                    >
                      <BsClock className={courseMetaStyles.icon} />
                      {formatDurationToHoursMinutes(video.duration)}
                    </p>
                    <button
                      className={styles.watchedStatusButton}
                      onClick={() => handleToggleWatchStatus(video.id)}
                      disabled={toggleWatchStatus.isPending}
                    >
                      <WatchedStatus isWatched={video.isWatched} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </aside>
  );
}
