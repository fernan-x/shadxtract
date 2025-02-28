import { LucideProps } from 'lucide-react';

export enum TaskType {
    LAUNCH_BROWSER = 'LAUNCH_BROWSER',
    PAGE_TO_HTML = 'PAGE_TO_HTML',
    EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT',
}

export enum TaskParamType {
    STRING = 'STRING',
    BROWSER_INSTANCE = 'BROWSER_INSTANCE',
}

export type TaskInputType = {
    name: string;
    type: TaskParamType;
    helperText?: string;
    required?: boolean;
    hideHandle?: boolean;
    [key: string]: unknown;
}

export type TaskOutputType = {
    name: string;
    type: TaskParamType;
    [key: string]: unknown;
}

export type Task = {
    type: TaskType;
    label: string;
    icon: (props: LucideProps) => JSX.Element;
    isEntryPoint?: boolean;
    inputs: TaskInputType[];
    outputs: TaskOutputType[];
}