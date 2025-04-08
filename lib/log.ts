import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  LogLevels,
} from "@/ui/types/log";

export const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach((level) => {
    logFunctions[level] = (message: string) => {
      logs.push({
        level,
        message,
        timestamp: new Date(),
      });
    };
  });

  return {
    getAll,
    ...logFunctions,
  };
};
