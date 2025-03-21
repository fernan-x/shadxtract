import { cn } from "@/lib/utils";
import { TaskInputType } from "@/ui/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/ui/hooks/use-flow-validation";

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskInputType;
  nodeId: string;
}) {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (e) => e.target === nodeId && e.targetHandle === input.name,
  );
  const hasError = invalidInputs
    .find((i) => i.nodeId === nodeId)
    ?.invalidInputs.find((i) => i === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasError && "bg-destructive/30",
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type],
          )}
        />
      )}
    </div>
  );
}
