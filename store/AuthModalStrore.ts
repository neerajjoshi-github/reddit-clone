import { create } from "zustand";

type ViewOption =
  | "login"
  | "signup"
  | "signupUsernameAndPassword"
  | "resetPassword";

type AuthModalState = {
  isOpen: boolean;
  view: ViewOption;
  open: () => void;
  close: () => void;
  toggle: () => void;
  changeView: (viewOption: ViewOption) => void;
};

const useAuthModalStore = create<AuthModalState>()((set) => ({
  isOpen: false,
  view: "signup",
  changeView: (viewOption) => set(() => ({ view: viewOption })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useAuthModalStore;
