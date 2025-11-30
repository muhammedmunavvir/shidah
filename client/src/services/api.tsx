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
    const message = error.response?.data?.message;

    // ❌ Ignore NO_TOKEN — means user is not logged in
    if (message === "NO_TOKEN") {
      return Promise.reject(error); // no refresh, no logout, no toast
    }

    // Refresh only for expired/invalid tokens
    if (
      (message === "TOKEN_EXPIRED" || message === "INVALID_TOKEN") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        const { logout } = useAuthStore.getState();
        logout();

        // toast("Session expired. Please login again");

        // no redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
