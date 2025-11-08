import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
  photo?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
}

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  avatar?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          set({
            token,
            user: {
              id: decoded._id,
              email: decoded.email,
              role: decoded.role,
              photo: decoded.avatar || "",
            },
          });
        } catch (err) {
          console.error("Invalid token", err);
          set({ token: null, user: null });
        }
      },

      setUser: (user) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, ...user }
            : (user as User), // safe cast, ensures correct type
        })),

      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "authToken",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
