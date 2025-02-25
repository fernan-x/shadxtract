import { TaskType } from '@/ui/types/app-node';
import { GlobeIcon, LucideProps } from 'lucide-react';

export type Task = {
    type: TaskType,
    label: string,
    icon: (props: LucideProps) => JSX.Element,
    isEntryPoint?: boolean,
}

export const LaunchBrowserTask: Task = {
    type: TaskType.LAUNCH_BROWSER,
    label: 'Launch Browser',
    icon: (props: LucideProps) => <GlobeIcon className='stroke-pink-400' {...props} />,
    isEntryPoint: true,
}