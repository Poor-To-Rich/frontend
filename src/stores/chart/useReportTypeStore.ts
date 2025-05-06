import { ReportType } from '@/types/reportTypes';
import { create } from 'zustand';

interface ReportTypeState {
  currentReportType: ReportType;
  setCurrentReportType: (reportType: ReportType) => void;
  clearReportType: () => void;
}

export const useReportTypeStore = create<ReportTypeState>(set => ({
  currentReportType: '월별',
  setCurrentReportType: reportType => set({ currentReportType: reportType }),
  clearReportType: () => set({ currentReportType: '월별' }),
}));
