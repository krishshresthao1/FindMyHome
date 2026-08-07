import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const googleLogin = (credential) => {
  return api.post("/auth/google", {
    credential,
  });
};

/* ===========================
   Property APIs
=========================== */

export const postProperty = (data, token) => {
  return api.post("/properties/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get All Properties
export const getProperties = (params = {}) => {
  return api.get("/properties/", {
    params,
  });
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

// Verify Email
export const verifyEmail = (data) => api.post("/auth/verify-email", data);

// Resend otp
export const resendOtp = (email) =>
  api.post("/auth/resend-otp", null, {
    params: {
      email,
    },
  });

/* ===========================
   Favourite APIs
=========================== */

export const getFavourites = (token) => {
  return api.get("/favourites/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleFavourite = (propertyId, token) => {
  return api.post(`/favourites/${propertyId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* ===========================
   Chat APIs
=========================== */

export const sendMessage = (data, token) => {
  return api.post("/chat/send", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMessages = (userId, token) => {
  return api.get(`/chat/messages/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markMessagesSeen = (userId, token) => {
  return api.put(`/chat/seen/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getConversations = (token) => {
  return api.get("/chat/conversations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===========================
// Chat V2 APIs
// ===========================

export const sendMessageV2 = (data, token) => {
  return api.post("/chat-v2/send", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getConversationsV2 = (token) => {
  return api.get("/chat-v2/conversations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMessagesV2 = (conversationId, token) => {
  return api.get(`/chat-v2/messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markMessagesSeenV2 = (conversationId, token) => {
  return api.put(`/chat-v2/seen/${conversationId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const startConversationV2 = (data, token) => {
  return api.post("/chat-v2/start", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendPropertyMessageV2 = (data, token) => {
  return api.post("/chat-v2/send-property", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
