import { useAuthStore } from "@/store/useAuthstore";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
baseURL: "/api",
  withCredentials: true,
});

export default api;


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error.response,"error.response")
      toast.error("Your session has expired. Please log in again.");
      // JWT expired or invalid
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = "/auth/googleauth";
    }
    return Promise.reject(error);
  }
);
