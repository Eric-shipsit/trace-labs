// src/app/career/[uid]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";

type CareerDetailPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { uid } = await params;

  const job = await prisma.job.findFirst({
    where: {
      id: uid,
      open: true,
    },
  });

  if (!job) {
    notFound();
  }

  return <JobPostingDetail job={job} />;
}

type JobPostingDetailProps = {
  job: {
    id: string;
    title: string;
    location: string;
    description: string;
    experienceLevel: string;
    type: string;
    role: string;
    responsibilities: string[];
    requirements: string[];
    preferences: string[];
    open: boolean;
  };
};

function JobPostingDetail({ job }: JobPostingDetailProps) {
  return (
    <main 
      id="career"  
      style={{
        background:"#f7f9fa"
      }}>
  
      <Navbar />
      <section className=""
        id = "career"
        style={{
          background:"#f7f9fa"
        }}>
          <div className="mx-auto max-w-4xl px-6 py-12">
          {!job.open && (
            <div className="mb-8 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold tracking-wide text-red-700">
              This position is no longer open.
            </div>
          )}  
            <h1 className="text-3xl font-semibold text-slate-900">{job.title}</h1>

            <p className="mt-2 text-sm text-slate-500">
              {job.location} • {job.role} • {job.type} • {job.experienceLevel}
            </p>

            <p className="mt-6 text-base leading-7 text-slate-700">
              {job.description}
            </p>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-slate-900">
                Responsibilities
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-slate-900">Requirements</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-slate-900">
                Preferred Qualifications
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                {job.preferences.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
            <div className="mt-12 border-t border-slate-200 pt-8">
              {job.open ? (
                <Link
                  href={`/career/${job.id}/apply`}
                  className="inline-flex rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Apply Now
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex cursor-not-allowed rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-500"
                >
                  Applications Closed
                </button>
              )}
            </div>
          </div>
      </section>
      <section className="text-slate-900"
        style={{
          background:"#101012"
        }}>
          <Footer/>
      </section>
    </main>

  );
}