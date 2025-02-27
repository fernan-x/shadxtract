import { Workflow, WorkflowType } from './workflow.entity';
import { WorkflowStatus } from './workflow-status.value-object';

export class WorkflowFactory {
  static create(data?: Partial<WorkflowType>): Workflow {
    return new Workflow(
      data?.id ?? '',
      data?.userId ?? '',
      data?.name ?? 'Untitled Workflow',
      data?.definition ?? null,
      new WorkflowStatus(data?.status ?? 'draft'),
      data?.createdAt ?? new Date(),
      data?.updatedAt ?? new Date(),
      data?.description ?? null,
    );
  }
}
