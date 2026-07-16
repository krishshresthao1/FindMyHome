const NearbyFacilities = ({ propertyData, handleChange }) => {
  const facilities = [
    { label: "Grocery Store", name: "grocery_store" },
    { label: "School", name: "school" },
    { label: "Hospital", name: "hospital" },
    { label: "Pharmacy", name: "pharmacy" },
    { label: "Bus Stop", name: "bus_stop" },
    { label: "Restaurant", name: "restaurant" },
    { label: "Park", name: "park" },
    { label: "Gym", name: "gym" },
    { label: "ATM", name: "atm" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 border-b pb-3 text-2xl font-bold">
        Nearby Facilities
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <label
            key={facility.name}
            className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <input
              type="checkbox"
              checked={propertyData[facility.name]}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: facility.name,
                    value: e.target.checked,
                  },
                })
              }
              className="h-5 w-5"
            />

            <span>{facility.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default NearbyFacilities;
