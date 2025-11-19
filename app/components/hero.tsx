export default function Hero() {
  return (
  <section className="py-20 bg-linear-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Build faster with InsightAI</h1>
          <p className="mt-4 text-lg text-gray-600">AI-powered content generation and project workspaces to help teams ship ideas faster.</p>

          <div className="mt-8 flex items-center gap-4">
            <a href="/auth/signup" className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500">Get started</a>
            <a href="/auth/signin" className="inline-flex items-center rounded-md border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">Sign in</a>
          </div>
        </div>
      </div>
    </section>
  );
}
