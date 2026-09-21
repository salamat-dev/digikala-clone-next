import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

/* کاربر واردشده — در localStorage نگه داشته می‌شود */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth" }
  )
);