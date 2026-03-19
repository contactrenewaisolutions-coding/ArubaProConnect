"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Trash2, Users, Clock, Star, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Provider } from "@/components/ProviderCard";
import rawData from "@/data/providers.json";

type ProviderWithStatus = Provider & { status: "approved" | "pending" | "rejected" };

export default function AdminPage() {
  const [providers, setProviders] = useState<ProviderWithStatus[]>(
    rawData.providers as ProviderWithStatus[]
  );

  const pending = providers.filter((p) => p.status === "pending");
  const approved = providers.filter((p) => p.status === "approved");
  const avgRating =
    approved.reduce((sum, p) => sum + (p.rating ?? 0), 0) / (approved.filter((p) => p.rating).length || 1);

  function approve(id: string) {
    setProviders((ps) => ps.map((p) => (p.id === id ? { ...p, status: "approved" } : p)));
  }

  function reject(id: string) {
    setProviders((ps) => ps.map((p) => (p.id === id ? { ...p, status: "rejected" } : p)));
  }

  function remove(id: string) {
    setProviders((ps) => ps.filter((p) => p.id !== id));
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-16 bg-slate-50">
        {/* Header */}
        <div className="bg-navy-900 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-5 h-5 text-brand-400" />
                <span className="text-brand-400 text-xs font-semibold uppercase tracking-widest">Admin Area</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Platform Dashboard</h1>
              <p className="text-navy-300 text-sm mt-1">Manage provider listings and approvals.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full font-medium">
              <Clock className="w-3.5 h-3.5" /> Demo — changes are local only
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users className="w-5 h-5 text-brand-500" />}
              label="Total Providers"
              value={providers.length}
            />
            <StatCard
              icon={<Clock className="w-5 h-5 text-amber-500" />}
              label="Pending Review"
              value={pending.length}
              highlight={pending.length > 0}
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              label="Approved"
              value={approved.length}
            />
            <StatCard
              icon={<Star className="w-5 h-5 text-amber-400" />}
              label="Avg. Rating"
              value={avgRating.toFixed(1)}
            />
          </div>

          {/* Pending Applications */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-navy-900">Pending Applications</h2>
              {pending.length > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full">
                  {pending.length}
                </span>
              )}
            </div>

            {pending.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
                <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-400" />
                <p className="font-medium text-slate-500">All caught up! No pending applications.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <Th>Business</Th>
                        <Th>Category</Th>
                        <Th>District</Th>
                        <Th>KVK</Th>
                        <Th>Applied</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {pending.map((p) => (
                        <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                                {p.initials}
                              </div>
                              <div>
                                <p className="font-semibold text-navy-900">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.email}</p>
                              </div>
                            </div>
                          </td>
                          <Td>{p.category}</Td>
                          <Td>{p.district}</Td>
                          <Td>
                            <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{p.kvk}</span>
                          </Td>
                          <Td>{new Date(p.joinedDate).toLocaleDateString("en-AW", { day: "numeric", month: "short", year: "numeric" })}</Td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => approve(p.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button
                                onClick={() => reject(p.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Approved Listings */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-navy-900">Approved Listings</h2>
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full">
                {approved.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <Th>Business</Th>
                      <Th>Category</Th>
                      <Th>District</Th>
                      <Th>Rating</Th>
                      <Th>Reviews</Th>
                      <Th>Featured</Th>
                      <Th>Remove</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((p) => (
                      <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center text-xs font-bold text-brand-400">
                              {p.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-navy-900">{p.name}</p>
                              <p className="text-xs text-slate-400">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <Td>{p.category}</Td>
                        <Td>{p.district}</Td>
                        <Td>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {p.rating ?? "—"}
                          </span>
                        </Td>
                        <Td>{p.reviewCount}</Td>
                        <Td>
                          {p.featured ? (
                            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </Td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => remove(p.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Rejected (if any) */}
          {providers.some((p) => p.status === "rejected") && (
            <section>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Rejected</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <Th>Business</Th>
                        <Th>Category</Th>
                        <Th>District</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers
                        .filter((p) => p.status === "rejected")
                        .map((p) => (
                          <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                            <td className="px-5 py-4">
                              <p className="font-semibold text-slate-600">{p.name}</p>
                              <p className="text-xs text-slate-400">{p.email}</p>
                            </td>
                            <Td>{p.category}</Td>
                            <Td>{p.district}</Td>
                            <td className="px-5 py-4 flex items-center gap-2">
                              <button
                                onClick={() => approve(p.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Reinstate
                              </button>
                              <button
                                onClick={() => remove(p.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 ${highlight ? "border-amber-200 bg-amber-50/50" : "border-slate-100"}`}>
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-navy-900">{value}</p>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{children}</td>;
}

