import { ApplicationForm } from "./ApplicationForm";

type ApplicationPageProps = {
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

export function ApplicationPage({ job }: ApplicationPageProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Apply
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {job.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{job.type}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{job.experienceLevel}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{job.role}</span>
        </div>

        <p className="mt-6 text-base leading-7 text-slate-700">
          {job.description}
        </p>

        <div className="mt-8 rounded-xl bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Before you apply
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Upload your resume as a PDF.</li>
            <li>Double-check your email before submitting.</li>
            <li>Only apply once per role.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Application Form
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fill out the information below to apply for this position.
        </p>

        <div className="mt-8">
          <ApplicationForm jobId={job.id} />
        </div>
      </div>
    </div>
  );
}