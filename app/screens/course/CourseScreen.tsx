import { useCourse } from "@/app/hooks/course/course.client";
import { useParams, redirect } from "next/navigation";
import styles from "./course.module.scss";
import Chapter from "./components/Chapter";
import Video from "./components/Video";
import AddChapter from "./components/AddChapter";

export default function CourseScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useCourse(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    redirect("/");
  }

  return (
    <div className={styles.courseScreen}>
      <div className={`${styles.chaptersWrapper}`}>
        {course.chapters.map((chapter) => (
          <Chapter
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            state={chapter.state}
            count={chapter.videos.length}
          >
            {chapter.videos.map((video) => (
              <Video key={video.id} video={video} />
            ))}
          </Chapter>
        ))}
        <AddChapter />
      </div>
    </div>
  );
}
