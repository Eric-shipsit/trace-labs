// npx prisma db seed

// enum ExperienceLevel {
//   ENTRY
//   MID
//   SENIOR
// }

// enum Role {
//   ENGINEERING
//   DESIGN
//   PRODUCT
//   DATA
//   HR
// }

// enum JobType {
//   FULL
//   CONTRACT
//   INTERN
//   PART
// }

// enum ApplicationStatus {
//   PENDING
//   REVIEWING
//   INTERVIEW
//   REJECTED
//   ACCEPTED
// }

// model Job {
//   id                String          @id @default(uuid())
//   title             String
//   description       String
//   requirements      String[]
//   responsibilities  String[]
//   preferences       String[]
//   type              JobType
//   experienceLevel   ExperienceLevel
//   role              Role
//   location          String
//   createdAt         DateTime        @default(now())
//   applications      Application[]
//   open              Boolean
// }

// model Applicant {
//   id           String        @id @default(cuid())
//   firstName    String
//   lastName     String
//   email        String        @unique
//   phone        String?
//   linkedinUrl  String?
//   portfolioUrl String?
//   githubUrl    String?
//   createdAt    DateTime      @default(now())
//   updatedAt    DateTime      @updatedAt
//   applications Application[]
// }

// model Application {
//   id              String    @id @default(cuid())
//   jobId           String
//   applicantId     String
//   resumeUrl       String
//   resumePathname  String
//   coverLetter     String?
//   submittedAt     DateTime  @default(now())
//   applicant       Applicant @relation(fields: [applicantId], references: [id], onDelete: Cascade)
//   job             Job       @relation(fields: [jobId], references: [id], onDelete: Cascade)
//   status          ApplicationStatus @default(PENDING)

//   @@unique([jobId, applicantId])
// }
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
        open: true,
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
        open: true,
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
        open: true,
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
        open: true,
      },
      {
        title: "Data Scientist",
        location: "New York, NY",
        description:
          "Apply data analysis and statistical modeling to guide product decisions and improve business outcomes. You will work with cross-functional teams to turn data into actionable insights.",
        experienceLevel: "MID",
        type: "FULL",
        role: "DATA",
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
        open: true,
      },
      {
        title: "Product Designer",
        location: "Los Angeles, CA",
        description:
          "Design intuitive, modern, and visually polished product experiences across web and mobile surfaces. You will help shape the look, feel, and usability of the platform from concept to launch.",
        experienceLevel: "MID",
        type: "FULL",
        role: "DESIGN",
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
        open: true,
      },
      {
        title: "UX Researcher",
        location: "Remote",
        description:
          "Help the team better understand customer needs through interviews, usability testing, and synthesis. You will bring clarity to product decisions with actionable research insights.",
        experienceLevel: "MID",
        type: "FULL",
        role: "DESIGN",
        requirements: [
          "2+ years of experience in UX research or a related field",
          "Experience planning and conducting qualitative research",
          "Ability to synthesize research findings into clear recommendations",
          "Strong communication and collaboration skills",
        ],
        responsibilities: [
          "Plan and conduct user interviews and usability studies",
          "Synthesize findings into concise and actionable insights",
          "Partner with design and product teams on research priorities",
          "Support the team with customer empathy and evidence-based decisions",
          "Maintain research documentation and insights repositories",
        ],
        preferences: [
          "Experience with B2B or SaaS products",
          "Familiarity with survey design and mixed-methods research",
          "Strong storytelling and presentation skills",
          "Comfort working in fast-moving product teams",
        ],
        open: true,
      },
      {
        title: "DevOps Engineer",
        location: "Austin, TX",
        description:
          "Improve deployment workflows, infrastructure reliability, and observability across the platform. You will help build tooling that enables engineering teams to ship with confidence.",
        experienceLevel: "MID",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "3+ years of experience in DevOps, SRE, or infrastructure engineering",
          "Experience with CI/CD pipelines and cloud infrastructure",
          "Knowledge of Docker and containerized workflows",
          "Familiarity with monitoring, logging, and alerting systems",
        ],
        responsibilities: [
          "Maintain and improve CI/CD systems",
          "Support deployment reliability and incident response",
          "Automate infrastructure and developer workflows",
          "Improve system observability and performance monitoring",
          "Work with engineers to strengthen reliability and release processes",
        ],
        preferences: [
          "Experience with Vercel, AWS, or similar cloud platforms",
          "Familiarity with PostgreSQL operations",
          "Experience with infrastructure as code",
          "Interest in developer productivity and platform tooling",
        ],
        open: true,
      },
      {
        title: "QA Engineer",
        location: "Seattle, WA",
        description:
          "Ensure product quality through structured testing, bug reporting, and close collaboration with engineering and product teams. You will help deliver a stable and polished experience.",
        experienceLevel: "ENTRY",
        type: "FULL",
        role: "ENGINEERING",
        requirements: [
          "Bachelor’s degree or equivalent practical experience",
          "Understanding of software testing fundamentals",
          "Attention to detail and strong problem-solving skills",
          "Ability to clearly document bugs and reproduction steps",
        ],
        responsibilities: [
          "Test new features and regression scenarios across the application",
          "Write clear bug reports and work with engineers on resolution",
          "Help define test plans and release readiness criteria",
          "Collaborate with product and engineering on quality expectations",
          "Contribute to continuous improvement of QA processes",
        ],
        preferences: [
          "Experience with test case management tools",
          "Exposure to automated testing frameworks",
          "Familiarity with browser dev tools",
          "Strong communication and organization skills",
        ],
        open: true,
      },
      {
        title: "HR Coordinator",
        location: "Chicago, IL",
        description:
          "Support recruiting, onboarding, and people operations across the company. You will help create a thoughtful candidate and employee experience as the team grows.",
        experienceLevel: "ENTRY",
        type: "FULL",
        role: "HR",
        requirements: [
          "Bachelor’s degree or equivalent practical experience",
          "Strong organizational and communication skills",
          "Ability to manage multiple tasks and deadlines",
          "Interest in recruiting, onboarding, and people operations",
        ],
        responsibilities: [
          "Coordinate interviews and candidate communication",
          "Assist with onboarding and internal HR processes",
          "Maintain recruiting and personnel records",
          "Support job posting and hiring operations",
          "Help improve team processes and employee experience",
        ],
        preferences: [
          "Experience using ATS or HR software",
          "Familiarity with startup recruiting environments",
          "Strong attention to detail",
          "Friendly and professional communication style",
        ],
        open: true,
      },
      {
        title: "Software Engineering Intern",
        location: "Remote",
        description:
          "Join the engineering team for a hands-on internship focused on building product features, fixing bugs, and learning modern software development practices in a collaborative environment.",
        experienceLevel: "ENTRY",
        type: "INTERN",
        role: "ENGINEERING",
        requirements: [
          "Currently pursuing a degree in Computer Science or a related field",
          "Familiarity with JavaScript or TypeScript",
          "Interest in web development and software engineering",
          "Willingness to learn and collaborate with a team",
        ],
        responsibilities: [
          "Support engineers with feature development and bug fixes",
          "Contribute code to internal and customer-facing tools",
          "Participate in code reviews and team discussions",
          "Learn development workflows and engineering best practices",
          "Assist with testing and documentation",
        ],
        preferences: [
          "Experience with React or Next.js",
          "Familiarity with Git and GitHub",
          "Curiosity about full-stack development",
          "Strong growth mindset and eagerness to learn",
        ],
        open: true,
      },
      {
        title: "Contract UI Designer",
        location: "Remote",
        description:
          "Support the product team on a contract basis by creating polished UI concepts, refining flows, and helping ship clear and usable interfaces for new initiatives.",
        experienceLevel: "MID",
        type: "CONTRACT",
        role: "DESIGN",
        requirements: [
          "3+ years of UI or product design experience",
          "Strong visual portfolio with web or SaaS work",
          "Proficiency in Figma",
          "Ability to work independently and deliver polished design assets",
        ],
        responsibilities: [
          "Create UI mockups and interaction flows for new features",
          "Collaborate with product and engineering on implementation details",
          "Refine visual consistency across surfaces",
          "Iterate quickly on feedback from stakeholders",
          "Deliver production-ready design assets",
        ],
        preferences: [
          "Experience working as a contractor or consultant",
          "Strong systems thinking",
          "Comfort balancing speed and polish",
          "Understanding of responsive web design",
        ],
        open: false,
      },
      {
        title: "Part-Time Recruiting Assistant",
        location: "Remote",
        description:
          "Help support recruiting operations part-time by organizing candidates, assisting with outreach, and helping keep the hiring funnel moving smoothly.",
        experienceLevel: "ENTRY",
        type: "PART",
        role: "HR",
        requirements: [
          "Strong written communication skills",
          "High attention to detail and organization",
          "Ability to work independently in a remote setting",
          "Interest in recruiting and talent operations",
        ],
        responsibilities: [
          "Support candidate scheduling and communication",
          "Assist with organizing recruiting pipelines",
          "Help maintain job posts and internal hiring trackers",
          "Coordinate with hiring teams on administrative tasks",
          "Provide general support for recruiting operations",
        ],
        preferences: [
          "Previous administrative or recruiting support experience",
          "Comfort with spreadsheets and ATS tools",
          "Friendly and responsive communication style",
          "Strong follow-through and reliability",
        ],
        open: true,
      },
    ],
  });

  const jobs = await prisma.job.findMany();
  console.log(`Seeded jobs: ${jobs.length}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });