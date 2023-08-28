import { create } from "zustand";

export type User = {
  uid: string;
  email: string;
  username: string;
  profileImage: string;
  createdAt: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
