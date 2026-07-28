import PropertyCard from "../PropertyCard/PropertyCard";
import { useProperty } from "../../../context/PropertyContext";

const PropertyGrid = () => {
  const { filteredProperties } = useProperty();

  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id || property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyGrid;
