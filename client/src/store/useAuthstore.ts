import { create } from "zustand";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  token: string | null;
  user: { id: string; email: string; role: string } | null;
  setToken: (token: string) => void;
  setUser: (user: { id: string; email: string; role: string }) => void;
  logout: () => void;
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const storedToken = localStorage.getItem("authToken");
let storedUser = null;

if (storedToken) {
  try {
    const decoded: DecodedToken = jwtDecode(storedToken);
    storedUser = { id: decoded.id, email: decoded.email, role: decoded.role };
  } catch (err) {
    console.error("Invalid token in localStorage", err);
    localStorage.removeItem("authToken");
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser,
  setToken: (token) => {
    localStorage.setItem("authToken", token);
    const decoded: DecodedToken = jwtDecode(token);
    set({ token, user: { id: decoded.id, email: decoded.email, role: decoded.role } });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null, user: null });
  },
}));
