import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.job.deleteMany();

  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Developer",
        location: "San Francisco, CA",
        description: "Build modern user interfaces with Next.js, TypeScript, and Tailwind.",
        experienceLevel: "ENTRY",
        role: "DEVELOPER"
      },
      {
        title: "Backend Engineer",
        location: "Remote",
        description: "Design APIs, database models, and scalable backend services with PostgreSQL.",
        experienceLevel: "ENTRY",
        role: "DEVELOPER"
      },
      {
        title: "Full Stack Engineer",
        location: "New York, NY",
        description: "Work across frontend and backend to build a polished job marketplace experience.",
        experienceLevel: "ENTRY",
        role: "DEVELOPER"
      },
    ],
  });

  const jobs = await prisma.job.findMany();
  console.log("Seeded jobs:", jobs.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });