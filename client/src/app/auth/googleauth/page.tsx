"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthstore";

export default function GoogleAuthPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('google-auth-script')) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = 'google-auth-script';
    
    script.onload = () => {
      console.log("Google script loaded");
      setLoaded(true);
    };
    
    script.onerror = () => {
      console.error("Failed to load Google script");
      setError("Failed to load authentication service");
    };
    
    document.body.appendChild(script);
  }, []);

  const handleResponse = async (resGoogle: any) => {
    try {
      console.log("Google response received:", resGoogle);
      
      const res = await api.post("/auth/google", {
        credential: resGoogle.credential,
      });

      console.log("Backend response:", res.data);

      if (res.data.success) {
        setUser(res.data.user);
        router.push("/");
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  useEffect(() => {
    if (loaded && window.google) {
      console.log("Initializing Google Auth...");
      
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleResponse,
          ux_mode: "popup", // Use popup instead of redirect for mobile
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleLoginBtn"),
          { 
            theme: "outline", 
            size: "large",
            width: 250, // Fixed width for mobile
            text: "continue_with"
          }
        );

        // Optional: Prompt for better UX
        // window.google.accounts.id.prompt();
        
      } catch (err) {
        console.error("Google Auth initialization error:", err);
        setError("Failed to initialize authentication");
      }
    }
  }, [loaded]);

  return (
    <div className="flex flex-col items-center">
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      <div id="googleLoginBtn"></div>
    </div>
  );
}