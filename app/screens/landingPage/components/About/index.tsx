import clsx from "clsx";
import Image from "next/image";
import styles from "./about.module.scss";

export default function About() {
  return (
    <div className={clsx(styles.about)}>
      <div className={clsx(styles.container, "container")}>
        <div className={styles.content}>
          <h2 className="heading-xl">About CourseFellows</h2>
          <p className={styles.text}>
            CourseFellows was built by learners, for learners. We experienced
            the frustration of saving playlists without ever finishing them, so
            we created a tool that turns playlists into structured courses.
            <br />
            Our mission is to help anyone learn consistently, stay motivated,
            and actually complete what they start.
            <br />
            Learner First: Everything we design is focused on making your
            learning easier.
            <br />
            Simplicity: No clutter, no overwhelm. Just a clean dashboard that
            works.
            <br />
            Community: Learning is better together. We’re building tools to
            connect and share.
          </p>
        </div>
        <div className={styles.img}>
          <Image
            src="/about.png"
            alt="about"
            width={500}
            height={500}
            sizes="(max-width: 660px) 300px, (max-width: 1024px) 400px, 500px"
          />
        </div>
      </div>
    </div>
  );
}
