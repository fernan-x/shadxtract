import { Task, TaskType } from '@/ui/types/task';
import { LaunchBrowserTask } from './launch-browser';
import { PageToHtmlTask } from './page-to-html';

export const TaskRegistry: Record<TaskType, Task> = {
    [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
    [TaskType.PAGE_TO_HTML]: PageToHtmlTask,
}