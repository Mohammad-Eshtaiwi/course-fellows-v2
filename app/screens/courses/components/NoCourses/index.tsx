import styles from "../../courses.module.scss";

const NoCourses = () => (
  <div className={styles.noCourses}>
    <p className="body-l">
      You have no courses. Create a new course to get started.
    </p>
  </div>
);

export default NoCourses;
