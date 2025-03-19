import { ExecutionPhase } from "@prisma/client";

// TODO : replace with entity instead
type Phase = Pick<ExecutionPhase, "creditsConsumed">;
export const getPhasesTotalCost = (phases: Phase[]) => {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed ?? 0), 0);
};
