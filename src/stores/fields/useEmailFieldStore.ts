import { FieldStatusType } from '@/types/fieldType';
import { create } from 'zustand';

interface EmailFieldProps {
  sendEmailStatus: FieldStatusType;
  emailCodeStatus: FieldStatusType;
  setSendEmailStatus: (newStatus: FieldStatusType) => void;
  setEmailCodeStatus: (newStatus: FieldStatusType) => void;
  resetSendEmailStatus: () => void;
  resetEmailCodeStatus: () => void;
}

export const useEmailFieldStore = create<EmailFieldProps>(set => ({
  sendEmailStatus: { message: undefined, isVerify: false },
  emailCodeStatus: { message: undefined, isVerify: false },
  setSendEmailStatus: (newStatus: FieldStatusType) => set({ sendEmailStatus: newStatus }),
  setEmailCodeStatus: (newStatus: FieldStatusType) => set({ emailCodeStatus: newStatus }),
  resetSendEmailStatus: () => set({ sendEmailStatus: { message: undefined, isVerify: false } }),
  resetEmailCodeStatus: () => set({ emailCodeStatus: { message: undefined, isVerify: false } }),
}));
