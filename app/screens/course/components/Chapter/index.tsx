import styles from "./chapter.module.scss";
interface ChapterProps {
  title: string;
  state: "completed" | "in-progress" | "not-started";
  count: number;
  children: React.ReactNode;
}

function Chapter({ title, state, count, children }: ChapterProps) {
  return (
    <div>
      <div className={`${styles.header} heading-s`}>
        <span className={`${styles.state}`} data-state={state} />
        <h3 className={`${styles.title} heading-m`}>
          {title} <span>({count})</span>
        </h3>
      </div>
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
}

export default Chapter;
