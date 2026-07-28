import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasicInformation from "../components/property/BasicInformation";
import PropertyFeatures from "../components/property/PropertyFeatures";
import NearbyFacilities from "../components/property/NearbyFacilities";

import { postProperty } from "../services/api";

import { toast } from "react-toastify";

import { ArrowLeft } from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const [propertyData, setPropertyData] = useState({
    // Basic Information
    title: "",
    location: "",
    latitude: 0,
    longitude: 0,
    rent: "",
    phone: "",
    description: "",
    property_type: "",

    // Property Features
    bedrooms: 0,
    bathrooms: 0,
    kitchens: 0,
    parking: 0,

    furnished: false,
    balcony: false,

    road_connectivity: false,

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

      const formData = new FormData();

      Object.keys(propertyData).forEach((key) => {
        formData.append(key, propertyData[key]);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log(Object.fromEntries(formData.entries()));
      console.log(import.meta.env.VITE_ORS_API_KEY);
      const response = await postProperty(formData, token);

      console.log(response.data);

      console.log(Object.fromEntries(formData.entries()));

      toast.success("Property added successfully!");

      navigate("/home");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.detail || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="relative mx-auto flex max-w-7xl items-center px-6">
          <button
            onClick={() => navigate("/home")}
            className="group flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold !text-white shadow-md transition-all duration-300 hover:-translate-x-1 hover:bg-blue-700 hover:shadow-lg"
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold">
            Add New Property
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInformation
            propertyData={propertyData}
            setPropertyData={setPropertyData}
            handleChange={handleChange}
            images={images}
            setImages={setImages}
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
