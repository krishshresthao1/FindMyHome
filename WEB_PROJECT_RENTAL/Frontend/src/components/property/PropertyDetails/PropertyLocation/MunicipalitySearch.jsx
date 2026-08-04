import { Search, LocateFixed } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDropdown from "../../../map/SearchDropdown";
import { searchMunicipalities } from "../../../../utils/municipalityUtils";
import { loadMunicipalities } from "../../../../utils/municipalityUtils";
import { X } from "lucide-react";

const SearchBar = ({
  search,
  setSearch,
  onLocateMe,
  onMunicipalitySelect,
  onReset,
}) => {
  const [results, setResults] = useState([]);

  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    loadMunicipalities();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    if (!showDropdown) return;

    const filtered = searchMunicipalities(search);

    setResults(filtered.slice(0, 8));
  }, [search, showDropdown]);

  return (
    <div className="mb-5 flex gap-3">
      <div className="relative flex-1">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search a city, municipality or area..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setResults([]);
            }
          }}
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-12 outline-none transition focus:border-blue-500"
        />

        {search && (
          <button
            onClick={() => {
              setResults([]);
              setShowDropdown(true);
              onReset();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        )}

        <SearchDropdown
          results={results}
          search={search}
          showDropdown={showDropdown}
          onSelect={(feature) => {
            setSearch(feature.properties.GaPa_NaPa);
            setResults([]);
            setShowDropdown(false);
            onMunicipalitySelect(feature);
          }}
        />
      </div>

      <button
        onClick={onLocateMe}
        className="rounded-2xl border border-slate-300 bg-white px-5 hover:bg-slate-100"
      >
        <LocateFixed size={22} />
      </button>
    </div>
  );
};

export default SearchBar;
