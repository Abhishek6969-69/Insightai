import React from "react";
import Link from "next/link";

export default function Hero() {
return (
<section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50">
<div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
<div>
<h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">Ship better products faster with AI-powered workspaces</h1>
<p className="mt-6 max-w-xl text-lg text-gray-600">Generate content, iterate on ideas, and collaborate with teammates — all in one secure workspace. Built for product teams, content creators and agencies.</p>


<div className="mt-8 flex flex-wrap gap-4">
<Link href="/auth/signup" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-3 text-white text-lg font-semibold shadow-lg hover:opacity-95">Get started — it&apos;s free</Link>
<a href="#product" className="inline-flex items-center rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">Explore product</a>
</div>


<ul className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
<li>✅ Free 14-day trial</li>
<li>🔒 SOC2-ready security</li>
<li>⚡ 99.9% uptime</li>
</ul>


<div className="mt-8 flex items-center gap-6">
<div className="text-sm text-gray-500">Trusted by</div>
<div className="flex flex-wrap items-center gap-4">
<div className="h-6 w-20 rounded bg-gray-100 text-center text-xs leading-6 text-gray-500">Acme</div>
<div className="h-6 w-20 rounded bg-gray-100 text-center text-xs leading-6 text-gray-500">Atlas</div>
<div className="h-6 w-20 rounded bg-gray-100 text-center text-xs leading-6 text-gray-500">Nova</div>
</div>
</div>
</div>

<div className="relative">
<div className="relative mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg sm:max-w-xl">
<div className="flex items-center justify-between gap-4">
<div>
<div className="text-sm font-semibold text-gray-900">Project • Product Launch</div>
<div className="mt-1 text-xs text-gray-500">Updated 2 days ago • 4 collaborators</div>
</div>
<div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">AI Assist</div>
</div>


<div className="mt-6 grid gap-3">
<div className="rounded-md border border-gray-100 p-3">
<div className="text-sm font-medium text-gray-900">Generate release notes</div>
<div className="mt-2 text-sm text-gray-600">Draft polished release notes for your product update using a tailored prompt template.</div>
</div>


<div className="flex items-center justify-between gap-4">
<div className="flex-1 rounded-md border border-gray-100 p-3">
<div className="text-sm font-medium text-gray-900">AI Summary</div>
<div className="mt-1 text-xs text-gray-500">3 suggestions</div>
</div>
<div className="w-24 text-right text-xs text-gray-500">0.02 credits</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
);
}