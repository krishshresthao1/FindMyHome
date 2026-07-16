import properties from "../data/properties/properties";
import PropertyHero from "../components/property/PropertyDetails/PropertyHero";
import PropertyAmenities from "../components/property/PropertyDetails/PropertyAmenities";
import PropertyUtilities from "../components/property/PropertyDetails/PropertyUtilities";
import PropertyLocation from "../components/property/PropertyDetails/PropertyLocation";
import OwnerCard from "../components/property/OwnerCard/OwnerCard";

const PropertyDetails = () => {
  const property = properties[0];

  return (
    <section className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <PropertyHero property={property} />

        <PropertyAmenities property={property} />

        <PropertyUtilities property={property} />

        <PropertyLocation property={property} />

        <OwnerCard property={property} />
      </div>
    </section>
  );
};

export default PropertyDetails;
