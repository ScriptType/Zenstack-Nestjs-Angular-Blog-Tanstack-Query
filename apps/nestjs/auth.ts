import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export type AuthInstance = ReturnType<typeof betterAuth>;

export const auth = betterAuth({
  basePath: 'api/auth',
  trustedOrigins: ['http://localhost:4200'], // exact frontend origin(s)
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...etc
  }),
});
