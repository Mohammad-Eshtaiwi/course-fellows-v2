import Link from "next/link";
import styles from "./privacy.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Course Fellows. Learn how we collect, use, and protect your personal information when you use our learning platform.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacy}>
      <h1>Privacy Policy</h1>
      <p>Last updated: September 29, 2025</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to Course Fellows. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our service.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul>
          <li>Create an account</li>
          <li>Use our services</li>
          <li>Contact us for support</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our Service</li>
          <li>Notify you about changes to our Service</li>
          <li>Provide customer support</li>
          <li>Monitor the usage of our Service</li>
        </ul>
      </section>

      <Link className={styles.backLink} href="/">Back to Home</Link>
    </div>
  );
}
