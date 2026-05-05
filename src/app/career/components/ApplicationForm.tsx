"use client";

import { useState } from "react";

type ApplicationFormProps = {
  jobId: string;
};

export function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const resumeFile = formData.get("resume");

      if (!(resumeFile instanceof File) || resumeFile.size === 0) {
        throw new Error("Please upload your resume.");
      }

      const uploadData = new FormData();
      uploadData.append("file", resumeFile);
      uploadData.append("jobId", jobId);

      const uploadResponse = await fetch("/api/resume/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || "Resume upload failed.");
      }

      const applicationResponse = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          linkedinUrl: formData.get("linkedinUrl"),
          portfolioUrl: formData.get("portfolioUrl"),
          resumeUrl: uploadResult.url,
          resumePathname: uploadResult.pathname,
        }),
      });

      const applicationResult = await applicationResponse.json();

      if (!applicationResponse.ok) {
        throw new Error(applicationResult.error || "Application submission failed.");
      }

      setSuccess("Your application was submitted successfully.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            name="firstName"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            name="lastName"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            name="phone"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          LinkedIn URL
        </label>
        <input
          name="linkedinUrl"
          type="url"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Portfolio URL
        </label>
        <input
          name="portfolioUrl"
          type="url"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
        />
      </div>
<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Resume
  </label>

  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-slate-400 hover:bg-slate-100">
    <input
      type="file"
      name="resume"
      accept="application/pdf,.pdf"
      required
      className="block w-full cursor-pointer text-sm text-slate-600
                 file:mr-4 file:rounded-full file:border file:border-slate-300
                 file:bg-white file:px-4 file:py-2
                 file:text-sm file:font-medium file:text-slate-700
                 hover:file:bg-slate-100"
    />
    <p className="mt-3 text-xs text-slate-500">
      Upload your resume as a PDF. Maximum file size: 4 MB.
    </p>
  </div>
</div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}