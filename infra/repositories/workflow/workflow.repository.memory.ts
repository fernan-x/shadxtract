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
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
        WorkflowFactory.create({
            id: '2',
            userId: '1',
            name: 'Workflow 2',
            description: 'This is another workflow',
            definition: 'This is the definition',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
        WorkflowFactory.create({
            id: '3',
            userId: '1',
            name: 'Workflow 3',
            description: 'This is another workflow',
            definition: 'This is the definition',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
    ];

    async getAll(): Promise<Workflow[]> {
        return this.workflows;
    }

    async create(name: string, description?: string): Promise<Workflow> {
        const workflow = WorkflowFactory.create({
            id: `${this.workflows.length + 1}`,
            userId: '1',
            name,
            description,
        });

        this.workflows.push(workflow);

        return workflow;
    }

    async delete(id: string): Promise<void> {
        this.workflows = this.workflows.filter((workflow) => workflow.getId() !== id);
    }

    async get(id: string): Promise<Workflow | null> {
        return this.workflows.find((workflow) => workflow.getId() === id) || null;
    }
}