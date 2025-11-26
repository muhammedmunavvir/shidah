"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuthStore } from "@/store/useAuthstore";
const SuccessPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
        router.push(res.data.user.role === "admin" ? "/admin" : "/");
      })
      .catch(() => router.push("/auth/googleauth"));
  }, []);

  return <p>Loading...</p>;
};

export default SuccessPage;
