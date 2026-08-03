let municipalities = [];

/*
 * Load GeoJSON once
 */
export const loadMunicipalities = async () => {
  if (municipalities.length) return;

  const response = await fetch("/data/nepal-municipalities.geojson");

  const data = await response.json();

  municipalities = data.features;
};

/*
 * Get all loaded municipalities
 */
export const getMunicipalities = () => municipalities;

/*
 * Search municipality names
 */
export const searchMunicipalities = (query) => {
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  return municipalities
    .filter((feature) => {
      const name = feature.properties.GaPa_NaPa?.toLowerCase() || "";

      return name.includes(q);
    })
    .sort((a, b) => {
      const nameA = a.properties.GaPa_NaPa.toLowerCase();

      const nameB = b.properties.GaPa_NaPa.toLowerCase();

      // prioritize names starting with search text
      const aStarts = nameA.startsWith(q);
      const bStarts = nameB.startsWith(q);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return nameA.localeCompare(nameB);
    });
};
