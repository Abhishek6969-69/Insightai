"use client";
import React, { useState } from 'react';
import { Mail, Lock, User, BrainCircuit, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Signup failed");
  // Always go to verification-sent page and pass whether the email was sent
  const params = new URLSearchParams({ email, sent: data?.emailSent ? '1' : '0' });
  router.push(`/auth/verification-sent?${params.toString()}`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-full mb-4">
            <BrainCircuit className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-center">Create your InsightAI account</h1>
          <p className="text-gray-400 text-center mt-2">Start your journey into advanced analytics.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <button 
            disabled={loading} 
            className="w-full bg-indigo-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-indigo-600/40"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <button 
            onClick={() => router.push('/auth/signin')}
            className="font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}
