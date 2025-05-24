"use client";

import { signIn } from "next-auth/react";
import Button from "../Button";
import { useState } from "react";

interface SigninButtonProps {
  text?: string;
}

export default function SigninButton({ text = "Sign in" }: SigninButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        onClick={handleSignIn} 
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : text}
      </Button>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
