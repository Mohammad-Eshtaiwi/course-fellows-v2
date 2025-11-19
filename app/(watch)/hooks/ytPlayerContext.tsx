"use client";
import { createContext, useContext, useRef, ReactNode, RefObject } from "react";

export interface YTPlayerContextType {
  playerRef: RefObject<YT.Player | null>;
}

const YTPlayerContext = createContext<YTPlayerContextType | null>(null);

interface YTPlayerProviderProps {
  children: ReactNode;
}

export function YTPlayerProvider({ children }: YTPlayerProviderProps) {
  const playerRef = useRef<YT.Player | null>(null);

  return (
    <YTPlayerContext.Provider value={{ playerRef }}>
      {children}
    </YTPlayerContext.Provider>
  );
}

export function useYTPlayer() {
  const context = useContext(YTPlayerContext);
  if (!context) {
    throw new Error("useYTPlayer must be used within a YTPlayerProvider");
  }
  return context;
}
