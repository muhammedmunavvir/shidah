"use client";
import { useEffect } from "react";
import api from "@/services/api";
import { useAuthStore } from "@/store/useAuthstore";

export function useAuthInit() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // If no auth cookie exists → don't call the API
    const hasToken = document.cookie.includes("auth_token");
    if (!hasToken) return;

    async function init() {
      try {
        const res = await api.get("/auth/userInfo");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    }

    init();
  }, [setUser]);
}
