import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-brand-500/20 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-semibold text-white text-lg">
                ArubaPro <span className="text-brand-400">Connect</span>
              </span>
            </Link>
            <p className="text-navy-200 text-sm leading-relaxed">
              The premier marketplace for verified home and business service
              professionals across Aruba.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-navy-300 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/directory", label: "Service Directory" },
                { href: "/join", label: "List Your Business" },
                { href: "/admin", label: "Admin Dashboard" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-navy-300 mb-4">
              About
            </h3>
            <ul className="space-y-2.5 text-sm text-navy-200">
              <li>All providers are KVK-verified</li>
              <li>Serving all districts of Aruba</li>
              <li>Managed by a local admin team</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-800 text-center text-xs text-navy-400">
          © {new Date().getFullYear()} ArubaPro Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
