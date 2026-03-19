import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  Zap,
  Droplets,
  HardHat,
  Wind,
  Paintbrush,
  Leaf,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard, { type Provider } from "@/components/ProviderCard";
import HeroSearch from "@/components/HeroSearch";
import data from "@/data/providers.json";

const featured = (data.providers as Provider[]).filter((p) => p.featured);

const steps = [
  {
    step: "01",
    title: "Search for a Service",
    description:
      "Use the search bar to find exactly the type of professional you need — from plumbing to electrical work.",
    icon: Search,
  },
  {
    step: "02",
    title: "Browse Verified Profiles",
    description:
      "Every listing is KVK-verified. Read reviews, compare services, and choose with confidence.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Contact Directly",
    description:
      "Reach out to your chosen professional directly by phone or email. No middlemen, no fees.",
    icon: Star,
  },
];

const categories = [
  { label: "Plumbing", icon: Droplets, color: "bg-blue-50 text-blue-600", query: "Plumbing" },
  { label: "Electrical", icon: Zap, color: "bg-amber-50 text-amber-600", query: "Electrical" },
  { label: "Contracting", icon: HardHat, color: "bg-orange-50 text-orange-600", query: "General Contracting" },
  { label: "HVAC", icon: Wind, color: "bg-teal-50 text-teal-600", query: "HVAC" },
  { label: "Painting", icon: Paintbrush, color: "bg-purple-50 text-purple-600", query: "Painting" },
  { label: "Landscaping", icon: Leaf, color: "bg-green-50 text-green-600", query: "Landscaping" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative bg-navy-900 pt-32 pb-24 overflow-hidden">
          {/* subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* cyan glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400 mb-6 bg-brand-500/10 px-4 py-1.5 rounded-full border border-brand-500/20">
              🇦🇼 Aruba&apos;s #1 Pro Marketplace
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Trusted{" "}
              <span className="text-brand-400">Professionals</span>
              <br className="hidden sm:block" /> in Aruba
            </h1>

            <p className="text-navy-200 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Connect with KVK-verified local experts for any home or business
              service — fast, reliable, and island-approved.
            </p>

            <div className="flex justify-center mb-10">
              <HeroSearch />
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-navy-300">
              {["KVK Verified", "Licensed & Insured", "Reviewed by Locals"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* wave divider */}
          <div className="absolute bottom-0 left-0 right-0 leading-none">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path
                d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
                fill="#f8fafc"
              />
            </svg>
          </div>
        </section>

        {/* ── Category Quick Links ── */}
        <section className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {categories.map(({ label, icon: Icon, color, query }) => (
                <Link
                  key={label}
                  href={`/directory?category=${encodeURIComponent(query)}`}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">How It Works</h2>
              <p className="text-slate-500 text-lg max-w-lg mx-auto">
                Finding a reliable professional in Aruba has never been simpler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map(({ step, title, description, icon: Icon }) => (
                <div key={step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy-900 text-white mb-5 shadow-md">
                    <Icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Professionals ── */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-2">
                  Featured Professionals
                </h2>
                <p className="text-slate-500">Top-rated providers trusted by the Aruba community.</p>
              </div>
              <Link
                href="/directory"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/directory" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600">
                View all professionals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Provider CTA ── */}
        <section className="bg-navy-900 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Are you a local professional?
            </h2>
            <p className="text-navy-200 text-lg mb-8 leading-relaxed">
              Join ArubaPro Connect and get discovered by hundreds of potential clients across the
              island. Listing is free and takes just minutes.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              List Your Business <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
