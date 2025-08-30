"use client";
import Container from "@/app/components/Container";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import styles from "./organize.module.scss";
import { chapterReducer } from "./state/chapter.reducer";
import Chapter from "./components/Chapter";
import IconButton from "@/app/components/IconButton";
import { FaSave, FaUndo } from "react-icons/fa";
import Video from "./components/Video";
import { isDefaultChapter } from "./utils/chapter.utils";
import { useOrganizeChapters } from "@/app/hooks/chapters/chapters.client";
import { OrganizeChaptersSchema } from "@/app/api/chapters/[courseId]/organize/schema";
import BackLink from "@/app/components/BackLink";

export default function OrganizeScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useCourse(id);

  const { mutate: organizeChapters, isPending } = useOrganizeChapters();

  const [state, dispatch] = useReducer(chapterReducer, {
    chapters: null,
    deletedChapters: [],
  });

  useEffect(() => {
    if (course && !state.chapters) {
      dispatch({ type: "INIT_CHAPTERS", payload: course.chapters });
    }
  }, [course, state.chapters]);

  function handleCreateChapter(
    title: string,
    chapterIndex: number,
    videoIndex: number
  ) {
    if (!course) return;
    dispatch({
      type: "CREATE_CHAPTER",
      payload: { title, chapterIndex, videoIndex, courseId: course.id },
    });
  }

  function handleDeleteChapter(id: string) {
    if (!course) return;
    dispatch({ type: "DELETE_CHAPTER", payload: { id, course } });
  }

  function handleUpdateChapter(id: string, title: string) {
    if (!course) return;
    dispatch({ type: "UPDATE_CHAPTER", payload: { id, title } });
  }

  function handleSave() {
    const { chapters, deletedChapters } = state;

    const newChapters: OrganizeChaptersSchema["newChapters"] = chapters!.filter(
      (chapter) => chapter.isNew
    );

    const oldChapters: OrganizeChaptersSchema["oldChapters"] = chapters!.filter(
      (chapter) => !chapter.isNew
    );

    if (!chapters) return;

    organizeChapters({
      courseId: id,
      chapters: { oldChapters, newChapters, deletedChapters },
    });
  }

  return (
    <Container>
      <div className={styles.organizeScreen}>
        <div className={styles.header}>
          <h2>
            <BackLink className={styles.backLink} />
            Organize Your Course
          </h2>
          <div className={styles.actions}>
            <IconButton
              variant="primary"
              size="md"
              icon={FaSave}
              onClick={handleSave}
              disabled={isPending}
            />
            <IconButton
              variant="primary"
              size="md"
              icon={FaUndo}
              disabled={!course}
              onClick={() => {
                dispatch({ type: "RESET_CACHE", payload: course!.chapters });
              }}
            />
          </div>
        </div>
        {state.chapters?.map((chapter, chapterIndex) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            onDelete={handleDeleteChapter}
            onUpdate={handleUpdateChapter}
            chaptersLength={state.chapters!.length}
          >
            {chapter.videos.map((video, videoIndex) => (
              <Video
                key={video.id}
                video={video}
                videoIndex={videoIndex}
                isDefaultChapter={isDefaultChapter(state.chapters!)}
                onCreateChapter={(title) =>
                  handleCreateChapter(title, chapterIndex, videoIndex)
                }
              />
            ))}
          </Chapter>
        ))}
      </div>
    </Container>
  );
}
