import { Building2, Users, MapPinned, BadgeCheck } from "lucide-react";

const stats = [
  {
    number: "500+",
    label: "Verified Rentals",
    icon: Building2,
  },
  {
    number: "120+",
    label: "Verified Owners",
    icon: Users,
  },
  {
    number: "25+",
    label: "Areas Covered",
    icon: MapPinned,
  },
  {
    number: "98%",
    label: "Response Rate",
    icon: BadgeCheck,
  },
];

const HeroStats = () => {
  return (
    <div className="mt-12 grid grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon size={28} className="mb-4 text-blue-600" />

            <h3 className="text-3xl font-bold">{item.number}</h3>

            <p className="mt-2 text-slate-500">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;
