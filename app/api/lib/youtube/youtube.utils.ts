/**
 * Calculates the duration of a chapter based on its position in the chapters array
 * @param currentChapter - The current chapter object
 * @param nextChapter - The next chapter object (undefined if current is last)
 * @param videoDuration - Total video duration in seconds
 * @returns Duration of the current chapter in seconds
 */
const calculateChapterDuration = (
  currentChapter: { totalSeconds: number },
  nextChapter: { totalSeconds: number } | undefined,
  videoDuration: number
): number => {
  return nextChapter
    ? nextChapter.totalSeconds - currentChapter.totalSeconds
    : videoDuration - currentChapter.totalSeconds;
};

export const chaptersExtractor = (
  description: string,
  videoDuration: number
) => {
  // Regular expression to match timestamps in format HH:MM:SS or MM:SS followed by chapter title
  // Example matches:
  // "0:00 Introduction"
  // "1:30 Getting Started"
  // "1:05:45 Advanced Topics"
  // "0:00Introduction" (no space)
  // "- 00:00 Title" (with bullet/dash prefix)
  // "• 02:30 Title" (with bullet point prefix)
  //
  // Regex breakdown:
  // (?:^|\n)                    - Start of line or newline
  // [-•*]?\s*                   - Optional bullet character (-, •, *) followed by optional whitespace
  // (?:(?:(\d{1,2}):)?         - Optional hours (1-2 digits) followed by colon
  // (\d{1,2}):                  - Minutes (1-2 digits) followed by colon
  // (\d{2}))                    - Seconds (exactly 2 digits)
  // \s*                         - Zero or more whitespace characters (handles titles with or without space)
  // (.+?)                       - Chapter title (any characters, non-greedy)
  // (?=\n[-•*]?\s*(?:(?:\d{1,2}:)?\d{1,2}:\d{2})|$)  - Look ahead for next timestamp line or end of string
  const timestampRegex =
    /(?:^|\n)[-•*]?\s*(?:(?:(\d{1,2}):)?(\d{1,2}):(\d{2}))\s*(.+?)(?=\n[-•*]?\s*(?:(?:\d{1,2}:)?\d{1,2}:\d{2})|$)/g;
  const chapters: {
    timestamp: string;
    title: string;
    totalSeconds: number;
  }[] = [];
  let match;

  while ((match = timestampRegex.exec(description)) !== null) {
    const [, hours, minutes, seconds, title] = match;

    // Convert to seconds for total passed time
    const totalSeconds =
      (hours ? parseInt(hours) * 3600 : 0) +
      parseInt(minutes) * 60 +
      parseInt(seconds);

    // Format timestamp as YouTube URL format (e.g., ?t=1h2m30s)
    let formattedTimestamp = "";
    if (hours) formattedTimestamp += `${hours}h`;
    if (minutes) formattedTimestamp += `${minutes}m`;
    formattedTimestamp += `${seconds}s`;

    chapters.push({
      timestamp: formattedTimestamp,
      title: title.trim().replace(/^[^\p{L}\p{N}]+/u, ""),
      totalSeconds,
    });
  }

  return chapters.map((chapter, idx) => ({
    title: chapter.title,
    timestamp: chapter.timestamp,
    duration: calculateChapterDuration(
      chapter,
      chapters[idx + 1],
      videoDuration
    ),
  }));
};
