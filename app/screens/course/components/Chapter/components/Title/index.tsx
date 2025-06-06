import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { useUpdateChapterTitle } from "@/app/hooks/chapters/chapters.client";
import { useParams } from "next/navigation";

interface TitleProps {
  title: string;
  count: number;
  chapterId: string;
}

export function Title({ title, count, chapterId }: TitleProps) {
  const { id: courseId } = useParams<{ id: string }>();

  const { mutate: updateChapterTitle, isPending } = useUpdateChapterTitle();
  const [isChanging, setIsChanging] = useState(false);
  const [newTitle, setNewTitle] = useState(
    title === COURSE_DEFAULT_NAME ? "" : title
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveTitle = async () => {
    if (newTitle.trim() === title.trim()) {
      setIsChanging(false);
      return;
    }
    updateChapterTitle({ courseId, chapterId, title: newTitle });
    setIsChanging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setIsChanging(false);
      setNewTitle(title === COURSE_DEFAULT_NAME ? "" : title);
      handleSaveTitle();
    }
  };

  useEffect(() => {
    if (isChanging && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isChanging]);

  if (isChanging) {
    return (
      <div className={styles.titleContainer}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={newTitle}
          onChange={handleChange}
          onBlur={handleSaveTitle}
          onKeyDown={handleKeyDown}
          aria-label="Edit chapter title"
          placeholder="Enter chapter title"
          disabled={isPending}
        />
        {isPending && <p className={styles.savingMessage}>Saving...</p>}
      </div>
    );
  }

  return (
    <h3
      className={`${styles.header} heading-m`}
      onClick={() => setIsChanging(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsChanging(true);
        }
      }}
      aria-label="Click to edit chapter title"
    >
      {title === COURSE_DEFAULT_NAME ? "ENTER THE TITLE HERE" : title} ({count})
    </h3>
  );
}
