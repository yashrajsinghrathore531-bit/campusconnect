"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          router.push("/");
        } else {
          setMessage("Account created! Check your email to confirm signup.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101d30] p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center">
          Campus<span className="text-blue-400">Connect</span>
        </h1>

        <p className="mt-3 mb-8 text-center text-gray-400">
          {isSignup ? "Create your student account" : "Welcome back to campus"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full rounded-lg border border-white/10 bg-[#07111f] p-3 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-white/10 bg-[#07111f] p-3 outline-none focus:border-blue-400"
            />
          </div>

          {message && (
            <p className="text-sm text-blue-300 break-words">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isSignup ? "Already registered?" : "New to CampusConnect?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
            }}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </main>
  );
}
