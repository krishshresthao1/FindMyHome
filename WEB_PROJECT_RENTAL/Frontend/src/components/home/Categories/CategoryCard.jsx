import apartment from "../../../assets/images/categories/Apartment.jpg";
import house from "../../../assets/images/categories/House1.jpg";
import room from "../../../assets/images/categories/Room.jpg";
import hostel from "../../../assets/images/categories/Hostel.jpg";
import commercial from "../../../assets/images/categories/office.jpg";
import land from "../../../assets/images/categories/land.jpg";

import {
  Building2,
  House,
  BedDouble,
  GraduationCap,
  Store,
  Map,
} from "lucide-react";

export const categories = [
  {
    name: "Apartments",
    description: "Modern flats in city areas",
    image: apartment,
  },
  {
    name: "Houses",
    description: "Comfortable homes for families",
    image: house,
  },
  {
    name: "Rooms",
    description: "Affordable rooms for rent",
    image: room,
  },
  {
    name: "Hostels",
    description: "Student friendly stays",
    image: hostel,
  },
  {
    name: "Commercial",
    description: "Office and shop spaces",
    image: commercial,
  },
  {
    name: "Land",
    description: "Plots and open spaces",
    image: land,
  },
];

const CategoryCard = ({ category }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <h3 className="absolute bottom-4 left-5 text-2xl font-bold text-white">
          {category.name}
        </h3>
      </div>

      <p className="p-5 text-sm text-slate-600">{category.description}</p>
    </div>
  );
};

export default CategoryCard;
