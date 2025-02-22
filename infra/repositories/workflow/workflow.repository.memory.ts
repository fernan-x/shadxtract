import { Workflow } from '@/core/domain/workflow/workflow.entity';
import { WorkflowFactory } from '@/core/domain/workflow/workflow.factory';
import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';

export class WorkflowRepositoryMemory implements WorkflowRepository {
    private workflows: Workflow[] = [
        WorkflowFactory.create({
            id: '1',
            userId: '1',
            name: 'Workflow 1',
            description: 'This is a workflow',
            definition: 'This is the definition',
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
        WorkflowFactory.create({
            id: '2',
            userId: '1',
            name: 'Workflow 2',
            description: 'This is another workflow',
            definition: 'This is the definition',
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
    ];

    async getAll(): Promise<Workflow[]> {
        return this.workflows;
    }
}