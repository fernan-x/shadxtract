import { Workflow } from './workflow.entity';

export const WorkflowFactory = {
    create: (data?: Partial<Workflow>): Workflow => {
        return {
            id: '',
            userId: '',
            name: '',
            description: '',
            definition: '',
            status: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...data,
        };
    },
}