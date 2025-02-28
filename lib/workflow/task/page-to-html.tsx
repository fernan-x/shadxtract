import { Task, TaskParamType, TaskType } from '@/ui/types/app-node';
import { CodeIcon, LucideProps } from 'lucide-react';

export const PageToHtmlTask: Task = {
    type: TaskType.PAGE_TO_HTML,
    label: 'Get HTML from the page',
    icon: (props: LucideProps) => <CodeIcon className='stroke-pink-400' {...props} />,
    isEntryPoint: false,
    inputs: [
        {
            name: 'Web page',
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ],
    outputs: [
        {
            name: 'Html',
            type: TaskParamType.STRING,
        },
        {
            name: 'Web page',
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ],
}