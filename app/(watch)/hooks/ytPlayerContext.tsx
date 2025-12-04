"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

export interface YTPlayerContextType {
  playerRef: RefObject<YT.Player | null>;
  playerIsReady: boolean;
  setPlayerIsReady: Dispatch<SetStateAction<boolean>>;
}

const YTPlayerContext = createContext<YTPlayerContextType | null>(null);

interface YTPlayerProviderProps {
  children: ReactNode;
}

export function YTPlayerProvider({ children }: YTPlayerProviderProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const [playerIsReady, setPlayerIsReady] = useState(false);

  return (
    <YTPlayerContext.Provider
      value={{ playerRef, playerIsReady, setPlayerIsReady }}
    >
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
