import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import clsx from "clsx";

export default function Footer() {
  return (
    <footer className={clsx(styles.footer, "container")}>
      <p>Copyright © 2025</p>

      <Link className={clsx(styles.logo)} href="/">
        <Image
          src="/logo-with-text.svg"
          alt="logo"
          width={227.25}
          height={44}
          sizes="(max-width: 768px) 100px, 127.25px"
        />
      </Link>
      <Link href="/privacy">Privacy Policy</Link>
    </footer>
  );
}
