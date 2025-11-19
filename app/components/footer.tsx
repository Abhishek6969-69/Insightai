export default function Footer(){
  return (
    <footer className="border-t bg-white border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-lg font-bold">InsightAI</div>
          <p className="mt-2 text-sm text-gray-600">AI workspace for teams.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  )
}
