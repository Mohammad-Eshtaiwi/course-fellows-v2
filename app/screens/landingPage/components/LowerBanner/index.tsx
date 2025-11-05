import styles from "./styles.module.scss";
import SigninButton from "@/app/components/SigninButton";
export default function LowerBanner() {
  return (
    <div className={styles.lowerBanner}>
      <p>
        Ready to master your learning? Organize your playlists, track your
        progress, and start growing with CourseFellows today.
      </p>
      <SigninButton text="LETS GET STARTED" />
    </div>
  );
}
