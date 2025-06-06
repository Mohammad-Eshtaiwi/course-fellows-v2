import styles from "./chapter.module.scss";
import { Title } from "./components/Title";
interface ChapterProps {
  title: string;
  state: "completed" | "in-progress" | "not-started";
  count: number;
  children: React.ReactNode;
  id: string;
}

function Chapter({ title, state, count, children, id }: ChapterProps) {
  return (
    <div>
      <div className={`${styles.header} heading-s`}>
        <span className={`${styles.state}`} data-state={state} />
        <Title title={title} count={count} chapterId={id} />
      </div>
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
}

export default Chapter;
