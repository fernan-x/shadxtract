import { Task, TaskType } from '@/ui/types/task';
import { LaunchBrowserTask } from './launch-browser';
import { PageToHtmlTask } from './page-to-html';
import { ExtractTextFromElementTask } from './extract-text-from-element';

export const TaskRegistry: Record<TaskType, Task> = {
    [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
    [TaskType.PAGE_TO_HTML]: PageToHtmlTask,
    [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementTask,
}