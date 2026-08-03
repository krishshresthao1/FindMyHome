const SearchDropdown = ({ results, onSelect, search, showDropdown }) => {
   if (!search.trim() || !showDropdown) {
     return null;
   }

  return (
    <div className="absolute left-0 right-0 top-full z-[9999] mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {" "}
      {results.length === 0 ? (
        <div className="px-5 py-4 text-center text-sm text-slate-500">
          Not found.
        </div>
      ) : (
        results.map((feature, index) => (
          <button
            key={index}
            onClick={() => onSelect(feature)}
            className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-slate-100"
          >
            <span className="text-blue-600"></span>

            <div>
              <p className="font-medium text-slate-800">
                {feature.properties.GaPa_NaPa}
              </p>

              <p className="text-xs text-slate-500">
                {feature.properties.DISTRICT}, Nepal
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default SearchDropdown;
