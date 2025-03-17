import { AppNode } from "@/ui/types/app-node";
import { TaskType } from "@/ui/types/task";

export const createFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number },
): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "ShadXTractNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 0, y: 0 },
  };
};
