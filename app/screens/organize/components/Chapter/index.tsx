import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import IconButton from "@/app/components/IconButton";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { ChapterWithNew } from "../../utils/chapter.utils";
import styles from "../../organize.module.scss";
import { useDialog } from "@/app/hooks/useDialog";
import UpdateChapterModal from "./UpdateChapterModal";
interface ChapterProps {
  chapter: ChapterWithNew;
  children: React.ReactNode;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  chaptersLength: number;
}

export default function Chapter({
  children,
  chapter,
  onDelete,
  chaptersLength,
  onUpdate,
}: ChapterProps) {
  const { isOpen, open, close } = useDialog();
  return (
    <div>
      {chapter.title === COURSE_DEFAULT_NAME ? null : (
        <h4 className={styles.chapterTitle}>
          {chaptersLength > 1 && (
            <IconButton
              icon={IoTrashOutline}
              variant="danger"
              size="sm"
              circle
              onClick={() => onDelete(chapter.id)}
            />
          )}
          <IconButton
            icon={IoPencilOutline}
            variant="primary"
            size="sm"
            circle
            onClick={open}
          />
          <span>{chapter.title}</span>
        </h4>
      )}
      {children}
      <UpdateChapterModal
        isOpen={isOpen}
        onClose={close}
        onUpdate={(title) => onUpdate(chapter.id, title)}
        initialTitle={chapter.title}
      />
    </div>
  );
}
