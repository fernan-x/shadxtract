import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { Workflow } from '@/core/domain/workflow/workflow.entity';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { WorkflowFactory } from '@/core/domain/workflow/workflow.factory';
import { WorkflowStatusType } from '@/core/domain/workflow/workflow-status.value-object';

export class WorkflowRepositoryPrisma implements WorkflowRepository {
    async getAll(): Promise<Workflow[]> {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        const results = await prisma.workflow.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return results.map((result) => WorkflowFactory.create({
            id: result.id,
            userId: result.userId,
            name: result.name,
            description: result.description ?? '',
            definition: result.definition,
            status: result.status as WorkflowStatusType,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }));
    }

    async create(name: string, description: string | null = null): Promise<Workflow> {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        const result = await prisma.workflow.create({
            data: {
                userId,
                name,
                description,
                status: 'draft',
                definition: '',
            },
        });

        if (!result) {
            throw new Error('Failed to create workflow');
        }

        return WorkflowFactory.create({
            ...result,
            status: result.status as WorkflowStatusType,
        });
    }

    async delete(id: string): Promise<void> {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        await prisma.workflow.delete({
            where: {
                id,
                userId,
            },
        });
    }
}
