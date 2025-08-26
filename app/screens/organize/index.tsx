"use client";
import Container from "@/app/components/Container";
import { COURSE_DEFAULT_NAME } from "@/app/constants/constants";
import { useCourse } from "@/app/hooks/course/course.client";
import { useParams } from "next/navigation";
import styles from "./organize.module.scss";
import { Fragment } from "react";

export default function OrganizeScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useCourse(id);

  return (
    <Container>
      <div className={styles.organizeScreen}>
        {course?.chapters.map((chapter) => (
          <Fragment key={chapter.id}>
            {chapter.title === COURSE_DEFAULT_NAME ? null : (
              <h2>{chapter.title}</h2>
            )}
            {chapter.videos.map((video) => (
              <div key={video.id}>
                <button className={styles.video}>{video.title}</button>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </Container>
  );
}
