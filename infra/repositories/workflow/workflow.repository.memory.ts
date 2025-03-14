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
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
        WorkflowFactory.create({
            id: '2',
            userId: '1',
            name: 'Workflow 2',
            description: 'This is another workflow',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
        WorkflowFactory.create({
            id: '3',
            userId: '1',
            name: 'Workflow 3',
            description: 'This is another workflow',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
    ];

    async getAll(): Promise<Workflow[]> {
        return this.workflows;
    }

    async create(name: string, definition: string, description?: string): Promise<Workflow> {
        const workflow = WorkflowFactory.create({
            id: `${this.workflows.length + 1}`,
            userId: '1',
            name,
            description,
            definition,
        });

        this.workflows.push(workflow);

        return workflow;
    }

    async delete(id: string): Promise<void> {
        this.workflows = this.workflows.filter((workflow) => workflow.id !== id);
    }

    async get(id: string): Promise<Workflow | null> {
        return this.workflows.find((workflow) => workflow.id === id) || null;
    }

    async update(id: string, definition: string): Promise<Workflow> {
        const workflow = this.workflows.find((workflow) => workflow.id === id);
        if (!workflow) {
            throw new Error('Workflow not found');
        }

        workflow.definition = definition;

        return workflow;
    }
}