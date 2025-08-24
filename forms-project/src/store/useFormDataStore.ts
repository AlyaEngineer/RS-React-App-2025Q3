import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FormDataType = {
  name: string;
  age: string;
  gender: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string | null;
  acceptTnC: boolean;
};

type AppState = {
  uncontrolledForm: FormDataType | null;
  hookForm: FormDataType | null;
  setUncontrolledForm: (data: FormDataType) => void;
  setHookForm: (data: FormDataType) => void;
};

export const useFormStore = create<AppState>()(
  persist(
    (set) => ({
      uncontrolledForm: null,
      hookForm: null,
      setUncontrolledForm: (data) => set({ uncontrolledForm: data }),
      setHookForm: (data) => set({ hookForm: data }),
    }),
    {
      name: 'forms-storage',
    }
  )
);
