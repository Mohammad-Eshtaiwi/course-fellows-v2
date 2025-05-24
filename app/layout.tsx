import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./style/main.scss";
import Providers from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course Fellows",
  description: "Connect with fellow learners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
