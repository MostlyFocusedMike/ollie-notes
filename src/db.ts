// This file is a fix for a known bug in Prisma that as of 2024-09-01 is still not fixed.
// The issue is the hot reloader will continue to run and create new instances of PrismaClient, which will cause problems
// by using the singleton below, we prevent that
import { PrismaClient } from "@prisma/client";

// cast as unknown first to avoid TS checking errors, and then further cast it as an object with a prisma property (which we'll fill in in a line)
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
