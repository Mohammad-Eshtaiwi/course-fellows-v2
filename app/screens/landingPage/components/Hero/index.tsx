import styles from "./hero.module.scss";
import Image from "next/image";
import clsx from "clsx";
import SigninButton from "@/app/components/SigninButton";

export default function Hero() {
  return (
    <div className={clsx(styles.hero, "container")}>
      <div className={styles["hero-content"]}>
        <h2 className="heading-xl">
          Turn Your Youtube Educational Content Into Structured Course
        </h2>
        <p>
          Save, organize, and track your learning across YouTube playlists, all
          in one place.
        </p>
        <SigninButton text="GET STARTED" />
      </div>
      <div className={styles["hero-img"]}>
        <Image
          src={"/heroImg.png"}
          width={477}
          height={385}
          alt="hero img"
          sizes="(max-width: 660px) 300px, (max-width: 1024px) 400px, 477px"
        />
      </div>
    </div>
  );
}
