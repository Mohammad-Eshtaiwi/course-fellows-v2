export type Player = HTMLVideoElement & {
    api: {
      seekTo: (time: number) => void;
    };
  }