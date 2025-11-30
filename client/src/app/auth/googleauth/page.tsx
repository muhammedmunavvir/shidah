"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthstore";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleAuthPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  // Ensure Google script is loaded
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(checkInterval);
        setReady(true);
      }
    }, 50);

    return () => clearInterval(checkInterval);
  }, []);

  // Google callback
  const handleResponse = async (googleRes: any) => {
    try {
      const res = await api.post("/auth/google", {
        credential: googleRes.credential,
      });

      if (res.data.success) {
        setUser(res.data.user);
        router.push("/");
      } else {
        setError("Google authentication failed.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication error");
    }
  };

  // Initialize & render Google Sign-In
  useEffect(() => {
    if (!ready || !window.google) return;

    try {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleResponse,
        ux_mode: "popup",
        auto_select: false,
        itp_support: true,
        use_fedcm_for_prompt: false,
      });

      window.google.accounts.id.disableAutoSelect();

      // Render button
      const btn = document.getElementById("googleLoginBtn");
      if (btn) {
        btn.innerHTML = "";
        window.google.accounts.id.renderButton(btn, {
          theme: "outline",
          size: "large",
          width: 260,
          text: "continue_with",
        });
      }

      // Force chooser always
      window.google.accounts.id.prompt();

    } catch (err) {
      setError("Failed to initialize Google Auth.");
    }
  }, [ready]);

  return (
    <div className="min-h-[70vh] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/60 dark:bg-black/50 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl">
        
        <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
          Sign in to Continue
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-5">
          Use your Google account to access your dashboard.
        </p>

        {/* Error UI */}
        {error && (
          <div className="bg-red-100 text-red-600 border border-red-300 text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {!ready ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Loading Google...</p>
          </div>
        ) : (
          <div className="flex justify-center mt-2">
            <div id="googleLoginBtn"></div>
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            onClick={() => router.push("/")}
          >
            Cancel & go back
          </button>
        </div>
      </div>
    </div>
  );
}
