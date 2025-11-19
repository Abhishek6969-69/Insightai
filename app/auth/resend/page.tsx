"use client";
import { useState } from 'react';

export default function ResendPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to resend');
      setMessage(data?.message || 'Verification email sent');
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Resend verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2" />
          <button disabled={loading} className="w-full bg-indigo-600 text-white px-4 py-2 rounded">{loading ? 'Sending…' : 'Resend email'}</button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
      </div>
    </main>
  );
}
