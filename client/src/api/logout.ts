import api from "@/services/api";

export const logoutapi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};