"use client"
import { useAuthStore } from "@/store/useAuthstore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const GoogleSuccess = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);

      const decoded: DecodedToken = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email, role: decoded.role });

      // remove token from URL
      window.history.replaceState({}, document.title, "/");

      // wait a tick so store updates are applied
      setTimeout(() => {
        setLoading(false);
        if(decoded.role=="admin"){
          router.push("/admin")
        }else{
          router.push("/")
        }
      }, 1000);
    } else {
      setLoading(false);
      router.push("/googleauthlogin");
    }
  }, [router, setToken, setUser]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="ml-3 text-lg font-medium text-gray-600">Logging in...</p>
      </div>
    );
  }

  return null;
};

export default GoogleSuccess;
