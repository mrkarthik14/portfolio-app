import { PrismaClient } from '@prisma/client';

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
    const finalUrl = url.includes('pgbouncer=true') ? url : url.includes('?') ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
    
    const client = new PrismaClient({
        datasources: {
            db: {
                url: finalUrl
            }
        }
    } as any);
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = client;
    }
    return client;
}

export const prisma = getPrismaClient();

export default prisma;
