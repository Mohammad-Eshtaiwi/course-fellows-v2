import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "@/app/style/modules/mainLayout.module.scss";

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
