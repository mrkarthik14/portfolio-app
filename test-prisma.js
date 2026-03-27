require('dotenv').config();
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

async function test() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const url = (process.env.DATABASE_URL || '').trim();
    if (!url) throw new Error("No URL");
    
    console.log("Creating pool with url:", url);
    const pool = new Pool({ connectionString: url });
    
    console.log("Creating adapter...");
    const adapter = new PrismaNeon(pool);
    
    console.log("Creating client...");
    const prisma = new PrismaClient({ adapter });
    
    try {
        console.log("Querying...");
        const count = await prisma.project.count();
        console.log("Success! Project count:", count);
    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
