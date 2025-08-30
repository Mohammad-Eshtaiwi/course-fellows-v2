import { Course } from "@/app/hooks/course/course.client";
import styles from "../../organize.module.scss";
import AddChapter from "../AddChapter";

interface VideoProps {
  video: Course["chapters"][number]["videos"][number];
  onCreateChapter: (title: string) => void;
  videoIndex: number;
  isDefaultChapter: boolean;
}

export default function Video({
  video,
  onCreateChapter,
  videoIndex,
  isDefaultChapter,
}: VideoProps) {
  return (
    <div className={styles.video}>
      {videoIndex !== 0 || isDefaultChapter ? (
        <div className={styles.videoActions}>
          <AddChapter createChapter={onCreateChapter} />
        </div>
      ) : null}
      <span>{video.title}</span>
    </div>
  );
}
