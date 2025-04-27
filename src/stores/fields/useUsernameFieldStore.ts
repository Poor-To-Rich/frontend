import { FieldStatusType } from '@/types/fieldType';
import { create } from 'zustand';

interface UsernameFieldProps {
  usernameStatus: FieldStatusType;
  setUsernameStatus: (newStatus: FieldStatusType) => void;
  resetUsernameStatus: () => void;
}

export const useUsernameFieldStore = create<UsernameFieldProps>(set => ({
  usernameStatus: { message: undefined, isVerify: false },
  setUsernameStatus: (newStatus: FieldStatusType) => set({ usernameStatus: newStatus }),
  resetUsernameStatus: () => set({ usernameStatus: { message: undefined, isVerify: false } }),
}));
