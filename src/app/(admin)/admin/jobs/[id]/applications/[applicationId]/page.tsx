// app/admin/jobs/[id]/applications/[applicationId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { ApplicationStatusSelect } from "./ApplicationStatusSelect";

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string;
    applicationId: string;
  }>;
};

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id, applicationId } = await params;

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      jobId: id,
    },
    include: {
      applicant: true,
      job: true,
    },
  });


  if (!application) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Application Details</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              {application.applicant.firstName} {application.applicant.lastName}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Applied for <span className="font-medium">{application.job.title}</span>
            </p>
          </div>
        </div>
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Applicant Information
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  First name
                </p>
                <p className="mt-1 text-sm text-slate-900">
                  {application.applicant.firstName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Last name
                </p>
                <p className="mt-1 text-sm text-slate-900">
                  {application.applicant.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="mt-1 text-sm text-slate-900">
                  {application.applicant.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Phone
                </p>
                <p className="mt-1 text-sm text-slate-900">
                  {application.applicant.phone || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  LinkedIn
                </p>
                {application.applicant.linkedinUrl ? (
                  <a
                    href={application.applicant.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    View LinkedIn
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-900">—</p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Portfolio
                </p>
                {application.applicant.portfolioUrl ? (
                  <a
                    href={application.applicant.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    View Portfolio
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-900">—</p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  GitHub
                </p>
                {application.applicant.githubUrl ? (
                  <a
                    href={application.applicant.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    View GitHub
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-900">—</p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Resume
                </p>
                {application.resumePathname ? (
                  <a
                    href={`/api/admin/applications/${application.id}/resume`}
                    className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    Download Resume
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-900">—</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <ApplicationStatusSelect
                applicationId={application.id}
                initialStatus={application.status}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Job Information</h2>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Title
                  </p>
                  <p className="mt-1 text-sm text-slate-900">{application.job.title}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-slate-900">{application.job.location}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Type
                  </p>
                  <p className="mt-1 text-sm text-slate-900">{application.job.type}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Experience level
                  </p>
                  <p className="mt-1 text-sm text-slate-900">
                    {application.job.experienceLevel}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Role
                  </p>
                  <p className="mt-1 text-sm text-slate-900">{application.job.role}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </p>
                  <p className="mt-1 text-sm text-slate-900">
                    {application.job.open ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}