// app/admin/jobs/[id]/DeleteJobButton.tsx
"use client";

type DeleteJobButtonProps = {
  label?: string;
};

export function DeleteJobButton({
  label = "Delete Job",
}: DeleteJobButtonProps) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this job?")) {
          e.preventDefault();
        }
      }}
      className="rounded-xl border border-red-300 bg-white px-5 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
    >
      {label}
    </button>
  );
}