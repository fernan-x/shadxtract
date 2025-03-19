"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// TODO : use usecase here
export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
  });
}
