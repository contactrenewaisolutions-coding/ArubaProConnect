"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const categories = [
  "All Services",
  "Plumbing",
  "Electrical",
  "General Contracting",
  "HVAC",
  "Painting",
  "Landscaping",
];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Services");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "All Services") params.set("category", category);
    router.push(`/directory?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col sm:flex-row gap-2"
    >
      <div className="flex flex-1 items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-lg">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a plumber, electrician…"
          className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm text-slate-600 outline-none bg-transparent border-l border-slate-200 pl-3 cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
