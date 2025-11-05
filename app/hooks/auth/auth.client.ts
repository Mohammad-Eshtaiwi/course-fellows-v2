"use client";

import { useSession } from "next-auth/react";

/**
 * Hook to check if user is logged in
 * @returns boolean - true if user is authenticated, false otherwise
 */
export function useIsLoggedIn(): boolean {
  const { status } = useSession();
  return status === "authenticated";
}

/**
 * Hook to check if authentication is loading
 * @returns boolean - true if loading, false otherwise
 */
export function useAuthLoading(): boolean {
  const { status } = useSession();
  return status === "loading";
}

/**
 * Comprehensive auth hook that provides session data and helper states
 * @returns object with session data and helper booleans
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    user: session?.user,
    isLoggedIn: status === "authenticated",
    isLoading: status === "loading",
    isUnauthenticated: status === "unauthenticated",
  };
}

