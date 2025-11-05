import styles from "./styles.module.scss";
import { FaCheck } from "react-icons/fa";

export default function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardIconBackground}>
        <span className={styles.cardIcon}>
          <FaCheck size={24} />
        </span>
      </span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <span className={styles.separator}>
        <span className={styles.separatorBg} />
      </span>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
}
