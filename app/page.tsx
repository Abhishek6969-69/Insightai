
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Features from "./components/features";
import How from "./components/how";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <How />
      <Footer />
    </div>
  );
}
