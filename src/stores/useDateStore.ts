import { create } from 'zustand';

interface DateState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  clearCurrentDate: () => void;
}

export const useDateStore = create<DateState>(set => ({
  currentDate: new Date(),
  setCurrentDate: date => set({ currentDate: date }),
  clearCurrentDate: () => set({ currentDate: new Date() }),
}));
