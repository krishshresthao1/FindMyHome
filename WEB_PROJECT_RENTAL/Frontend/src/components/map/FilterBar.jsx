import { Home, Building2, BedDouble, Hotel, Building } from "lucide-react";


const filters = [
  {
    label: "All",
    value: "",
    icon: Building,
    color: "bg-slate-500",
  },
  {
    label: "House",
    value: "House",
    icon: Home,
    color: "bg-orange-500",
  },
  {
    label: "Apartment",
    value: "Apartment",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    label: "Flat",
    value: "Flat",
    icon: Building,
    color: "bg-purple-600",
  },
  {
    label: "Room",
    value: "Room",
    icon: BedDouble,
    color: "bg-green-600",
  },
  {
    label: "Hostel",
    value: "Hostel",
    icon: Hotel,
    color: "bg-red-600",
  },
];

const FilterBar = ({ selectedType, onTypeChange }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const Icon = filter.icon;

        const active = selectedType === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onTypeChange(filter.value)}
            className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200
    ${
      active
        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
        : "border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50"
    }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                active ? "bg-white/20" : filter.color
              }`}
            >
              <Icon size={17} className="text-white" />
            </span>

            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
