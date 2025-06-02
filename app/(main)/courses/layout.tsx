import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "./layout.module.scss";

interface CoursesLayoutProps {
  children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
