import styles from "./watched-status.module.scss";

interface WatchedStatusProps {
  isWatched: boolean;
}

export default function WatchedStatus({ isWatched }: WatchedStatusProps) {
  return (
    <span
      className={styles.isWatched}
      data-iswatched={isWatched ? "true" : "false"}
    >
      {isWatched ? "✓" : " "}
    </span>
  );
} 