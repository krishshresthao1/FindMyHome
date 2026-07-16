import React from "react";

const BasicInformation = ({ propertyData, handleChange }) => {
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

      {/* Property Location */}
      <div>
        <label className="block mb-2 font-medium">Location</label>

        <input
          type="text"
          name="location"
          value={propertyData.location}
          onChange={handleChange}
          placeholder="Kathmandu"
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-sm text-gray-500 mt-1">
          OpenStreetMap integration will replace this field later.
        </p>
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
        <label className="block mb-2 font-medium">Property Images</label>

        <input type="file" multiple className="w-full border rounded-lg p-3" />

        <p className="text-sm text-gray-500 mt-1">
          Image upload will be connected to the backend later.
        </p>
      </div>
    </div>
  );
};

export default BasicInformation;
