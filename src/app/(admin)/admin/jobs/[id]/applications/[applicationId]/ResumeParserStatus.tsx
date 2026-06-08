"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ResumeParserStatus({
  status,
  applicationId,
  resumeScore,
  resumeStrengths,
  resumeGaps,
  resumeExplanation,
}: {
  status?: string;
  applicationId: string;
  resumeScore?: number;
  resumeStrengths?: string[];
  resumeGaps?: string[];
  resumeExplanation?: string;
}) {
  const [isRunning, setIsRunning] = useState(false);

  async function runResumeParser(applicationId: string) {
    try {
    setIsRunning(true);
      const response = await fetch(
        `/api/admin/applications/${applicationId}/parse-resume`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to run parser");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to run resume parser");
    } finally {
      setIsRunning(false);
    }
  }

  switch (status) {
    case "SCORED":
      return (
        <div className="pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Resume Score
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-700">
              Score: {resumeScore ?? "N/A"}
            </p>
            <button
              onClick={() => runResumeParser(applicationId)}
              disabled={isRunning}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {resumeStrengths?.length ? (
            <div className="mt-3">
              <p className="text-sm font-medium text-green-700">
                Strengths
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                {resumeStrengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {resumeGaps?.length ? (
            <div className="mt-3">
              <p className="text-sm font-medium text-amber-700">
                Gaps
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                {resumeGaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {resumeExplanation && (
            <div className="mt-3">
              <p className="text-sm font-medium text-slate-900">
                Explanation
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {resumeExplanation}
              </p>
            </div>
          )}
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center gap-2">
          <p className="text-sm text-red-600">Failed</p>

          <button
            onClick={() => runResumeParser(applicationId)}
            disabled={isRunning}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      );


    default:
      return (
        
        <div className="">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Resume Score
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-900">Not Run</p>
            <button
              onClick={() => runResumeParser(applicationId)}
              disabled={isRunning}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      );
  }
}