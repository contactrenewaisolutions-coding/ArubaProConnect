import { MapPin, Star, Phone, Mail } from "lucide-react";

export interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number | null;
  reviewCount: number;
  district: string;
  phone: string;
  email: string;
  description: string;
  services: string[];
  kvk: string;
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  joinedDate: string;
  initials: string;
  categoryColor: string;
  imageUrl?: string;
}

const avatarColors: Record<string, string> = {
  blue:   "bg-blue-600",
  amber:  "bg-amber-500",
  orange: "bg-orange-600",
  teal:   "bg-teal-600",
  purple: "bg-purple-600",
  green:  "bg-green-600",
};

const gradientColors: Record<string, string> = {
  blue:   "from-blue-600 to-blue-800",
  amber:  "from-amber-500 to-amber-700",
  orange: "from-orange-500 to-orange-700",
  teal:   "from-teal-500 to-teal-700",
  purple: "from-purple-500 to-purple-700",
  green:  "from-green-500 to-green-700",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  const avatarClass  = avatarColors[provider.categoryColor]  ?? "bg-slate-600";
  const gradientClass = gradientColors[provider.categoryColor] ?? "from-slate-600 to-slate-800";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden">

      {/* Business photo */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {provider.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={provider.imageUrl}
            alt={`${provider.name} — business photo`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <span className="text-4xl font-bold text-white/30">{provider.initials}</span>
          </div>
        )}
        {/* Category badge overlay */}
        <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {provider.category}
        </span>
        {provider.featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold text-amber-900 bg-amber-400 px-2.5 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name + avatar */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`${avatarClass} w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}>
            {provider.initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy-900 text-base leading-tight truncate">
              {provider.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{provider.district}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          {provider.rating ? (
            <div className="flex items-center gap-1.5">
              <StarRating rating={provider.rating} />
              <span className="text-sm font-semibold text-slate-700">{provider.rating}</span>
              <span className="text-xs text-slate-400">({provider.reviewCount} reviews)</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic">New — no reviews yet</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {provider.description}
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {provider.services.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              {s}
            </span>
          ))}
          {provider.services.length > 3 && (
            <span className="text-xs text-slate-400 px-1 py-1">
              +{provider.services.length - 3} more
            </span>
          )}
        </div>

        {/* Contact info */}
        <div className="space-y-2 mb-4 pt-3 border-t border-slate-100">
          <a
            href={`tel:${provider.phone}`}
            className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-navy-900 transition-colors group"
          >
            <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <span className="font-medium">{provider.phone}</span>
          </a>
          <a
            href={`mailto:${provider.email}`}
            className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-navy-900 transition-colors group"
          >
            <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <span className="truncate">{provider.email}</span>
          </a>
        </div>

        {/* CTA button */}
        <div className="mt-auto">
          <a
            href={`tel:${provider.phone}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
