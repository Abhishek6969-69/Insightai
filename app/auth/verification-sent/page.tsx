"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerificationSent() {
  const params = useSearchParams();
  const email = params?.get("email") ?? "";
  const sent = params?.get("sent") === "1";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function resend() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to resend');
      setMessage(data?.message || 'Verification email sent');
      // Show dev verification URL if provided
      if (data?.devVerifyUrl) {
        setMessage((prev) => (prev ? `${prev}\nDev verification link: ${data.devVerifyUrl}` : `Dev verification link: ${data.devVerifyUrl}`));
      }
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
        <div className="flex justify-center mb-6">
          <svg className="h-12 w-12 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-gray-400 mb-6">
          {sent ? (
            `We sent a verification link to ${email}. Click the link to verify your account.`
          ) : (
            "We could not send the verification email automatically. You can try resending below."
          )}
        </p>
          {/* No dev verification link shown in the clean version */}
        {!sent && (
          <div>
            <button onClick={resend} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
              {loading ? 'Sending…' : 'Resend verification email'}
            </button>
            {message && <p className="mt-3 text-sm text-gray-300">{message}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
