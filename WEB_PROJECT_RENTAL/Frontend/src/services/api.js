import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default api;

/* ===========================
   Authentication APIs
=========================== */

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

/* ===========================
   Property APIs
=========================== */

// Add Property
export const postProperty = (propertyData, token) => {
  return api.post("/properties/postProperty", propertyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get All Properties
export const getProperties = () => {
  return api.get("/properties/getProperty");
};

// Get Single Property
export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

// Update Property
export const updateProperty = (id, propertyData, token) => {
  return api.put(`/properties/updateProperty/${id}`, propertyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete Property
export const deleteProperty = (id, token) => {
  return api.delete(`/properties/deleteProperty/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
