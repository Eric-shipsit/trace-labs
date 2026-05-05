import Link from "next/link";

// app/admin/jobs/[id]/ApplicantsTable.tsx
type ApplicantsTableProps = {
  jobId: string;
  applications: {
    id: string;
    status: "PENDING" | "REVIEWING" | "INTERVIEW" | "REJECTED" | "ACCEPTED";
    submittedAt: Date;
    resumeUrl: string;
    applicant: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      linkedinUrl: string | null;
      portfolioUrl: string | null;
    };
  }[];
};

function getStatusClass(
  status: ApplicantsTableProps["applications"][number]["status"]
) {
  switch (status) {
    case "PENDING":
      return "bg-slate-100 text-slate-700";
    case "REVIEWING":
      return "bg-blue-100 text-blue-700";
    case "INTERVIEW":
      return "bg-amber-100 text-amber-700";
    case "REJECTED":
      return "bg-rose-100 text-rose-700";
    case "ACCEPTED":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function ApplicantsTable({ applications, jobId }: ApplicantsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No applicants yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Applied</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Resume</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="px-4 py-4 text-sm text-slate-900">
                <Link href = {`/admin/jobs/${jobId}/applications/${application.id}`} className="font-medium text-blue-600 hover:underline">
                  {application.applicant.firstName} {application.applicant.lastName}
                </Link>
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                <a
                  href={`mailto:${application.applicant.email}`}
                  className="hover:underline"
                >
                  {application.applicant.email}
                </a>
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {application.applicant.phone ?? "—"}
              </td>
              <td className="px-4 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {new Date(application.submittedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-sm">
                <a
                  href={`/api/admin/applications/${application.id}/resume`}
                  className="inline-flex rounded-lg border border-slate-300 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}