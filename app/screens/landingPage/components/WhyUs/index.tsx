import Card from "./Card";
import styles from "./styles.module.scss";
import clsx from "clsx";
export default function WhyUs() {
  return (
    <div className={clsx(styles.whyUs, "container")}>
      <h2 className={clsx(styles.heading, "heading-xl")}>
        Why Course Fellows?
      </h2>
      <div className={styles.cards}>
        <Card
          title="Easy to use"
          text="Our platform is designed to be easy to use, with a simple and intuitive interface."
        />
        <Card
          title="Track your progress"
          text="Always know what’s completed and what’s next."
        />
        <Card
          title="Centralized playlists"
          text="All your playlists in one place, organized and ready to learn."
        />
        <Card
          title="Stay organized"
          text="Gentle reminders help you keep learning on track."
        />
      </div>
    </div>
  );
}
