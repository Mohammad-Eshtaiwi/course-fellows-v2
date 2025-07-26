import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";
import styles from "@/app/style/modules/sidebarLayout.module.scss";
import Sidebar from "./components/Sidebar";
import clsx from "clsx";

interface CoursesLayoutProps {
    children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
    return (
        <div className={styles.sidebarLayout}>
            <Header />
            <Sidebar />
            <main className={clsx(styles.main, "container")}>{children}</main>
        </div>
    );
}
