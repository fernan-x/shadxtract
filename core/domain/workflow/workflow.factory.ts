import { Workflow } from './workflow.entity';
import { WorkflowStatus } from './workflow-status.value-object';

export type WorkflowFactoryData = {
    id?: string;
    userId?: string;
    name?: string;
    description?: string;
    definition?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class WorkflowFactory {
  static create(data?: Partial<WorkflowFactoryData>): Workflow {
    return new Workflow(
      data?.id ?? '',
      data?.userId ?? '',
      data?.name ?? 'Untitled Workflow',
      data?.definition ?? '{}',
      new WorkflowStatus(data?.status ?? 'draft'),
      data?.createdAt ?? new Date(),
      data?.updatedAt ?? new Date(),
      data?.description
    );
  }
}
