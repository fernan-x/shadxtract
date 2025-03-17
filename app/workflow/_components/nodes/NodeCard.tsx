"use client";

import { cn } from "@/lib/utils";
import useFlowValidation from "@/ui/hooks/use-flow-validation";
import { useReactFlow } from "@xyflow/react";
import React from "react";

function NodeCard({
  children,
  nodeId,
  isSelected,
}: React.PropsWithChildren<{
  nodeId: string;
  isSelected: boolean;
}>) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some(
    (input) => input.nodeId === nodeId,
  );

  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-seperate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2",
      )}
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width = 0, height = 0 } = measured;
        const x = position.x + width / 2;
        const y = position.y + height / 2;

        if (x === undefined || y === undefined) return;

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
    >
      {children}
    </div>
  );
}

export default NodeCard;
