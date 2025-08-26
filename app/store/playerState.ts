import { create } from "zustand";

interface PlayerState {
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
}

const usePlayerState = create<PlayerState>((set) => ({
  currentTime: 0,
  setCurrentTime: (currentTime: number) => set({ currentTime }),
}));

export default usePlayerState;
