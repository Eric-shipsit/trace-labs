// app/admin/jobs/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { ApplicantsTable } from "../ApplicantsTable";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminJobPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.admin) {
    redirect("/");
  }

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      applications: {
        include: {
          applicant: true,
        },
        orderBy: {
          submittedAt: "desc",
        },
      },
    },
  });

  if (!job) {
    console.log(`Job with ID ${id} not found.`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-slate-500">Admin Job View</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                {job.title}
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                {job.location} · {job.type} · {job.experienceLevel} · {job.role}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                job.open
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {job.open ? "Open" : "Closed"}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
              <p className="mt-3 whitespace-pre-line text-slate-700">
                {job.description}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Responsibilities
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Requirements</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {job.preferences.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Applicants</h2>
          <p className="mt-1 text-sm text-slate-600">
            {job.applications.length} applicant{job.applications.length === 1 ? "" : "s"}
          </p>

          <div className="mt-6">
            <ApplicantsTable applications={job.applications} jobId = {job.id} />
          </div>
        </section>
      </div>
    </main>
  );
}