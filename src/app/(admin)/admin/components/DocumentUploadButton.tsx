"use client";

import { Upload } from "lucide-react";

export function DocumentUploadButton() {
  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/documents/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Upload failed");
      return;
    }

    window.location.reload();
  };

  return (
    <>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
        <Upload className="h-4 w-4" />
        Upload Document

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </>
  );
}