import { createContext, useContext, useMemo, useState } from "react";
import properties from "../data/properties/properties";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [location, setLocation] = useState("Anywhere");
  const [propertyType, setPropertyType] = useState("All");
  const [budget, setBudget] = useState("Any");

  // Amenities
  const [wifi, setWifi] = useState(false);
  const [solar, setSolar] = useState(false);
  const [bikeParking, setBikeParking] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      // Location
      const matchesLocation =
        location === "Anywhere" || property.location === location;

      // Property Type
      const matchesType =
        propertyType === "All" || property.propertyType === propertyType;

      // Budget
      let matchesBudget = true;

      if (budget === "Below 10000") matchesBudget = property.price < 10000;

      if (budget === "10000-20000")
        matchesBudget = property.price >= 10000 && property.price <= 20000;

      if (budget === "20000-35000")
        matchesBudget = property.price > 20000 && property.price <= 35000;

      if (budget === "35000+") matchesBudget = property.price > 35000;

      // Amenities
      const matchesWifi = !wifi || property.amenities.wifi;

      const matchesSolar = !solar || property.amenities.solar;

      const matchesBike = !bikeParking || property.amenities.bikeParking;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesBudget &&
        matchesWifi &&
        matchesSolar &&
        matchesBike
      );
    });
  }, [search, location, propertyType, budget, wifi, solar, bikeParking]);

  return (
    <PropertyContext.Provider
      value={{
        filteredProperties,

        search,
        setSearch,

        location,
        setLocation,

        propertyType,
        setPropertyType,

        budget,
        setBudget,

        wifi,
        setWifi,

        solar,
        setSolar,

        bikeParking,
        setBikeParking,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);
