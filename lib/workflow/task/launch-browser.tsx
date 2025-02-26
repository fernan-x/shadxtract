import { Task, TaskParamType, TaskType } from '@/ui/types/app-node';
import { GlobeIcon, LucideProps } from 'lucide-react';

export const LaunchBrowserTask: Task = {
    type: TaskType.LAUNCH_BROWSER,
    label: 'Launch Browser',
    icon: (props: LucideProps) => <GlobeIcon className='stroke-pink-400' {...props} />,
    isEntryPoint: true,
    inputs: [
        {
            name: 'Website Url',
            type: TaskParamType.STRING,
            helperText: 'eg: https://www.google.com',
            required: true,
            hideHandle: true,
        }
    ]
}