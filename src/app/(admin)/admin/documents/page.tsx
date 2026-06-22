import { prisma } from "@/src/lib/prisma";
import { DocumentUploadButton } from "../components/DocumentUploadButton";
import { DocumentsTable } from "./components/DocumentsTable";

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">
            Documents
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            View files that have been uploaded for the Trace Labs chatbot.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Uploaded Files
            </h2>
            <DocumentUploadButton />
          </div>

          <DocumentsTable documents={documents} />
        </div>
      </div>
    </main>
  );
}