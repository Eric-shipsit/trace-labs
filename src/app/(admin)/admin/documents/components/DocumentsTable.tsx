"use client";

import { useState } from "react";

type DocumentRow = {
  id: string;
  name: string;
  fileType: string;
  status: string;
  createdAt: Date;
};

export function DocumentsTable({ documents }: { documents: DocumentRow[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected =
    documents.length > 0 && selectedIds.length === documents.length;

  const toggleDocument = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((documentId) => documentId !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : documents.map((document) => document.id));
  };

  const processSelected = async () => {
    if (selectedIds.length === 0) return;

    const response = await fetch("/api/admin/documents/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentIds: selectedIds,
      }),
    });

    if (!response.ok) {
      alert("Failed to process documents");
      return;
    }

    window.location.reload();
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected document(s)? This cannot be undone.`
    );

    if (!confirmed) return;

    const response = await fetch("/api/admin/documents/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentIds: selectedIds,
      }),
    });

    if (!response.ok) {
      alert("Failed to delete documents");
      return;
    }

    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <p className="text-sm text-slate-500">
          {selectedIds.length} selected
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            Delete Selected
          </button>

          <button
            type="button"
            onClick={processSelected}
            disabled={selectedIds.length === 0}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Process Selected
          </button>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>
            <th className="px-6 py-3 font-semibold">File name</th>
            <th className="px-6 py-3 font-semibold">Type</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Uploaded</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {documents.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-10 text-center text-sm text-slate-500"
              >
                No documents uploaded yet.
              </td>
            </tr>
          ) : (
            documents.map((document) => (
              <tr key={document.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(document.id)}
                    onChange={() => toggleDocument(document.id)}
                  />
                </td>

                <td className="px-6 py-4 font-medium text-slate-900">
                  {document.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {document.fileType}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {document.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {new Date(document.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}