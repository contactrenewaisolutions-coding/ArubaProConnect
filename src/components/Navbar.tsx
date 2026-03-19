"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/join", label: "For Professionals" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wrench className="w-4 h-4 text-brand-500" />
            </div>
            <span className="font-semibold text-navy-900 text-lg leading-none">
              ArubaPro{" "}
              <span className="text-brand-500">Connect</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy-900 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-2 px-4 py-2 text-sm font-medium bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-100 py-3 pb-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-navy-900 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-1 px-4">
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium bg-navy-900 text-white rounded-xl text-center hover:bg-navy-800 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
