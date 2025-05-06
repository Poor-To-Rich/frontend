import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { create } from 'zustand';

interface TransactionState {
  currentTransactionType: IncomeExpenseButtonType;
  setCurrentTransactionType: (transactionType: IncomeExpenseButtonType) => void;
  clearTransactionType: () => void;
}

export const useTransactionReportTypeStore = create<TransactionState>(set => ({
  currentTransactionType: '지출',
  setCurrentTransactionType: transactionType => set({ currentTransactionType: transactionType }),
  clearTransactionType: () => set({ currentTransactionType: '지출' }),
}));
