import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserInfo {
  _id:string
  slug: string;
  name: string;
  avatar: string;
}
interface UserState {
  user: UserInfo | null;
  setUser: (data: any) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
