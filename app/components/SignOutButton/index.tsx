"use client";

import { signOut } from "next-auth/react";
import Button from "../Button";
import { useState } from "react";

interface SignOutButtonProps {
  text?: string;
}

export default function SignOutButton({ text = "Sign out" }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError("Failed to sign out. Please try again.");
      console.error("Sign out error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        onClick={handleSignOut} 
        disabled={isLoading}
      >
        {isLoading ? "Signing out..." : text}
      </Button>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
} 