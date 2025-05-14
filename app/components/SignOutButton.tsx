"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./SignOutButton.module.css";

export default function SignOutButton() {
  const { data: session } = useSession();
  if(!session) {
    return null;
  }

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
    className={styles.button}
    >
      Sign Out
    </button>
  );
} 