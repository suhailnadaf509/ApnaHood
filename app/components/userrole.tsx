"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserRole(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role;
}
