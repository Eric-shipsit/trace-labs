"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

type ApplicationStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "REJECTED"
  | "ACCEPTED";

type Props = {
  applicationId: string;
  initialStatus: ApplicationStatus;
};

const statusStyles: Record<ApplicationStatus, string> = {
  PENDING:
    "border-slate-200 bg-slate-50 text-slate-700 focus:border-slate-300 focus:ring-slate-100",
  REVIEWING:
    "border-blue-200 bg-blue-50 text-blue-700 focus:border-blue-300 focus:ring-blue-100",
  INTERVIEW:
    "border-violet-200 bg-violet-50 text-violet-700 focus:border-violet-300 focus:ring-violet-100",
  REJECTED:
    "border-rose-200 bg-rose-50 text-rose-700 focus:border-rose-300 focus:ring-rose-100",
  ACCEPTED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 focus:border-emerald-300 focus:ring-emerald-100",
};

const statusLabel: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  REVIEWING: "Reviewing",
  INTERVIEW: "Interview",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

export function ApplicationStatusSelect({
  applicationId,
  initialStatus,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus);
  const [isSaving, setIsSaving] = useState(false);

  const currentStyle = useMemo(() => statusStyles[status], [status]);

  async function handleChange(nextStatus: ApplicationStatus) {
    const previousStatus = status;
    setStatus(nextStatus);
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update application status");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      setStatus(previousStatus);
      alert("Could not update application status.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Application Status
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Update the hiring stage
          </p>
        </div>

        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        ) : null}
      </div>

      <div className="relative">
        <select
          value={status}
          onChange={(e) => handleChange(e.target.value as ApplicationStatus)}
          disabled={isSaving}
          className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm font-semibold shadow-sm outline-none transition ${currentStyle} disabled:cursor-not-allowed disabled:opacity-70 focus:ring-4`}
        >
          <option value="PENDING">Pending</option>
          <option value="REVIEWING">Reviewing</option>
          <option value="INTERVIEW">Interview</option>
          <option value="REJECTED">Rejected</option>
          <option value="ACCEPTED">Accepted</option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-current opacity-70" />
      </div>

      <div className="text-xs text-slate-500">
        Current status: <span className="font-semibold">{statusLabel[status]}</span>
      </div>
    </div>
  );
}