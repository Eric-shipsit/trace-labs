"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, ask me anything about Trace Labs.",
    },
  ]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedQuestion },
    ]);
    setQuestion("");
    setIsLoading(true);

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: trimmedQuestion }),
    });

    const data = await response.json();

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        content: response.ok
          ? data.answer
          : "Sorry, something went wrong.",
      },
    ]);

    setIsLoading(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
            <div>
              <h2 className="text-sm font-semibold">Trace Labs Assistant</h2>
              <p className="text-xs text-slate-300">
                Ask me anything.
              </p>
            </div>

            <button type="button" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-sm text-slate-500">
                Thinking...
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-slate-200 bg-white p-3"
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:bg-slate-300"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}