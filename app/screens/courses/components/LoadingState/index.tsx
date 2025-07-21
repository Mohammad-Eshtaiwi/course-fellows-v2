import Spinner from "@/app/components/Spinner";
import styles from "../../courses.module.scss";

const LoadingState = () => (
  <div className={styles.loadingContainer}>
    <Spinner size="lg" color="primary" />
  </div>
);

export default LoadingState;
