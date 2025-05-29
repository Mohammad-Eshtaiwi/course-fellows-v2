import { intervalToDuration, formatDuration } from 'date-fns';

export function formatTimeDuration(duration: number) {
  const durationObj = intervalToDuration({ start: 0, end: duration * 1000 });
  return formatDuration(durationObj, { format: ["hours", "minutes"] });
}