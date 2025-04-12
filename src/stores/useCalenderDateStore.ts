import { create } from 'zustand';

interface CalenderDateState {
  calenderDate: Date;
  setCalenderDate: (date: Date) => void;
}

export const useCalenderDateStore = create<CalenderDateState>(set => ({
  calenderDate: new Date(),
  setCalenderDate: (date: Date) => set({ calenderDate: date }),
}));
