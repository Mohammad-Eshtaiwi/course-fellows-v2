import { PiPlus } from "react-icons/pi";
import styles from "./addChapter.module.scss";

export default function AddChapter() {
  return (
    <button className={styles.addChapter}>
      <PiPlus className={styles.icon} /> Add a new chapter
    </button>
  );
}
