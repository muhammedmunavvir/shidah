import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  hydrated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  hydrated: false,
 setUser: (user) =>
    set({
      user,
      loading: false,   
      hydrated: true,  
    }),  setHydrated: (v) => set({ hydrated: v }),

  logout: () => {
    set({ user: null, loading: false });
  },
}));
