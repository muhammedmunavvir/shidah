"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthstore";

export default function LoginButton() {
 const {setUser}= useAuthStore()
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Google Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
      console.log("Google script loaded");
    };

    document.body.appendChild(script);
  }, []);

  // Handle Google Credential Response
  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await api.post(
        "/auth/google/callback",
        { credential: response.credential },
        { withCredentials: true }
      );
      if (res.data.success) {
 setUser(res.data.user);
         router.push("/");
      }
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  // Initialize Google Login Button
  useEffect(() => {
    if (isLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        {
          theme: "outline",
          size: "large",
          width: 320,
        }
      );
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 hover:shadow-blue-500/20 transition-all duration-300">
           
          <div className="text-center space-y-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="mx-auto w-16 h-16 rounded-2xl shadow-xl"
            />

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
          </div>

          {/* Google Sign-In Button Container */}
          <div id="googleLoginBtn" className="flex justify-center"></div>

        </div>

      </div>
    </div>
  );
}
