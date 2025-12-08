import { useAuthStore } from "@/store/useAuthstore";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message;
    const status = error.response?.status;

    // ✅ Handle Maintenance Mode (503 status)
    if (status === 503 && error.response?.data?.maintenance) {
      const maintenanceData = error.response.data;
      
      // Show maintenance toast
      toast.error(maintenanceData.message || "🚧 Site is under maintenance", {
        duration: 5000,
        icon: '🚧',
        action: {
          label: 'Refresh',
          onClick: () => window.location.reload(),
        },
      });
      
      // Add maintenance flag to error
      error.isMaintenance = true;
      error.maintenanceData = maintenanceData;
      
      return Promise.reject(error);
    }

    // ❌ Ignore NO_TOKEN — means user is not logged in
    if (message === "NO_TOKEN") {
      return Promise.reject(error);
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
        return Promise.reject(refreshError);
      }
    }

    // ✅ Show error toast for other client errors (400-499)
    if (status && status >= 400 && status < 500 && status !== 401) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Something went wrong';
      
      // Don't show toast for maintenance errors (already handled above)
      if (!error.isMaintenance) {
        toast.error(errorMessage, {
          duration: 3000,
        });
      }
    }

    // ✅ Show error toast for server errors (500+)
    if (status && status >= 500) {
      const errorMessage = error.response?.data?.message || 
                          'Server error. Please try again later.';
      
      if (!error.isMaintenance) {
        toast.error(errorMessage, {
          duration: 3000,
        });
      }
    }

    // ✅ Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.', {
        duration: 3000,
      });
    }

    return Promise.reject(error);
  }
);

export default api;