import { PrismaClient } from "@prisma/client";
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
        description:
          "Build modern user interfaces with Next.js, TypeScript, and Tailwind. You will work closely with design and product to create fast, accessible, and polished web experiences.",
        experienceLevel: "ENTRY",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "Bachelor’s degree in Computer Science or equivalent practical experience",
          "Familiarity with JavaScript, TypeScript, React, and modern frontend development",
          "Understanding of responsive design and component-based architecture",
          "Comfort using Git in a collaborative environment",
        ],
        responsibilities: [
          "Develop and maintain user-facing features using Next.js and React",
          "Collaborate with designers to translate mockups into responsive interfaces",
          "Write clean, reusable, and maintainable frontend code",
          "Participate in code reviews, bug fixes, and UI improvements",
          "Help improve accessibility, performance, and cross-browser compatibility",
        ],
        preferences: [
          "Experience with Tailwind CSS",
          "Familiarity with frontend testing tools such as Jest or React Testing Library",
          "Basic understanding of REST APIs",
          "Strong eye for detail and product design",
        ],
        open: true
      },
      {
        title: "Backend Engineer",
        location: "Remote",
        description:
          "Design APIs, database models, and scalable backend services with PostgreSQL. You will help power core platform functionality and build reliable systems that support product growth.",
        experienceLevel: "ENTRY",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "Bachelor’s degree in Computer Science or equivalent practical experience",
          "Familiarity with backend development using Node.js or TypeScript",
          "Understanding of relational databases and SQL",
          "Basic knowledge of API design and server-side architecture",
        ],
        responsibilities: [
          "Build and maintain backend services and internal APIs",
          "Design database schemas and write efficient PostgreSQL queries",
          "Collaborate with frontend engineers to support product features",
          "Debug issues in development and production environments",
          "Contribute to performance, reliability, and backend code quality",
        ],
        preferences: [
          "Experience with Prisma",
          "Familiarity with Docker and local development environments",
          "Exposure to Neon or hosted Postgres platforms",
          "Interest in scalable architecture and backend optimization",
        ],
        open: true
      },
      {
        title: "Full Stack Engineer",
        location: "New York, NY",
        description:
          "Work across frontend and backend to build a polished job marketplace experience. You will own features end to end, from database design to user interface implementation.",
        experienceLevel: "ENTRY",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "Bachelor’s degree in Computer Science or equivalent practical experience",
          "Familiarity with React, Next.js, and TypeScript",
          "Understanding of APIs, databases, and full-stack application flow",
          "Comfort working across both frontend and backend codebases",
        ],
        responsibilities: [
          "Build complete features across the stack from database to UI",
          "Create responsive frontend interfaces connected to backend services",
          "Design and maintain database models for new features",
          "Work with product and design to refine user experiences",
          "Troubleshoot bugs and improve application reliability and performance",
        ],
        preferences: [
          "Experience with PostgreSQL and Prisma",
          "Familiarity with Tailwind CSS",
          "Interest in startup environments and fast product iteration",
          "Strong ownership mindset from idea to launch",
        ],
        open: true
      },
      {
        title: "Product Manager",
        location: "San Francisco, CA",
        description:
          "Lead product strategy and execution for key platform initiatives. You will partner closely with engineering, design, and leadership to define priorities and deliver meaningful customer value.",
        experienceLevel: "SENIOR",
        type: "FULL",
        role: "PRODUCT",
        requirements: [
          "5+ years of product management experience",
          "Experience defining roadmaps and shipping impactful features",
          "Strong written and verbal communication skills",
          "Ability to work cross-functionally with design and engineering teams",
        ],
        responsibilities: [
          "Own product planning and prioritization for major initiatives",
          "Gather customer feedback and translate insights into requirements",
          "Write clear product specs and coordinate execution across teams",
          "Define success metrics and evaluate feature performance",
          "Align stakeholders around roadmap decisions and tradeoffs",
        ],
        preferences: [
          "Experience with SaaS or B2B software products",
          "Technical fluency when working with engineering teams",
          "Familiarity with analytics and experimentation",
          "Experience building developer or operations-focused tools",
        ],
        open: true
      },
      {
        title: "Data Scientist",
        location: "New York, NY",
        description:
          "Apply data analysis and statistical modeling to guide product decisions and improve business outcomes. You will work with cross-functional teams to turn data into actionable insights.",
        experienceLevel: "MID",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "3+ years of experience in data science, analytics, or a related field",
          "Strong knowledge of SQL, Python, and statistics",
          "Experience working with large datasets",
          "Ability to communicate findings to technical and non-technical stakeholders",
        ],
        responsibilities: [
          "Analyze product and business data to identify trends and opportunities",
          "Build dashboards, models, and reports that inform decision-making",
          "Partner with product and engineering on metrics and experimentation",
          "Clean and validate datasets to ensure data quality",
          "Present clear recommendations based on data-driven insights",
        ],
        preferences: [
          "Experience with machine learning workflows",
          "Familiarity with product analytics and A/B testing",
          "Experience with data visualization tools",
          "Strong storytelling ability with data",
        ],
        open: true
      },
      {
        title: "Designer",
        location: "Los Angeles, CA",
        description:
          "Design intuitive, modern, and visually polished product experiences across web and mobile surfaces. You will help shape the look, feel, and usability of the platform from concept to launch.",
        experienceLevel: "MID",
        role: "DESIGN",
        type: "FULL",
        requirements: [
          "3+ years of product design experience",
          "Strong portfolio demonstrating user-centered design work",
          "Proficiency in Figma and modern design workflows",
          "Understanding of layout, typography, interaction design, and usability principles",
        ],
        responsibilities: [
          "Design user flows, wireframes, and high-fidelity interfaces",
          "Collaborate with product managers and engineers on feature design",
          "Maintain consistency through thoughtful systems and design patterns",
          "Participate in feedback sessions and iterate on designs",
          "Help shape the visual quality and usability of the product",
        ],
        preferences: [
          "Experience designing SaaS products or internal tools",
          "Familiarity with design systems and prototyping",
          "Understanding of frontend implementation constraints",
          "Strong visual taste with attention to accessibility and detail",
        ],
        open: true
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