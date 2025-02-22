import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { Workflow } from '@/core/domain/workflow/workflow.entity';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { WorkflowFactory } from '@/core/domain/workflow/workflow.factory';

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
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }));
  }
}
