import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log(`Total projects in DB: ${projects.length}`);
  if (projects.length > 0) {
    console.log('Sample project:', projects[0].name);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
