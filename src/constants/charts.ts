import { CharTransactionType } from '@/types/chartTypes';

export const LINE_CHART_COLORS: Record<CharTransactionType, string> = {
  수입: '#81AAF6',
  지출: '#eb6060',
  '저축/투자': '#C6D7AE',
};

export const BAR_CHART_COLORS: Record<CharTransactionType, string> = {
  수입: '#D2E2FF',
  지출: '#ffcbc4',
  '저축/투자': '#E6F4D1',
};
