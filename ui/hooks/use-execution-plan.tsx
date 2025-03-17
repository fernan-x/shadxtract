import {
  flowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from "@/lib/workflow/executionPlan";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { AppNode } from "../types/app-node";
import useFlowValidation from "./use-flow-validation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: NonNullable<ReturnType<typeof flowToExecutionPlan>["error"]>) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("Not all inputs value are set");
          setInvalidInputs(error?.invalidElements ?? []);
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    },
    [setInvalidInputs],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = flowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [clearErrors, handleError, toObject]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
