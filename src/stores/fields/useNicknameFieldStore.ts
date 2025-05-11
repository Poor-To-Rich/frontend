import { FieldStatusType } from '@/types/fieldType';
import { create } from 'zustand';

interface NicknameFieldProps {
  nicknameStatus: FieldStatusType;
  setNicknameStatus: (newStatus: FieldStatusType) => void;
  resetNicknameStatus: () => void;
}

export const useNicknameFieldStore = create<NicknameFieldProps>(set => ({
  nicknameStatus: { message: undefined, isVerify: false },
  setNicknameStatus: (newStatus: FieldStatusType) => set({ nicknameStatus: newStatus }),
  resetNicknameStatus: () => set({ nicknameStatus: { message: undefined, isVerify: false } }),
}));
