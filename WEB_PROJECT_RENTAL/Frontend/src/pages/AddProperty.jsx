import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasicInformation from "../components/property/BasicInformation";
import PropertyFeatures from "../components/property/PropertyFeatures";
import NearbyFacilities from "../components/property/NearbyFacilities";

import { postProperty } from "../services/api";

const AddProperty = () => {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    // Basic Information
    title: "",
    location: "",
    latitude: 0,
    longitude: 0,
    rent: "",
    phone: "",
    description: "",

    // Images
    images: [],

    // Property Features
    bedrooms: 0,
    bathrooms: 0,
    kitchens: 0,
    parking: 0,

    furnished: false,
    balcony: false,

    road_type: "",

    // Nearby Facilities
    grocery_store: false,
    school: false,
    hospital: false,
    pharmacy: false,
    bus_stop: false,
    restaurant: false,
    park: false,
    gym: false,
    atm: false,
  });

  const handleChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await postProperty(propertyData, token);

      console.log(response.data);

      alert("Property Posted Successfully!");

      navigate("/home");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.detail || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-center text-4xl font-bold">Add New Property</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInformation
            propertyData={propertyData}
            handleChange={handleChange}
          />

          <PropertyFeatures
            propertyData={propertyData}
            handleChange={handleChange}
          />

          <NearbyFacilities
            propertyData={propertyData}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Post Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
