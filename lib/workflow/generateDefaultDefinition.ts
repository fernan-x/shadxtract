import { AppNode } from "@/ui/types/app-node";
import { Edge } from "@xyflow/react";
import { createFlowNode } from "./createFlowNode";
import { TaskType } from "@/ui/types/task";

const initialDefinition: { nodes: AppNode[]; edges: Edge[] } = {
  nodes: [],
  edges: [],
};
initialDefinition.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

export const generateDefaultDefinition = (): string =>
  JSON.stringify(initialDefinition);
