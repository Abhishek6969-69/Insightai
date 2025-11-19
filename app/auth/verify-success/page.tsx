export default function VerifySuccess() {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Email verified</h1>
      <p className="mt-4">Your email was successfully verified. You can now <a href="/auth/signin" className="text-blue-600">sign in</a>.</p>
    </main>
  );
}
