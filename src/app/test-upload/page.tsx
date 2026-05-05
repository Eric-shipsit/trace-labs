"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Uploading...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Upload failed");
      return;
    }

    setMessage(`Uploaded: ${data.pathname}`);
    form.reset();
  }

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-semibold">Test Resume Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="jobId" value="test-job-1" />
        <input type="file" name="file" accept="application/pdf,.pdf" required />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Upload Resume
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}