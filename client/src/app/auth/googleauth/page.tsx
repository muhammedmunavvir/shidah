"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthstore";

export default function GoogleAuthPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleResponse = async (resGoogle: any) => {
    try {
      const res = await api.post("/auth/google", {
        credential: resGoogle.credential,
      });

      if (res.data.success) {
        setUser(res.data.user);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        { theme: "outline", size: "large" }
      );
    }
  }, [loaded]);

  return <div id="googleLoginBtn"></div>;
}
