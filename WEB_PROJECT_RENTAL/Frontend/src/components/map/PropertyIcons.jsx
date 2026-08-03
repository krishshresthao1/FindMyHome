import L from "leaflet";

import { House, Building2, Hotel, Bed, Warehouse } from "lucide-react";

const iconToSvg = (Icon, color) => {
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      ${Icon}
    </svg>
  `;

  return svg;
};

const createIcon = (svg, background) => {
  return L.divIcon({
    className: "",

    html: `
      <div
        style="
          width:42px;
          height:42px;
          border-radius:50%;
          background:${background};
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

const icons = {
  House: createIcon(
    iconToSvg(
      `
      <path d="M3 11L12 3l9 8"/>
      <path d="M5 10v10h14V10"/>
      `,
    ),
    "#f97316",
  ),

  Apartment: createIcon(
    iconToSvg(
      `
      <rect x="5" y="3" width="14" height="18"/>
      <path d="M9 7h1"/>
      <path d="M14 7h1"/>
      <path d="M9 12h1"/>
      <path d="M14 12h1"/>
      `,
    ),
    "#2563eb",
  ),

  Flat: createIcon(
    iconToSvg(
      `
      <rect x="3" y="5" width="18" height="14"/>
      <path d="M7 9h2"/>
      <path d="M15 9h2"/>
      `,
    ),
    "#7c3aed",
  ),

  Room: createIcon(
    iconToSvg(
      `
      <path d="M3 12h18"/>
      <path d="M5 12V8h14v4"/>
      <path d="M5 16v-4"/>
      <path d="M19 16v-4"/>
      `,
    ),
    "#16a34a",
  ),

  Hostel: createIcon(
    iconToSvg(
      `
      <path d="M4 21V5h16v16"/>
      <path d="M8 9h2"/>
      <path d="M14 9h2"/>
      `,
    ),
    "#dc2626",
  ),
};

const defaultIcon = createIcon(
  iconToSvg(
    `
    <rect x="4" y="4" width="16" height="16"/>
    `,
  ),
  "#64748b",
);

export const getPropertyIcon = (type) => {
  const normalized = type?.trim();

  return icons[normalized] || defaultIcon;
};
