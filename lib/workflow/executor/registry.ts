import { Task, TaskType } from "@/ui/types/task";
import { ExecutionEnvironment } from "@/ui/types/executor";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecutorRegistryFnType<T extends Task> = (
  environment: ExecutionEnvironment<T>,
) => Promise<boolean>;

type ExecutorRegistryType = {
  [K in TaskType]: ExecutorRegistryFnType<Task & { type: K }>;
};

export const ExecutorRegistry: ExecutorRegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};
