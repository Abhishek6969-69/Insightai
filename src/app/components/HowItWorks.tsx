import React from "react";


export default function HowItWorks(){
const steps = [
{ id: 1, title: 'Sign up & verify', desc: 'Create an account and confirm your email to unlock features.' },
{ id: 2, title: 'Create a project', desc: 'Organize prompts, assets and outputs in a workspace.' },
{ id: 3, title: 'Generate with AI', desc: 'Use AI to create content and iterate quickly.' }
];


return (
<section className="py-16 bg-[#fbfcfe]">
<div className="mx-auto max-w-5xl px-6 lg:px-8">
<h2 className="text-2xl font-bold text-gray-900 text-center">How it works</h2>
<p className="mt-2 text-gray-600 text-center">Three simple steps to get started.</p>


<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
{steps.map(s => (
<div key={s.id} className="p-6 rounded-2xl text-center bg-linear-to-b from-white to-gray-50 shadow-sm transform transition-all hover:-translate-y-2 hover:shadow-lg">
<div className="mx-auto h-14 w-14 rounded-full bg-linear-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center font-semibold text-lg">{s.id}</div>
<h3 className="mt-4 font-semibold">{s.title}</h3>
<p className="mt-2 text-sm text-gray-600">{s.desc}</p>
</div>
))}
</div>
</div>
</section>
)
}