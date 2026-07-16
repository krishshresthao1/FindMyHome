import { Home, BedDouble, Building2, Store } from "lucide-react";

const items = [
  {
    icon: BedDouble,
    title: "Room",
  },
  {
    icon: Building2,
    title: "Flat",
  },
  {
    icon: Home,
    title: "House",
  },
  {
    icon: Store,
    title: "Commercial",
  },
];

const HeroQuickLinks = () => {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-semibold">Browse by Property Type</h3>

      <div className="flex gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 transition hover:border-blue-600 hover:bg-blue-50"
            >
              <Icon size={20} />

              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroQuickLinks;
