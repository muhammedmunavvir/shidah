"use client";
import { useEffect } from "react";
import api from "@/services/api";
import { useAuthStore } from "@/store/useAuthstore";
import { useRouter } from "next/navigation";

export function useAuthInit() {
    const router = useRouter();
  
  const setUser = useAuthStore((state) => state.setUser);
    const setHydrated = useAuthStore((s) => s.setHydrated);


  useEffect(() => {
    async function init() {
      try {
        const res = await api.get("/auth/userInfo");
        setUser(res.data.user);
         

      } catch (err) {
        setUser(null);
      }

      setHydrated(true); 
    }

    init();
  }, [setUser,setHydrated]);
}
