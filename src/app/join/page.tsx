"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight, ChevronLeft, Building2, Phone, Wrench, ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["Plumbing", "Electrical", "General Contracting", "HVAC", "Painting", "Landscaping", "Other"];

const districts = ["Oranjestad", "Noord", "Palm/Eagle Beach", "San Nicolas", "Savaneta", "Santa Cruz", "Paradera", "Pos Chiquito"];

const servicesByCategory: Record<string, string[]> = {
  Plumbing: ["Emergency Repairs", "Pipe Installation", "Water Heater", "Leak Detection", "Drain Cleaning", "Boiler Service"],
  Electrical: ["Panel Upgrades", "Wiring", "Lighting Installation", "Generator Setup", "Fault Finding", "Smart Home", "EV Chargers"],
  "General Contracting": ["New Construction", "Renovations", "Tiling", "Waterproofing", "Flooring", "Carpentry", "Painting"],
  HVAC: ["A/C Installation", "Repair & Service", "Duct Cleaning", "Preventive Maintenance", "VRF Systems", "Energy Audits"],
  Painting: ["Interior Painting", "Exterior Painting", "Waterproofing", "Surface Prep", "Decorative Finishes"],
  Landscaping: ["Garden Design", "Irrigation Systems", "Tree Trimming", "Lawn Care", "Planting"],
  Other: ["Consultation", "Installation", "Maintenance", "Repair", "Other Services"],
};

const categoryColors: Record<string, string> = {
  Plumbing: "blue", Electrical: "amber", "General Contracting": "orange",
  HVAC: "teal", Painting: "purple", Landscaping: "green", Other: "blue",
};

interface FormData {
  businessName: string;
  category: string;
  district: string;
  phone: string;
  email: string;
  website: string;
  photoUrl: string;
  description: string;
  services: string[];
  agree: boolean;
}

const empty: FormData = {
  businessName: "", category: "", district: "",
  phone: "", email: "", website: "", photoUrl: "",
  description: "", services: [], agree: false,
};

const stepLabels = ["Business Info", "Contact Details", "Services & Submit"];

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(s: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  }

  function canProceed(): boolean {
    if (step === 0) return !!(form.businessName && form.category && form.district);
    if (step === 1) return !!(form.phone && form.email && form.description);
    if (step === 2) return form.services.length > 0 && form.agree;
    return false;
  }

  function handleSubmit() {
    // Build initials from business name
    const initials = form.businessName
      .split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

    const newEntry = {
      id: `local-${Date.now()}`,
      name: form.businessName,
      category: form.category,
      district: form.district,
      phone: form.phone,
      email: form.email,
      website: form.website,
      imageUrl: form.photoUrl,
      description: form.description,
      services: form.services,
      rating: null,
      reviewCount: 0,
      status: "pending",
      featured: false,
      joinedDate: new Date().toISOString().split("T")[0],
      initials,
      categoryColor: categoryColors[form.category] ?? "blue",
    };

    const existing = JSON.parse(localStorage.getItem("arubaProApplications") || "[]");
    existing.push(newEntry);
    localStorage.setItem("arubaProApplications", JSON.stringify(existing));

    setSubmitted(true);
  }

  const availableServices = servicesByCategory[form.category] ?? servicesByCategory["Other"];

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-16 bg-slate-50 flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-3">Application Submitted!</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-2">
              Thank you, <strong>{form.businessName}</strong>. Your listing is now pending review.
            </p>
            <p className="text-slate-400 text-sm">
              Check the Admin Dashboard to approve your listing. We will contact you at <strong>{form.email}</strong>.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 bg-slate-50">
        <div className="bg-navy-900 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">List Your Business</h1>
            <p className="text-navy-200">Join professionals on ArubaPro Connect. Free forever.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress steps */}
          <div className="flex items-center justify-between mb-10">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div className={`absolute left-0 top-4 w-full h-0.5 -translate-x-1/2 ${i <= step ? "bg-brand-500" : "bg-slate-200"}`} />
                )}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                  i < step ? "bg-brand-500 text-white" : i === step ? "bg-navy-900 text-white ring-4 ring-navy-900/10" : "bg-slate-200 text-slate-400"
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium text-center ${i === step ? "text-navy-900" : "text-slate-400"}`}>{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            {/* Step 0: Business Info */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-brand-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-navy-900">Business Information</h2>
                </div>

                <Field label="Business Name *">
                  <input type="text" value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
                    placeholder="e.g. Caribbean Plumbing Solutions" className={inputClass} />
                </Field>

                <Field label="Service Category *">
                  <select value={form.category} onChange={(e) => { update("category", e.target.value); update("services", []); }} className={inputClass}>
                    <option value="">Select a category…</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>

                <Field label="District *">
                  <select value={form.district} onChange={(e) => update("district", e.target.value)} className={inputClass}>
                    <option value="">Select your district…</option>
                    {districts.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
            )}

            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-navy-900">Contact Details</h2>
                </div>

                <Field label="Phone Number *">
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="+297 594-0000" className={inputClass} />
                </Field>

                <Field label="Email Address *">
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder="you@yourbusiness.aw" className={inputClass} />
                </Field>

                <Field label="Website" hint="Optional">
                  <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)}
                    placeholder="https://yourbusiness.aw" className={inputClass} />
                </Field>

                <Field label="Business Photo" hint="Optional — paste a link to a photo of your work">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <ImageIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <input type="url" value={form.photoUrl} onChange={(e) => update("photoUrl", e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent" />
                    </div>
                    {form.photoUrl && (
                      <div className="h-36 rounded-xl overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-xs text-slate-400">Tip: upload to Imgur or Google Drive and paste the link.</p>
                  </div>
                </Field>

                <Field label="Business Description *" hint="1–3 sentences about your services">
                  <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                    placeholder="We provide professional services across Aruba, specializing in…"
                    rows={4} className={`${inputClass} resize-none`} />
                </Field>
              </div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-brand-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-navy-900">Services Offered</h2>
                </div>

                <p className="text-sm text-slate-500">Select all services you offer. Choose at least one.</p>

                <div className="grid grid-cols-2 gap-2.5">
                  {availableServices.map((s) => {
                    const checked = form.services.includes(s);
                    return (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-colors ${
                          checked ? "bg-navy-900 border-navy-900 text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}>
                        <span className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${checked ? "bg-brand-500 border-brand-500" : "border-slate-300"}`}>
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Review summary */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-sm">
                  <p className="font-semibold text-navy-900 mb-2">Review Your Listing</p>
                  <Row label="Business" value={form.businessName} />
                  <Row label="Category" value={form.category} />
                  <Row label="District" value={form.district} />
                  <Row label="Phone" value={form.phone} />
                  <Row label="Email" value={form.email} />
                  {form.photoUrl && (
                    <div className="mt-2">
                      <p className="text-slate-400 text-xs mb-1">Photo preview</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.photoUrl} alt="Business photo" className="h-24 w-full object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer mt-4">
                  <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand-500" />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I confirm that the information provided is accurate and that this is a real business operating in Aruba.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {step < 2 ? (
                <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}
                  className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold bg-navy-900 hover:bg-navy-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={!canProceed()}
                  className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Submit Application <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-slate-400">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-slate-400 w-20 flex-shrink-0">{label}</span>
      <span className="text-slate-700 font-medium truncate">{value || "—"}</span>
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors";
