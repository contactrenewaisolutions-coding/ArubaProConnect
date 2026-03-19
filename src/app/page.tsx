import Link from "next/link";
import {
  Search, Users, Phone, ArrowRight,
  Zap, Droplets, HardHat, Wind, Paintbrush, Leaf,
  Star, MapPin, CheckCircle, ThumbsUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard, { type Provider } from "@/components/ProviderCard";
import HeroSearch from "@/components/HeroSearch";
import data from "@/data/providers.json";

const allApproved = (data.providers as Provider[]).filter((p) => p.status === "approved");

const stats = [
  { value: "50+",  label: "Professionals" },
  { value: "6",    label: "Categories" },
  { value: "8",    label: "Districts" },
  { value: "4.7★", label: "Avg Rating" },
];

const steps = [
  {
    step: "01",
    title: "Search for a Service",
    description: "Type what you need — plumber, electrician, painter — and find the right professional instantly.",
    icon: Search,
  },
  {
    step: "02",
    title: "Browse Business Profiles",
    description: "View real photos of their work, read local reviews, and compare services side by side.",
    icon: Users,
  },
  {
    step: "03",
    title: "Contact Directly",
    description: "Call or email the professional directly from their listing. No fees, no middlemen, ever.",
    icon: Phone,
  },
];

const categories = [
  { label: "Plumbing",    icon: Droplets,   color: "bg-blue-500",   query: "Plumbing" },
  { label: "Electrical",  icon: Zap,        color: "bg-amber-500",  query: "Electrical" },
  { label: "Contracting", icon: HardHat,    color: "bg-orange-500", query: "General Contracting" },
  { label: "HVAC",        icon: Wind,       color: "bg-teal-500",   query: "HVAC" },
  { label: "Painting",    icon: Paintbrush, color: "bg-purple-500", query: "Painting" },
  { label: "Landscaping", icon: Leaf,       color: "bg-green-500",  query: "Landscaping" },
];

const whyUs = [
  {
    icon: CheckCircle,
    title: "Professional Businesses",
    description: "Every listing is a real, registered Aruba business you can trust.",
  },
  {
    icon: ThumbsUp,
    title: "Reviewed by Locals",
    description: "Honest ratings from real Aruba residents — see what others say before you call.",
  },
  {
    icon: Star,
    title: "See Them in Action",
    description: "Browse photos of actual work so you know exactly what quality to expect.",
  },
  {
    icon: MapPin,
    title: "All Across Aruba",
    description: "Professionals in every district — from Oranjestad to San Nicolas and beyond.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative bg-navy-900 min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400 mb-7 bg-brand-500/10 px-4 py-2 rounded-full border border-brand-500/20">
              🇦🇼 Aruba&apos;s #1 Pro Marketplace
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.06] mb-7">
              Find Trusted<br />
              <span className="text-brand-400">Professionals</span><br />
              in Aruba
            </h1>
            <p className="text-navy-200 text-xl sm:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Browse real business photos, read local reviews, and contact the best
              home &amp; business professionals across the island.
            </p>
            <div className="flex justify-center mb-14">
              <HeroSearch />
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-navy-300">
              {[
                { icon: CheckCircle, label: "Professional Businesses" },
                { icon: ThumbsUp,    label: "Reviewed by Locals" },
                { icon: MapPin,      label: "Serving All of Aruba" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-brand-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 leading-none">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 80L80 65C160 50 320 20 480 13C640 6 800 20 960 28C1120 36 1280 36 1360 33L1440 30V80H0Z" fill="#ffffff" />
            </svg>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center py-5 border-r border-slate-100 last:border-0">
                  <p className="text-3xl font-bold text-navy-900 mb-1">{value}</p>
                  <p className="text-sm text-slate-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── dark navy ── */}
        <section className="bg-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Browse by Category</h2>
              <p className="text-navy-300 text-lg">Find the right type of professional for your job.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {categories.map(({ label, icon: Icon, color, query }) => (
                <Link
                  key={label}
                  href={`/directory?category=${encodeURIComponent(query)}`}
                  className="group flex flex-col items-center gap-3 p-5 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white/80 group-hover:text-white text-center transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── light with dot pattern ── */}
        <section className="relative bg-slate-50 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 block">Simple Process</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5">How It Works</h2>
              <p className="text-slate-500 text-xl max-w-lg mx-auto">Finding a reliable professional in Aruba takes less than 2 minutes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
              {steps.map(({ step, title, description, icon: Icon }) => (
                <div key={step} className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-navy-900 text-white mb-6 shadow-xl">
                    <Icon className="w-9 h-9" />
                    <span className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-brand-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      {step.replace("0", "")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ARUBAPRO ── dark navy with glass cards ── */}
        <section className="bg-navy-800 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3 block">Why Us</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">The ArubaPro Difference</h2>
              <p className="text-navy-300 text-xl max-w-xl mx-auto">Built specifically for Aruba — every feature designed for the local community.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUs.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-white/10 border border-white/10 rounded-2xl p-7 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALL PROFESSIONALS ── */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 block">Verified & Reviewed</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-3">Our Professionals</h2>
                <p className="text-slate-500 text-lg">All businesses reviewed and trusted by the Aruba community.</p>
              </div>
              <Link href="/directory" className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors whitespace-nowrap">
                Full directory <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {allApproved.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROVIDER CTA ── cyan gradient ── */}
        <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #004a51 50%, #0A1628 100%)" }}>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5 block">For Businesses</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Are you a local professional?
            </h2>
            <p className="text-navy-200 text-xl mb-10 leading-relaxed">
              Add your business to ArubaPro Connect. Upload photos, list your services, and start getting called by clients across Aruba. Completely free.
            </p>
            <Link href="/join" className="inline-flex items-center gap-2.5 px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors shadow-2xl text-lg">
              List Your Business Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
