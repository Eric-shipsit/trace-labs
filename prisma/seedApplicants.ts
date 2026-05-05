import "dotenv/config";
import { PrismaClient, ApplicationStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { put } from "@vercel/blob";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const RESUME_DIR = path.join(process.cwd(), "prisma", "resumes");

type ParsedResume = {
  fileName: string;
  firstName: string;
  lastName: string;
  slugName: string;
  jobSlug: string;
};

const JOB_SLUG_TO_TITLE: Record<string, string> = {
  "frontend-developer": "Frontend Developer",
  "backend-engineer": "Backend Engineer",
  "full-stack-engineer": "Full Stack Engineer",
  "product-manager": "Product Manager",
  "data-scientist": "Data Scientist",
  "product-designer": "Product Designer",
  "ux-researcher": "UX Researcher",
  "devops-engineer": "DevOps Engineer",
  "qa-engineer": "QA Engineer",
  "hr-coordinator": "HR Coordinator",
  "software-engineering-intern": "Software Engineering Intern",
  "contract-ui-designer": "Contract UI Designer",
  "part-time-recruiting-assistant": "Part-Time Recruiting Assistant",
};

const COVER_LETTER_BY_JOB: Record<string, string> = {
  "Frontend Developer":
    "I enjoy building clean, responsive interfaces and would love the opportunity to contribute to a product-focused engineering team.",
  "Backend Engineer":
    "I’m excited by backend systems, APIs, and database design, and I’d be thrilled to help build reliable platform infrastructure.",
  "Full Stack Engineer":
    "I enjoy owning features end to end and would love to contribute across both frontend and backend development.",
  "Product Manager":
    "I’m excited about shaping product direction, aligning cross-functional teams, and delivering thoughtful user outcomes.",
  "Data Scientist":
    "I enjoy turning messy data into useful decisions and would be excited to support product and business strategy through analysis.",
  "Product Designer":
    "I care deeply about intuitive product experiences and would love to help craft thoughtful, polished interfaces.",
  "UX Researcher":
    "I’m passionate about understanding user needs and turning research into actionable product improvements.",
  "DevOps Engineer":
    "I enjoy improving reliability, automation, and developer workflows, and I’d love to help strengthen platform operations.",
  "QA Engineer":
    "I care about product quality and clear testing processes, and I’d be excited to help deliver a stable user experience.",
  "HR Coordinator":
    "I enjoy supporting people operations and helping create a smooth, professional candidate and employee experience.",
  "Software Engineering Intern":
    "I’m eager to learn from a strong engineering team while contributing meaningfully to product development.",
  "Contract UI Designer":
    "I’d love to support the team with polished UI work and fast iteration on product initiatives.",
  "Part-Time Recruiting Assistant":
    "I’m excited to support recruiting operations and help keep hiring workflows organized and efficient.",
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseResumeFileName(fileName: string): ParsedResume | null {
  // Expected format:
  // 01_avery-kim_frontend-developer.pdf
  const match = fileName.match(/^(\d+)_([a-z]+)-([a-z]+)_(.+)\.pdf$/i);

  if (!match) {
    return null;
  }

  const [, , first, last, jobSlug] = match;

  return {
    fileName,
    firstName: first.charAt(0).toUpperCase() + first.slice(1),
    lastName: last.charAt(0).toUpperCase() + last.slice(1),
    slugName: `${first}-${last}`.toLowerCase(),
    jobSlug: jobSlug.toLowerCase(),
  };
}

function buildApplicantData(firstName: string, lastName: string, slugName: string) {
  return {
    firstName,
    lastName,
    email: `${slugName}@example.com`,
    phone: `555-${String(Math.floor(100 + Math.random() * 900))}-${String(
      Math.floor(1000 + Math.random() * 9000)
    )}`,
    linkedinUrl: `https://linkedin.com/in/${slugName}`,
    portfolioUrl: `https://${slugName}.portfolio.dev`,
    githubUrl: `https://github.com/${slugName}`,
  };
}

function getStatus(index: number): ApplicationStatus {
  const statuses: ApplicationStatus[] = [
    "PENDING",
    "REVIEWING",
    "INTERVIEW",
    "ACCEPTED",
    "REJECTED",
  ];

  return statuses[index % statuses.length];
}

async function uploadResume(fileName: string, slugName: string) {
  const filePath = path.join(RESUME_DIR, fileName);
  const fileBuffer = await readFile(filePath);

  const blob = await put(`resumes/${slugName}.pdf`, new Blob([fileBuffer]), {
    access: "private",
    contentType: "application/pdf",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return {
    resumeUrl: blob.url,
    resumePathname: blob.pathname,
  };
}

async function main() {
  const allFiles = await readdir(RESUME_DIR);
  const pdfFiles = allFiles.filter((file) => file.toLowerCase().endsWith(".pdf"));

  if (pdfFiles.length === 0) {
    throw new Error(
      `No PDF resumes found in ${RESUME_DIR}. Extract your resume pack into prisma/resumes first.`
    );
  }

  const parsedResumes = pdfFiles
    .map(parseResumeFileName)
    .filter((value): value is ParsedResume => value !== null);

  if (parsedResumes.length === 0) {
    throw new Error(
      "No resume filenames matched the expected pattern: 01_avery-kim_frontend-developer.pdf"
    );
  }

  const jobs = await prisma.job.findMany();
  if (jobs.length === 0) {
    throw new Error("No jobs found. Run your jobs seed first.");
  }

  const jobsByTitle = new Map(jobs.map((job) => [job.title, job]));

  // Remove old application data first so reruns do not hit unique constraint issues.
  await prisma.application.deleteMany();
  await prisma.applicant.deleteMany();

  let createdApplicants = 0;
  let createdApplications = 0;
  let skipped = 0;

  for (let i = 0; i < parsedResumes.length; i++) {
    const parsed = parsedResumes[i];
    const jobTitle = JOB_SLUG_TO_TITLE[parsed.jobSlug];

    if (!jobTitle) {
      console.warn(`Skipping ${parsed.fileName}: unknown job slug "${parsed.jobSlug}"`);
      skipped++;
      continue;
    }

    const job = jobsByTitle.get(jobTitle);

    if (!job) {
      console.warn(`Skipping ${parsed.fileName}: no seeded job found with title "${jobTitle}"`);
      skipped++;
      continue;
    }

    const applicantData = buildApplicantData(
      parsed.firstName,
      parsed.lastName,
      parsed.slugName
    );

    const applicant = await prisma.applicant.create({
      data: applicantData,
    });
    createdApplicants++;

    const uploadedResume = await uploadResume(parsed.fileName, parsed.slugName);

    await prisma.application.create({
      data: {
        jobId: job.id,
        applicantId: applicant.id,
        resumeUrl: uploadedResume.resumeUrl,
        resumePathname: uploadedResume.resumePathname,
        coverLetter:
          COVER_LETTER_BY_JOB[jobTitle] ??
          "I’m excited for the opportunity to contribute to your team.",
        status: getStatus(i),
      },
    });
    createdApplications++;

    console.log(
      `Created application: ${applicant.firstName} ${applicant.lastName} -> ${jobTitle}`
    );
  }

  console.log("\nSeed complete");
  console.log(`Applicants created: ${createdApplicants}`);
  console.log(`Applications created: ${createdApplications}`);
  console.log(`Files skipped: ${skipped}`);
}

main()
  .catch((error) => {
    console.error("Applicant seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });