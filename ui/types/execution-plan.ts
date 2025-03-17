import { AppNode } from "./app-node";

export type ExecutionPlan = ExecutionPlanPhase[];

export type ExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};
