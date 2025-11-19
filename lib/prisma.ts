// lib/prisma.ts
// Import the generated Prisma Client from the project's output directory.
// The Prisma generator in this project writes the client to `app/generated/prisma`.
import { PrismaClient } from "../app/generated/prisma/client";
declare global {
  // allow global prisma in dev to avoid hot-reload instantiation issues
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
