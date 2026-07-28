import React from "react";

import { toast } from "react-toastify";
import LocationPicker from "../../components/property/PropertyDetails/PropertyLocation/LocationPicker";

const BasicInformation = ({
  propertyData,
  setPropertyData,
  handleChange,
  images,
  setImages,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
      <h2 className="text-2xl font-bold border-b pb-3">Basic Information</h2>

      {/* Property Title */}
      <div>
        <label className="block mb-2 font-medium">Property Title</label>

        <input
          type="text"
          name="title"
          value={propertyData.title}
          onChange={handleChange}
          placeholder="2 BHK Apartment in Baneshwor"
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block mb-2 font-medium">Property Type</label>

        <select
          name="property_type"
          value={propertyData.property_type}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Flat">Flat</option>
          <option value="Room">Room</option>
          <option value="Hostel">Hostel</option>
        </select>
      </div>

      {/* Property Location */}
      <div>
        <label className="block mb-2 font-medium">Location</label>

        <LocationPicker
          setLocation={(location) =>
            setPropertyData((prev) => ({
              ...prev,
              location: location,
            }))
          }
          setCoordinates={(lat, lng) =>
            setPropertyData((prev) => ({
              ...prev,
              latitude: lat,
              longitude: lng,
            }))
          }
        />

        <p className="mt-2 text-sm text-gray-500">
          Click on the map to select exact property location.
        </p>

        {propertyData.latitude !== 0 && propertyData.longitude !== 0 && (
          <p className="mt-2 text-sm text-green-600">
            Location selected:{propertyData.location}
          </p>
        )}
      </div>

      {/* Monthly Rent */}

      <div>
        <label className="block mb-2 font-medium">Monthly Rent (Rs.)</label>

        <input
          type="number"
          name="rent"
          value={propertyData.rent}
          onChange={handleChange}
          placeholder="25000"
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contact Number */}

      <div>
        <label className="block mb-2 font-medium">Contact Number</label>

        <input
          type="text"
          name="phone"
          value={propertyData.phone}
          onChange={handleChange}
          placeholder="98XXXXXXXX"
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows="5"
          name="description"
          value={propertyData.description}
          onChange={handleChange}
          placeholder="Describe your property..."
          className="w-full border rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Images */}

      <div>
        <label className="block mb-2 font-medium">
          Property Images (Maximum 10)
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full border rounded-lg p-3"
          onChange={(e) => {
            const selectedImages = Array.from(e.target.files);

            if (selectedImages.length + images.length > 10) {
              toast.error("Maximum 10 images allowed");

              return;
            }

            setImages((prev) => [...prev, ...selectedImages]);
          }}
        />

        {/* Preview */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="h-24 w-full object-cover rounded-lg"
              />

              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {images.length}/10 images selected
        </p>
      </div>
    </div>
  );
};

export default BasicInformation;
