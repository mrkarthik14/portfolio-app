require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});
prisma.$connect()
  .then(() => console.log('Connected successfully to the database!'))
  .catch(e => {
    console.error('Prisma Error Name:', e.name);
    console.error('Prisma Error Message:', e.message);
  })
  .finally(() => prisma.$disconnect());
