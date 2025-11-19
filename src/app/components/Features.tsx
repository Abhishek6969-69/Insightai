import React from "react";


export default function Features() {
const items = [
{ key: 'ai', title: 'AI Content', desc: 'Generate high-quality text, summaries, and ideas instantly.' },
{ key: 'projects', title: 'Projects', desc: 'Organize work into projects and share with teammates.' },
{ key: 'usage', title: 'Usage Tracking', desc: 'Track usage and credits across teams and projects.' },
{ key: 'security', title: 'Secure & Fast', desc: 'Built with modern infra for speed and data protection.' }
];


return (
<section id="product" className="py-16">
<div className="mx-auto max-w-7xl px-6 lg:px-8">
<h2 className="text-2xl font-bold text-gray-900">Core features</h2>
<p className="mt-2 text-gray-600">Everything teams need to generate, organize and ship AI-driven content.</p>


<div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
{items.map((it, idx) => (
<div key={it.key} className="p-6 bg-white rounded-2xl shadow-sm transform transition-all hover:shadow-xl hover:-translate-y-2">
<div className={`h-12 w-12 rounded-lg flex items-center justify-center font-semibold ${idx===0? 'bg-indigo-50 text-indigo-600' : idx===1 ? 'bg-sky-50 text-sky-600' : idx===2 ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>{it.title.charAt(0)}</div>
<h3 className="mt-4 font-semibold text-gray-900">{it.title}</h3>
<p className="mt-2 text-sm text-gray-600">{it.desc}</p>
</div>
))}
</div>
</div>
</section>
);
}