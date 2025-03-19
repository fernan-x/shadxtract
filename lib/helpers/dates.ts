import { intervalToDuration } from "date-fns";

export const datesToDurationString = (
  completedAt?: Date | null,
  startedAt?: Date | null,
) => {
  if (!startedAt || !completedAt) {
    return null;
  }

  const timeElapsed = completedAt.getTime() - startedAt.getTime();
  if (timeElapsed < 1000) {
    return `${timeElapsed}ms`;
  }

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
