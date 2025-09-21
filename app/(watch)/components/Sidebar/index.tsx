"use client";
import { useCourse } from "@/app/hooks/course/course.client";
import { useToggleVideoWatchStatus } from "@/app/hooks/video/video.client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./sidebar.module.scss";
import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import courseMetaStyles from "@/app/style/modules/courseMeta.module.scss";
import { formatDurationToHoursMinutes } from "@/app/utils/common.utils";
import { BsCaretDownFill, BsCaretUpFill, BsClock } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import WatchedStatus from "@/app/components/WatchedStatus";
export default function Sidebar() {
  const { id, videoId } = useParams();
  const { data: course } = useCourse(id as string);
  const toggleWatchStatus = useToggleVideoWatchStatus();

  const [showSidebar, setShowSidebar] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const handleToggleWatchStatus = (videoId: string) => {
    toggleWatchStatus.mutate({ videoId });
  };

  useEffect(() => {
    const header = document.getElementById("header");

    setHeaderHeight(header!.clientHeight);
  }, []);

  return (
    <>
      <aside
        className={styles.sidebar}
        data-show-sidebar={showSidebar}
        data-header-height={headerHeight}
        style={{
          height: showSidebar ? `calc(100vh - ${headerHeight}px)` : undefined,
        }}
      >
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
            {formatDurationToHoursMinutes(course?.duration ?? 0)}
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
              <h2 key={chapter.id} className={styles.chapterTitle}>
                {chapter.title}
              </h2>
              <div className={styles.videos}>
                {chapter.videos.map((video, idx) => (
                  <div
                    className={clsx(styles.video, {
                      "border-dividor-bottom":
                        idx !== chapter.videos.length - 1,
                    })}
                    key={video.id}
                  >
                    <Link
                      href={`/watch/${id}/${video.id}`}
                      className={clsx(styles.videoTitle, {
                        [styles.activeVideo]: video.id === videoId,
                      })}
                      onClick={() => setShowSidebar(false)}
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
      <button
        className={styles.toggleSidebarButton}
        onClick={toggleSidebar}
        data-is-open={showSidebar}
      >
        {showSidebar ? (
          <BsCaretDownFill size={32} />
        ) : (
          <BsCaretUpFill size={32} />
        )}
      </button>
    </>
  );
}
