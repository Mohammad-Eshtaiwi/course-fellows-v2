"use client";
import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "@/app/style/modules/sidebarLayout.module.scss";
import Sidebar from "./components/Sidebar";
import clsx from "clsx";
import WatchScreen from "@/app/screens/watch";
import { YTPlayerProvider } from "./hooks/ytPlayerContext";

interface CoursesLayoutProps {
  children: ReactNode;
}

export const dynamic = "force-dynamic";

export default function CoursesLayout({}: CoursesLayoutProps) {
  return (
    <YTPlayerProvider>
      <div className={styles.sidebarLayout}>
        <Header />
        <Sidebar />
        <main className={clsx(styles.main, "container")}>
          <WatchScreen />
        </main>
      </div>
    </YTPlayerProvider>
  );
}
