export default function How(){
  return (
    <section className="py-16 bg-zinc-50">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
        <p className="mt-2 text-gray-600">Three simple steps to get started.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-100 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">1</div>
            <h3 className="mt-4 font-semibold">Sign up & verify</h3>
            <p className="mt-2 text-sm text-gray-600">Create an account and confirm your email to unlock features.</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">2</div>
            <h3 className="mt-4 font-semibold">Create a project</h3>
            <p className="mt-2 text-sm text-gray-600">Organize prompts, assets and outputs in a workspace.</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">3</div>
            <h3 className="mt-4 font-semibold">Generate with AI</h3>
            <p className="mt-2 text-sm text-gray-600">Use AI to create content and iterate quickly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
