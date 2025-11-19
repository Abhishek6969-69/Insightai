import React from "react";


export default function Footer(){
return (
<footer className="border-t border-gray-100 bg-white mt-20">
<div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="text-sm text-gray-700">© {new Date().getFullYear()} InsightAI</div>
<div className="flex items-center gap-6">
<a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
<a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
<a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
</div>
</div>
</footer>
)
}