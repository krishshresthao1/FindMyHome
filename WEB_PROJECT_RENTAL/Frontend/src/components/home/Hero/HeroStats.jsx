import { Building2, BadgeCheck, MapPinned } from "lucide-react";

const HeroStats = () => {
  const stats = [
    {
      icon: Building2,
      value: "1500+",
      label: "Properties",
    },
    {
      icon: BadgeCheck,
      value: "120+",
      label: "Verified Owners",
    },
    {
      icon: MapPinned,
      value: "25+",
      label: "Cities",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap gap-8 text-slate-900">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="flex items-center gap-3">
            <Icon className="text-blue-400" size={28} />

            <div>
              <h3 className="text-2xl font-bold">{item.value}</h3>

              <p className="text-slate-600">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;
