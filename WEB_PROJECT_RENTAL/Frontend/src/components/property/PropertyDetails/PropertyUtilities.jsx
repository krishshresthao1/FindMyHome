const PropertyUtilities = ({ property }) => {
  return (
    <section className="mt-12 rounded-3xl bg-white p-8 shadow">
      <h2 className="mb-8 text-3xl font-bold">Rental Information</h2>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Info
            title="Water Source"
            value={`${property.amenities.governmentWater ? "Government" : ""}${
              property.amenities.boring ? " + Boring" : ""
            }`}
          />

          <Info
            title="Internet"
            value={property.amenities.wifi ? "Available" : "Not Available"}
          />

          <Info
            title="Kitchen"
            value={
              property.amenities.separateKitchen
                ? "Separate Kitchen"
                : "Shared Kitchen"
            }
          />

          <Info
            title="Furnished"
            value={property.amenities.furnished ? "Yes" : "No"}
          />
        </div>

        <div className="space-y-4">
          <Info title="Suitable For" value={property.rental.tenantPreference} />

          <Info title="Available From" value={property.rental.availableFrom} />

          <Info title="Minimum Stay" value={property.rental.minimumStay} />

          <Info title="Owner" value={property.owner.name} />
        </div>
      </div>
    </section>
  );
};

const Info = ({ title, value }) => (
  <div className="flex justify-between rounded-xl bg-slate-50 p-4">
    <span className="font-medium text-slate-500">{title}</span>

    <span className="font-semibold">{value}</span>
  </div>
);

export default PropertyUtilities;
