import { Task, TaskType } from '@/ui/types/app-node';
import { LaunchBrowserTask } from './launch-browser';

export const TaskRegistry: Record<TaskType, Task> = {
    [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
}