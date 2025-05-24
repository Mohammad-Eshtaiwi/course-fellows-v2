import SigninButton from "./components/SigninButton";
import styles from "./page.module.scss";
import { FaPaste, FaPlayCircle, FaTable } from "react-icons/fa";

export default async function Home() {
  const iconSize = 48;
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1>Course Fellows</h1>
        <h5>Turn playlists into progress</h5>
        <SigninButton text="Get Started" />
      </div>
      <div className={styles.howItWorks}>
        <h2>How it Works</h2>
        <ul>
          <li>
            <FaPaste size={iconSize} />
            <span>Paste</span>
          </li>
          <li>
            <FaTable size={iconSize} />
            <span>Organize</span>
          </li>
          <li>
            <FaPlayCircle size={iconSize} />
            <span>Learn</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
