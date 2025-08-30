import { Course } from "@/app/hooks/course/course.client";
import {
  ChapterWithNew,
  createNewChapter,
  isDefaultChapter,
  splitVideos,
} from "../utils/chapter.utils";

type ChapterState = {
  chapters: ChapterWithNew[] | null;
  deletedChapters: string[];
};

type ChapterAction =
  | { type: "INIT_CHAPTERS"; payload: Course["chapters"] }
  | {
      type: "CREATE_CHAPTER";
      payload: {
        title: string;
        chapterIndex: number;
        videoIndex: number;
        courseId: string;
      };
    }
  | { type: "DELETE_CHAPTER"; payload: { id: string; course: Course } }
  | { type: "RESET_CACHE"; payload: Course["chapters"] }
  | { type: "UPDATE_CHAPTER"; payload: { id: string; title: string } };

export function chapterReducer(
  state: ChapterState,
  action: ChapterAction
): ChapterState {
  switch (action.type) {
    case "INIT_CHAPTERS":
      return {
        ...state,
        chapters: action.payload.map((chapter) => ({
          ...chapter,
          isNew: false,
        })),
      };

    case "CREATE_CHAPTER": {
      if (!state.chapters) return state;

      const { title, chapterIndex, videoIndex, courseId } = action.payload;
      const currentChapter = state.chapters[chapterIndex];

      // Handle updating default chapter title
      if (isDefaultChapter(state.chapters)) {
        return {
          ...state,
          chapters: state.chapters.map((chapter, idx) =>
            idx === 0 ? { ...chapter, title, isNew: false } : chapter
          ),
        };
      }

      // Create new chapter
      const newChapter = createNewChapter(title, courseId);
      const { remainingVideos, movedVideos } = splitVideos(
        currentChapter.videos,
        videoIndex
      );

      // Update videos with new chapterId
      const videosWithChapterId = movedVideos.map((video) => ({
        ...video,
        chapterId: newChapter.id,
      }));

      // Create updated chapter copies
      const updatedNewChapter = {
        ...newChapter,
        videos: videosWithChapterId,
      };

      const newChapters = [...state.chapters];
      newChapters[chapterIndex] = {
        ...currentChapter,
        videos: remainingVideos,
      };
      newChapters.splice(chapterIndex + 1, 0, { ...updatedNewChapter });

      return {
        ...state,
        chapters: newChapters,
      };
    }

    case "DELETE_CHAPTER": {
      if (!state.chapters) {
        return state;
      }

      // Find the chapter to delete and its index
      const chapterIndex = state.chapters.findIndex(
        (chapter) => chapter.id === action.payload.id
      );

      if (chapterIndex === -1) {
        return state;
      }

      const chapterToDelete = JSON.parse(
        JSON.stringify(state.chapters[chapterIndex])
      );
      const remainingChapters = JSON.parse(JSON.stringify(state.chapters));

      // Move videos to adjacent chapter if any exist
      if (chapterToDelete.videos.length > 0) {
        // Try to get previous chapter first
        const prevChapter = remainingChapters[chapterIndex - 1];
        const nextChapter = remainingChapters[chapterIndex + 1];

        if (prevChapter) {
          // If moving to previous chapter, append at the end
          prevChapter.videos = [
            ...prevChapter.videos,
            ...chapterToDelete.videos,
          ];
        } else if (nextChapter) {
          // If moving to next chapter, prepend at the beginning
          nextChapter.videos = [
            ...chapterToDelete.videos,
            ...nextChapter.videos,
          ];
        }
      }

      // Remove the chapter
      remainingChapters.splice(chapterIndex, 1);

      return {
        deletedChapters: [...state.deletedChapters, action.payload.id],
        chapters:
          remainingChapters.length > 0
            ? remainingChapters
            : action.payload.course.chapters.map((chapter) => ({
                ...chapter,
                isNew: false,
              })),
      };
    }

    case "UPDATE_CHAPTER": {
      if (!state.chapters) return state;

      const { id, title } = action.payload;
      const newChapters: ChapterWithNew[] = JSON.parse(
        JSON.stringify(state.chapters)
      ).map((chapter: ChapterWithNew) =>
        chapter.id === id ? { ...chapter, title } : chapter
      );

      return {
        ...state,
        chapters: newChapters,
      };
    }

    case "RESET_CACHE":
      return {
        chapters: action.payload.map((chapter) => ({
          ...chapter,
          isNew: false,
        })),
        deletedChapters: [],
      };

    default:
      return state;
  }
}
