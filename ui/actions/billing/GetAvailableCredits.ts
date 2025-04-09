"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetAvailableCredits() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated")
    }

    const userBalance = await prisma.userBalance.findUnique({
        where: { userId }
    });
    if (!userBalance) {
        return -1;
    }

    return userBalance.credits;
}