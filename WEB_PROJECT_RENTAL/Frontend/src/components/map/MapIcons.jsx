import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import {
  Home,
  Building2,
  Building,
  BedDouble,
  Hotel,
  MapPin,
} from "lucide-react";

const createMarker = (Icon, color) => {
  const svg = renderToStaticMarkup(
    <Icon size={20} color="white" strokeWidth={2.4} />,
  );

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width:42px;
          height:42px;
          border-radius:50%;
          background:${color};
          display:flex;
          justify-content:center;
          align-items:center;
          border:3px solid white;
          box-shadow:0 4px 12px rgba(0,0,0,.35);
        "
      >
        ${svg}
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -38],
  });
};

export const propertyIcons = {
  House: createMarker(Home, "#f97316"),
  Apartment: createMarker(Building2, "#2563eb"),
  Flat: createMarker(Building, "#9333ea"),
  Room: createMarker(BedDouble, "#16a34a"),
  Hostel: createMarker(Hotel, "#dc2626"),
};

export const defaultPropertyIcon = createMarker(Home, "#64748b");

export const userLocationIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:20px;height:20px;">
      
      <div
        style="
          position:absolute;
          inset:0;
          border-radius:50%;
          background:rgba(37,99,235,.25);
          animation:userPulse 2s infinite;
        "
      ></div>

      <div
        style="
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          width:14px;
          height:14px;
          border-radius:50%;
          background:#2563eb;
          border:3px solid white;
          box-shadow:0 0 10px rgba(37,99,235,.6);
        "
      ></div>

    </div>

    <style>
      @keyframes userPulse{
        0%{
          transform:scale(1);
          opacity:.8;
        }
        100%{
          transform:scale(3);
          opacity:0;
        }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});