import { TaskParamType } from '@/ui/types/app-node';

export const ColorForHandle: Record<TaskParamType, string> = {
    [TaskParamType.BROWSER_INSTANCE]: '!bg-sky-400',
    [TaskParamType.STRING]: '!bg-amber-400',
}