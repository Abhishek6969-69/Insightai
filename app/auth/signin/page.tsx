"use client";
import React, { useState } from 'react';
import { Mail, Lock, BrainCircuit, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn('credentials', { redirect: false, email, password });
      if (!res || res.error) throw new Error(res?.error || 'Sign in failed');
      router.push('/');
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
          <h1 className="text-3xl font-bold text-center">Sign in to InsightAI</h1>
          <p className="text-gray-400 text-center mt-2">Welcome back — enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-400">
    Don&apos;t have an account?{' '}
          <button 
            onClick={() => router.push('/auth/signup')}
            className="font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none"
          >
            Create one
          </button>
        </p>
      </div>
    </main>
  );
}
