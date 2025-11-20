import Link from 'next/link';

export default function Hero() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Build faster with InsightAI</h1>
          <p className="mt-4 text-lg text-gray-600">AI-powered content generation and project workspaces to help teams ship ideas faster.</p>

          <div className="mt-8 flex items-center gap-4">
            <Link href="/signup" className="btn-primary bg-primary-gradient inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg" aria-label="Get started">Get started</Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-200">Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
