import { create } from 'zustand';

interface HeaderDateState {
  mainHeaderDate: Date;
  chartHeaderDate: Date;
  monthWeekHeaderDate: Date;

  setMainHeaderDate: (date: Date) => void;
  setChartHeaderDate: (date: Date) => void;
  setMonthWeekHeaderDate: (date: Date) => void;
}

export const useHeaderDateStore = create<HeaderDateState>(set => ({
  mainHeaderDate: new Date(),
  chartHeaderDate: new Date(),
  monthWeekHeaderDate: new Date(),

  setMainHeaderDate: date => set({ mainHeaderDate: date }),
  setChartHeaderDate: date => set({ chartHeaderDate: date }),
  setMonthWeekHeaderDate: date => set({ monthWeekHeaderDate: date }),
}));
