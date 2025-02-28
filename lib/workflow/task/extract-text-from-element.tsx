import { Task, TaskParamType, TaskType } from '@/ui/types/task';
import { LucideProps, TextIcon } from 'lucide-react';

export const ExtractTextFromElementTask: Task = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: 'Extract text from element',
    icon: (props: LucideProps) => <TextIcon className='stroke-pink-400' {...props} />,
    isEntryPoint: false,
    inputs: [
        {
            name: 'Html',
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: 'Selector',
            type: TaskParamType.STRING,
            required: true,
        }
    ],
    outputs: [
        {
            name: 'Extracted text',
            type: TaskParamType.STRING,
        }
    ],
}