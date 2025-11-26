import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
  photo?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => {
    set({ user: null });
  },
}));
