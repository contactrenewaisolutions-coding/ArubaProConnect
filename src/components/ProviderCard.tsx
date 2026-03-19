import { MapPin, Star, Phone } from "lucide-react";

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
}

const avatarColors: Record<string, string> = {
  blue: "bg-blue-600",
  amber: "bg-amber-500",
  orange: "bg-orange-600",
  teal: "bg-teal-600",
  purple: "bg-purple-600",
  green: "bg-green-600",
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
  const avatarClass = avatarColors[provider.categoryColor] ?? "bg-slate-600";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-4 flex items-start gap-4">
        <div
          className={`${avatarClass} w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}
        >
          {provider.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy-900 text-sm leading-tight mb-0.5 truncate">
            {provider.name}
          </h3>
          <span className="inline-block text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
            {provider.category}
          </span>
        </div>
      </div>

      {/* Rating + Location */}
      <div className="px-5 pb-3 flex items-center gap-4 text-xs text-slate-500">
        {provider.rating ? (
          <div className="flex items-center gap-1.5">
            <StarRating rating={provider.rating} />
            <span className="font-medium text-slate-700">{provider.rating}</span>
            <span>({provider.reviewCount})</span>
          </div>
        ) : (
          <span className="text-slate-400 italic">No reviews yet</span>
        )}
        <div className="flex items-center gap-1 ml-auto">
          <MapPin className="w-3 h-3" />
          <span>{provider.district}</span>
        </div>
      </div>

      {/* Description */}
      <p className="px-5 pb-4 text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
        {provider.description}
      </p>

      {/* Services */}
      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        {provider.services.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
        {provider.services.length > 3 && (
          <span className="text-xs text-slate-400 px-1 py-0.5">
            +{provider.services.length - 3} more
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <a
          href={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Contact
        </a>
      </div>
    </div>
  );
}
