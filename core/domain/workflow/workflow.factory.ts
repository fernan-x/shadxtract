import { Workflow, WorkflowType } from './workflow.entity';
import { WorkflowStatus } from './workflow-status.value-object';
import { generateDefaultDefinition } from '@/lib/workflow/generateDefaultDefinition';
export class WorkflowFactory {
  static create(data?: Partial<WorkflowType>): Workflow {
    return new Workflow(
      data?.id ?? '',
      data?.userId ?? '',
      data?.name ?? 'Untitled Workflow',
      data?.definition ?? generateDefaultDefinition(),
      new WorkflowStatus(data?.status ?? 'draft'),
      data?.createdAt ?? new Date(),
      data?.updatedAt ?? new Date(),
      data?.description ?? null,
    );
  }
}
