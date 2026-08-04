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
