"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard, { type Provider } from "@/components/ProviderCard";
import data from "@/data/providers.json";

const ALL = "All";
const categories = [ALL, "Plumbing", "Electrical", "General Contracting", "HVAC", "Painting", "Landscaping"];
const approved = (data.providers as Provider[]).filter((p) => p.status === "approved");

function DirectoryContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? ALL);

  useEffect(() => {
    setQuery(params.get("q") ?? "");
    setCategory(params.get("category") ?? ALL);
  }, [params]);

  const filtered = useMemo(() => {
    return approved.filter((p) => {
      const matchCat = category === ALL || p.category === category;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <>
      {/* Filters */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, service, or district…"
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 sm:hidden bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 text-sm text-slate-700 outline-none bg-transparent"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Category pills (desktop) */}
          <div className="hidden sm:flex flex-wrap gap-2 mt-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-navy-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-slate-500 mb-6">
          {filtered.length === 0
            ? "No professionals found. Try adjusting your filters."
            : `Showing ${filtered.length} professional${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium text-slate-500">No results found</p>
            <p className="text-sm mt-1">Try a different search term or category.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function DirectoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Page header */}
        <div className="bg-navy-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Service Directory</h1>
            <p className="text-navy-200">Browse {approved.length} verified professionals across Aruba.</p>
          </div>
        </div>
        <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading…</div>}>
          <DirectoryContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
