import { formatTimeDurationCompact } from "@/app/utils/common.utils";
import { CourseVideo } from "@prisma/client";
import WatchedStatus from "@/app/components/WatchedStatus";
import styles from "./video.module.scss";

export default function Video({ video }: { video: CourseVideo }) {
  return (
    <div className={styles.video}>
      <h4 className={`${styles.title} heading-m`}>{video.title}</h4>

      <div className={styles.meta}>
        <span className={styles.duration}>
          {formatTimeDurationCompact(video.duration)}
        </span>
        <WatchedStatus isWatched={video.isWatched} />
      </div>
    </div>
  );
}
