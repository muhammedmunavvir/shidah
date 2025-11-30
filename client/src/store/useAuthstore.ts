import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  logout: () => {
    set({ user: null, loading: false });
  },
}));
