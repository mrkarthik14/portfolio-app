import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
// @ts-ignore
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Lazy initialization of Prisma to avoid constructor crashes during Next.js build
function getPrismaClient() {
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }

    // During build time, DATABASE_URL might be undefined.
    if (!process.env.DATABASE_URL) {
        return new Proxy({} as PrismaClient, {
            get() {
                return () => Promise.resolve([]);
            }
        });
    }

    const url = process.env.DATABASE_URL || '';
    
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaNeon(pool as any);
    
    const client = new PrismaClient({ adapter });
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = client;
    }
    return client;
}

export const prisma = getPrismaClient();

export default prisma;
