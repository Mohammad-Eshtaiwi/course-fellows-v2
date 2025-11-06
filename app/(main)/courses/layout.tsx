import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "@/app/style/modules/mainLayout.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Courses",
  description:
    "Discover and organize YouTube courses for your learning journey. Track progress, create custom playlists, and learn at your own pace.",
  openGraph: {
    title: "Browse Courses | Course Fellows",
    description:
      "Discover and organize YouTube courses for your learning journey.",
  },
};

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
