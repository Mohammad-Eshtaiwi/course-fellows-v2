import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./style/main.scss";
import Providers from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Course Fellows - Learn Together from YouTube Courses",
    template: "%s | Course Fellows",
  },
  description:
    "Transform YouTube playlists into structured learning experiences. Track your progress, organize courses, and connect with fellow learners.",
  keywords: [
    "online learning",
    "YouTube courses",
    "learning platform",
    "course organization",
    "video courses",
    "educational platform",
    "study together",
    "learning community",
  ],
  authors: [{ name: "Course Fellows" }],
  creator: "Course Fellows",
  publisher: "Course Fellows",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Course Fellows - Learn Together from YouTube Courses",
    description:
      "Transform YouTube playlists into structured learning experiences. Track your progress, organize courses, and connect with fellow learners.",
    siteName: "Course Fellows",
    images: [
      {
        url: "/heroImg.png",
        width: 1200,
        height: 630,
        alt: "Course Fellows - Learn Together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Course Fellows - Learn Together from YouTube Courses",
    description:
      "Transform YouTube playlists into structured learning experiences. Track your progress, organize courses, and connect with fellow learners.",
    images: ["/heroImg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Course Fellows",
  description:
    "Transform YouTube playlists into structured learning experiences",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/courses?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
