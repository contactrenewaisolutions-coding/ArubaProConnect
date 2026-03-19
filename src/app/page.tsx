import Link from "next/link";
import {
  Search, Users, ThumbsUp, ArrowRight,
  Zap, Droplets, HardHat, Wind, Paintbrush, Leaf,
  Phone, Star, MapPin, CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard, { type Provider } from "@/components/ProviderCard";
import HeroSearch from "@/components/HeroSearch";
import data from "@/data/providers.json";

const featured = (data.providers as Provider[]).filter((p) => p.featured);

const stats = [
  { value: "50+", label: "Professionals" },
  { value: "6",   label: "Service Categories" },
  { value: "8",   label: "Districts Covered" },
  { value: "4.7★", label: "Average Rating" },
];

const steps = [
  {
    step: "01",
    title: "Search for a Service",
    description: "Type what you need — plumber, electrician, painter — and find the right professional instantly.",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
  },
  {
    step: "02",
    title: "Browse Business Profiles",
    description: "View photos, read reviews from locals, check contact info, and compare services side by side.",
    icon: Users,
    color: "bg-brand-50 text-brand-600",
  },
  {
    step: "03",
    title: "Contact Directly",
    description: "Call or email the professional directly from their listing. No fees, no middlemen.",
    icon: Phone,
    color: "bg-green-50 text-green-600",
  },
];

const categories = [
  { label: "Plumbing",     icon: Droplets,   color: "bg-blue-50 text-blue-600",   query: "Plumbing" },
  { label: "Electrical",   icon: Zap,        color: "bg-amber-50 text-amber-600", query: "Electrical" },
  { label: "Contracting",  icon: HardHat,    color: "bg-orange-50 text-orange-600", query: "General Contracting" },
  { label: "HVAC",         icon: Wind,       color: "bg-teal-50 text-teal-600",   query: "HVAC" },
  { label: "Painting",     icon: Paintbrush, color: "bg-purple-50 text-purple-600", query: "Painting" },
  { label: "Landscaping",  icon: Leaf,       color: "bg-green-50 text-green-600", query: "Landscaping" },
];

const whyUs = [
  {
    icon: CheckCircle,
    title: "Professional Businesses",
    description: "Every listing is a real, registered Aruba business. No random freelancers — only proper companies you can trust.",
    color: "bg-brand-50 text-brand-600",
  },
  {
    icon: ThumbsUp,
    title: "Reviewed by Locals",
    description: "Real reviews from real Aruba residents. See ratings and feedback before you pick up the phone.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Star,
    title: "See Them in Action",
    description: "Browse business photos showing their actual work — so you know exactly what quality to expect.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MapPin,
    title: "All Across Aruba",
    description: "Professionals in every district — Oranjestad, Noord, San Nicolas, Savaneta, and beyond.",
    color: "bg-green-50 text-green-600",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative bg-navy-900 min-h-[88vh] flex items-center overflow-hidden">
          {/* grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* cyan glow blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400 mb-6 bg-brand-500/10 px-4 py-1.5 rounded-full border border-brand-500/20">
              🇦🇼 Aruba&apos;s #1 Pro Marketplace
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              Find Trusted<br />
              <span className="text-brand-400">Professionals</span><br />
              in Aruba
            </h1>

            <p className="text-navy-200 text-xl sm:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Browse photos, read local reviews, and contact the best home &amp; business
              service professionals across the island — all in one place.
            </p>

            <div className="flex justify-center mb-14">
              <HeroSearch />
            </div>

            {/* Trust badges */}
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

          {/* wave */}
          <div className="absolute bottom-0 left-0 right-0 leading-none">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 80L80 65C160 50 320 20 480 13C640 6 800 20 960 28C1120 36 1280 36 1360 33L1440 30V80H0Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-slate-50 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                  <p className="text-3xl font-bold text-navy-900 mb-1">{value}</p>
                  <p className="text-sm text-slate-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="bg-slate-50 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Browse by Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {categories.map(({ label, icon: Icon, color, query }) => (
                <Link
                  key={label}
                  href={`/directory?category=${encodeURIComponent(query)}`}
                  className="flex flex-col items-center gap-2.5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 text-center">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 block">Simple Process</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5">How It Works</h2>
              <p className="text-slate-500 text-xl max-w-xl mx-auto">
                Finding a reliable professional in Aruba takes less than 2 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map(({ step, title, description, icon: Icon, color }) => (
                <div key={step} className="relative text-center group">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-md ${color} relative`}>
                    <Icon className="w-9 h-9" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-navy-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ARUBAPRO ── */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 block">Why Us</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5">The ArubaPro Difference</h2>
              <p className="text-slate-500 text-xl max-w-xl mx-auto">
                We built this platform specifically for Aruba — so every feature is designed with the local community in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PROFESSIONALS ── */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 block">Top Rated</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-3">Featured Professionals</h2>
                <p className="text-slate-500 text-lg">Trusted and reviewed by the Aruba community.</p>
              </div>
              <Link
                href="/directory"
                className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors whitespace-nowrap"
              >
                View all professionals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROVIDER CTA ── */}
        <section className="relative bg-navy-900 py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-4 block">For Businesses</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Are you a local professional?
            </h2>
            <p className="text-navy-200 text-xl mb-10 leading-relaxed">
              Add your business to ArubaPro Connect and start getting discovered by hundreds of
              clients across the island. Upload a photo, list your services, and get contacted directly.
              It&apos;s completely free.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors shadow-lg text-lg"
            >
              List Your Business Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
