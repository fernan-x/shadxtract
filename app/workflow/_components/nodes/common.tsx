import { TaskParamType } from "@/ui/types/task";

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.BROWSER_INSTANCE]: "!bg-sky-400",
  [TaskParamType.STRING]: "!bg-amber-400",
};
