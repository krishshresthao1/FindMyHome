import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { getProperties, getFavourites } from "../services/api";



const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("Anywhere");
  const [propertyType, setPropertyType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchData = async () => {
    try {
      const propertyResponse = await getProperties();

      console.log("PROPERTY RESPONSE:", propertyResponse.data);

      setProperties(
        Array.isArray(propertyResponse.data) ? propertyResponse.data : [],
      );

      const token = localStorage.getItem("token");

      if (token) {
        const favouriteResponse = await getFavourites(token);
        setFavourites(favouriteResponse.data.favourites || []);
      } else {
        setFavourites([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(properties.map((property) => property.location)),
    ];

    return uniqueLocations;
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title?.toLowerCase().includes(search.toLowerCase()) ||
        property.location?.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "Anywhere" || property.location === location;

      const matchesType =
        propertyType === "All" || property.property_type === propertyType;

      const min = minPrice === "" ? 0 : Number(minPrice);
      const max = maxPrice === "" ? Infinity : Number(maxPrice);

      const matchesBudget = property.rent >= min && property.rent <= max;

      return matchesSearch && matchesLocation && matchesType && matchesBudget;
    });
  }, [properties, search, location, propertyType, minPrice, maxPrice]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        loading,

        search,
        setSearch,

        location,
        setLocation,

        locations,

        propertyType,
        setPropertyType,

        minPrice,
        setMinPrice,

        maxPrice,
        setMaxPrice,

        favourites,
        setFavourites,

        fetchData,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  return useContext(PropertyContext);
};
