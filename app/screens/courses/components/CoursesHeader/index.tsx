import Button from "@/app/components/Button";
import styles from "../../courses.module.scss";

interface CoursesHeaderProps {
  count: number;
  onAddCourse: () => void;
}

const CoursesHeader = ({ count, onAddCourse }: CoursesHeaderProps) => (
  <div className={styles.coursesHeader}>
    <p className="heading-l">
      My Courses <sup>({count})</sup>
    </p>
    <Button variant="primary" size="small" onClick={onAddCourse}>
      Create Course
    </Button>
  </div>
);

export default CoursesHeader;
