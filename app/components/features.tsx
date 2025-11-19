export default function Features(){
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Core features</h2>
        <p className="mt-2 text-gray-600">Everything teams need to generate, organize and ship AI-driven content.</p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="h-10 w-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">AI</div>
            <h3 className="mt-4 font-semibold text-gray-900">AI Content</h3>
            <p className="mt-2 text-sm text-gray-600">Generate high-quality text, summaries, and ideas instantly.</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="h-10 w-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">P</div>
            <h3 className="mt-4 font-semibold text-gray-900">Projects</h3>
            <p className="mt-2 text-sm text-gray-600">Organize work into projects and share with teammates.</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="h-10 w-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">T</div>
            <h3 className="mt-4 font-semibold text-gray-900">Usage Tracking</h3>
            <p className="mt-2 text-sm text-gray-600">Track usage and credits across teams and projects.</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="h-10 w-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">S</div>
            <h3 className="mt-4 font-semibold text-gray-900">Secure & Fast</h3>
            <p className="mt-2 text-sm text-gray-600">Built with modern infra for speed and data protection.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
