import { useSearchParams } from "next/navigation";

export default function VerifyFailed() {
  const params = useSearchParams();
  const reason = params.get("reason") ?? "invalid";
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-red-600">Verification failed</h1>
      <p className="mt-4">Reason: {reason}</p>
      <p className="mt-4">If you need a new link, try signing up again or request a new verification email.</p>
    </main>
  );
}
