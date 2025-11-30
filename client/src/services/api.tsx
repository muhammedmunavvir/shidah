import { useAuthStore } from "@/store/useAuthstore";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token errors  
    if (
      (error.response?.data?.message === "TOKEN_EXPIRED" ||
       error.response?.data?.message === "INVALID_TOKEN" ||
       error.response?.data?.message === "NO_TOKEN") &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {
        // must match backend route!!!
        await api.post("/auth/refresh");

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
       toast("refresh token expire after 7 days , pls login again")
        const { logout } = useAuthStore.getState();
        logout();

        // window.location.href = "/auth/googleauth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
