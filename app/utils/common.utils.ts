import { formatDuration } from "date-fns";

export function formatDurationToHoursMinutes(durationInSeconds: number) {
  const totalHours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  return (
    formatDuration(
      { hours: totalHours, minutes },
      { format: ["hours", "minutes"] }
    ) || formatDuration({ seconds }, { format: ["seconds"] })
  );
}

export function formatTimeDurationCompact(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

// 01h17m15s => 4635
export function parseTimeToSeconds(timeString: string): number {
  // Match patterns like "01h17m15s", "1h20m", "45m30s", "120s", etc.
  const timeRegex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
  const match = timeString.match(timeRegex);

  if (!match) {
    return 0;
  }

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
}
