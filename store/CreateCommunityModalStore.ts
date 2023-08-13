import { create } from "zustand";

type CreateCommunityModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useCreateCommunityStore = create<CreateCommunityModalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCreateCommunityStore;
