import { Workflow, WorkflowType } from './workflow.entity';
import { WorkflowStatus } from './workflow-status.value-object';
import { AppNode, TaskType } from '@/ui/types/app-node';
import { Edge } from '@xyflow/react';
import { createFlowNode } from '@/lib/workflow/createFlowNode';

const initialDefinition: { nodes: AppNode[], edges: Edge[] } = {
    nodes: [],
    edges: [],
}
initialDefinition.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

export class WorkflowFactory {
  static create(data?: Partial<WorkflowType>): Workflow {
    return new Workflow(
      data?.id ?? '',
      data?.userId ?? '',
      data?.name ?? 'Untitled Workflow',
      data?.definition ?? JSON.stringify(initialDefinition),
      new WorkflowStatus(data?.status ?? 'draft'),
      data?.createdAt ?? new Date(),
      data?.updatedAt ?? new Date(),
      data?.description ?? null,
    );
  }
}
