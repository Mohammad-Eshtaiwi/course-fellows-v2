import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "./layout.module.scss";
console.log(styles);

interface CoursesLayoutProps {
  children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
