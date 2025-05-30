"use client";

import { signOut } from "next-auth/react";
import Button from "../Button";
import { useState } from "react";

interface SignOutButtonProps {
  text?: string;
}

export default function SignOutButton({
  text = "Sign out",
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? "Signing out..." : text}
      </Button>
    </div>
  );
}
