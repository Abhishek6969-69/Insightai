"use client";
import React, { useState } from "react";
import Link from "next/link";


export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-4 z-50">
			<div className="mx-auto max-w-7xl px-6">
				<div className="rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm py-3 px-4 md:px-6 flex items-center justify-between gap-6">
					<div className="flex items-center gap-4">
						<Link href="/" className="inline-flex items-center gap-3">
							  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg">IA</span>
							<span className="hidden sm:inline-block font-semibold text-lg text-gray-900">InsightAI</span>
						</Link>
					</div>

					<nav className="hidden md:flex items-center gap-8">
						<Link href="#product" className="text-sm text-gray-600 hover:text-gray-900">Product</Link>
						<Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
						<Link href="#docs" className="text-sm text-gray-600 hover:text-gray-900">Docs</Link>
						<Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Enterprise</Link>
					</nav>

					<div className="flex items-center gap-3">
						<Link href="/auth/signin" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
						<Link href="/auth/signup" className="hidden sm:inline-flex items-center rounded-full bg-linear-to-br from-indigo-600 to-purple-600 px-4 py-2 text-white text-sm font-medium shadow hover:opacity-95">Get started</Link>

						<button
							aria-label="Toggle menu"
							className="inline-flex items-center justify-center rounded-md p-2 md:hidden text-gray-600 hover:bg-gray-100"
							onClick={() => setOpen(!open)}
						>
							<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
								{open ? (
									<path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>

				{open && (
					<div className="mt-3 md:hidden">
						<div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow">
							<Link href="#product" className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50">Product</Link>
							<Link href="#pricing" className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50">Pricing</Link>
							<Link href="#docs" className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50">Docs</Link>
							<Link href="/auth/signin" className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50">Sign in</Link>
							  <Link href="/auth/signup" className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-purple-600 px-4 py-2 text-white text-sm font-medium">Get started</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}