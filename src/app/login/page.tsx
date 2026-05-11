"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (isSignUp) {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: normalizedEmail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not create account");
        return;
      }
    }

    const result = await signIn("credentials", {
      email: normalizedEmail,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-2xl font-bold text-slate-900">
          {isSignUp ? "Create an account" : "Log in"}
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          {isSignUp
            ? "Sign up to start using Trace Labs."
            : "Log in to your Trace Labs account."}
        </p>

        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp((prev) => !prev)}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </form>
    </main>
  );
}