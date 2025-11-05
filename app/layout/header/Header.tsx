"use client";

import SignOutButton from "@/app/components/SignOutButton";
import Container from "@/app/components/Container";
import Image from "next/image";
import styles from "./header.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { useIsLoggedIn } from "@/app/hooks/auth";

export default function Header() {
  const isLoggedIn = useIsLoggedIn();
  const logoLinkClasses = clsx("heading-xl", styles.logoLink);

  return (
    <header className={styles.header} id="header">
      <Container>
        <Link className={logoLinkClasses} href="/">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          Course Fellows
        </Link>
        {isLoggedIn && <SignOutButton />}
      </Container>
    </header>
  );
}
