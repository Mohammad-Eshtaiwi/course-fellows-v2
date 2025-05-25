import { ReactNode } from "react";
import Header from "@/app/layout/header/Header";

interface CoursesLayoutProps {
  children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
