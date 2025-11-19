"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";


export default function Page() {
return (
<div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
<Navbar />
<main>
<Hero />
<Features />
<HowItWorks />
</main>
<Footer />
</div>
);
}