import { create } from "zustand";

type FormState = {
  email: string;
  setEmail: (email: string) => void;
};

const useFormStore = create<FormState>()((set) => ({
  email: "",
  setEmail: (email) => set(() => ({ email: email })),
}));

export default useFormStore;
