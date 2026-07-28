const PropertyFeatures = ({ propertyData, handleChange }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold border-b pb-3">
        Property Features
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Bedrooms */}
        <div>
          <label className="mb-2 block font-medium">Bedrooms</label>

          <input
            type="number"
            name="bedrooms"
            value={propertyData.bedrooms}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="mb-2 block font-medium">Bathrooms</label>

          <input
            type="number"
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Kitchens */}
        <div>
          <label className="mb-2 block font-medium">Kitchens</label>

          <input
            type="number"
            name="kitchens"
            value={propertyData.kitchens}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parking */}
        <div>
          <label className="mb-2 block font-medium">Parking Spaces</label>

          <input
            type="number"
            name="parking"
            value={propertyData.parking}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Furnished */}
      <div className="mt-6 flex items-center justify-between rounded-xl border p-4">
        <label className="font-medium">Furnished</label>

        <input
          type="checkbox"
          name="furnished"
          checked={propertyData.furnished}
          onChange={(e) =>
            handleChange({
              target: {
                name: "furnished",
                value: e.target.checked,
              },
            })
          }
        />
      </div>

      {/* Balcony */}
      <div className="mt-4 flex items-center justify-between rounded-xl border p-4">
        <label className="font-medium">Balcony Available</label>

        <input
          type="checkbox"
          name="balcony"
          checked={propertyData.balcony}
          onChange={(e) =>
            handleChange({
              target: {
                name: "balcony",
                value: e.target.checked,
              },
            })
          }
        />
      </div>

      {/* Road Connectivity */}
      <div className="mt-4 flex items-center justify-between rounded-xl border p-4">
        <label className="font-medium">Road Connectivity</label>

        <input
          type="checkbox"
          name="road_connectivity"
          checked={propertyData.road_connectivity}
          onChange={(e) =>
            handleChange({
              target: {
                name: "road_connectivity",
                value: e.target.checked,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default PropertyFeatures;
